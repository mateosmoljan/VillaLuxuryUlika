"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { applyContent } from "@/lib/admin/content";
import {
  authConfigured,
  clearSession,
  hostEmail,
  loginAllowed,
  passwordMatches,
  readSession,
  recordFailure,
  writeSession,
} from "@/lib/admin/auth";
import { gallery } from "@/lib/site/gallery";
import { allowedImageSrcs, assertLocale, localeCopy, updateState } from "@/lib/store";
import { refreshPublic } from "@/lib/store/publish";
import type { Locale } from "@/lib/site/copy";

function clientIp() {
  return headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function loginAction(form: FormData) {
  if (!authConfigured()) redirect("/admin/login?error=unconfigured");
  const ip = clientIp();
  if (!loginAllowed(ip)) redirect("/admin/login?error=rate");
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");
  const matches = email === hostEmail() && (await passwordMatches(password));
  if (!matches) {
    recordFailure(ip);
    redirect("/admin/login?error=credentials");
  }
  writeSession(email);
  redirect("/admin");
}

export async function logoutAction() {
  clearSession();
  redirect("/admin/login");
}

function requireHost() {
  const session = readSession();
  if (!session) redirect("/admin/login");
  return session;
}

async function save(mutator: Parameters<typeof updateState>[0]) {
  requireHost();
  try {
    await updateState(mutator);
  } catch (error) {
    if (error instanceof Error && (error.message === "NO_DATABASE" || error.message === "dates")) {
      return { error: error.message === "NO_DATABASE" ? ("database" as const) : ("dates" as const) };
    }
    throw error;
  }
  refreshPublic();
  return { ok: true as const };
}

export async function saveCalendar(form: FormData) {
  const from = String(form.get("from") ?? "");
  const to = String(form.get("to") ?? "");
  const priceMode = String(form.get("priceMode") ?? "keep");
  const priceRaw = String(form.get("price") ?? "").trim();
  const closedMode = String(form.get("closedMode") ?? "keep");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) {
    return { error: "dates" as const };
  }
  let price: number | null = null;
  if (priceMode === "set") {
    if (!/^[1-9]\d*$/.test(priceRaw)) return { error: "price" as const };
    price = Number(priceRaw);
  }
  const result = await save((state) => {
    let touched = false;
    for (const day of state.prices) {
      if (day.date < from || day.date > to) continue;
      touched = true;
      if (priceMode === "clear") day.price = null;
      if (priceMode === "set") day.price = price;
      if (closedMode === "closed") day.closed = true;
      if (closedMode === "open") day.closed = false;
    }
    if (!touched) throw new Error("dates");
  });
  if (result && "error" in result) return result;
  redirect("/admin/calendar");
}

export async function saveContent(form: FormData) {
  const locale = assertLocale(String(form.get("locale") ?? "hr"));
  const result = await save((state) => {
    const current = localeCopy(state, locale);
    state.copies[locale] = applyContent(current, form);
  });
  if (result && "error" in result) redirect(`/admin/content?locale=${locale}&error=${result.error}`);
  redirect(`/admin/content?locale=${locale}`);
}

export async function saveImages(form: FormData) {
  const locale = assertLocale(String(form.get("locale") ?? "hr")) as Locale;
  const allowed = allowedImageSrcs();
  const hero = String(form.get("hero") ?? "");
  if (!allowed.has(hero)) return { error: "image" as const };
  const result = await save((state) => {
    state.heroSrc = hero;
    const copy = localeCopy(state, locale);
    copy.meta.ogAlt = String(form.get("heroAlt") ?? "").trim();
    for (const space of copy.spaces.items) {
      const src = String(form.get(`space_${space.id}`) ?? "");
      if (src && allowed.has(src)) state.spaceImages[space.id] = src;
      const alt = String(form.get(`alt_${space.id}`) ?? "").trim();
      if (alt) space.imageAlt = alt;
    }
    state.copies[locale] = copy;
    gallery.forEach((image, index) => {
      const alt = form.get(`g_${index}`);
      if (typeof alt !== "string") return;
      const trimmed = alt.trim();
      if (!trimmed) return;
      state.galleryAlts[image.src] = {
        ...(state.galleryAlts[image.src] ?? {}),
        [locale]: trimmed,
      };
    });
  });
  if (result && "error" in result) redirect(`/admin/images?locale=${locale}&error=${result.error}`);
  redirect(`/admin/images?locale=${locale}`);
}

export async function currentSession() {
  return readSession();
}
