import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export const ADMIN_COOKIE = "ulika_admin";
const SESSION_MS = 12 * 60 * 60 * 1000;
const attempts = new Map<string, { count: number; reset: number }>();

export function isAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.SESSION_SECRET);
}

export function allowLogin(ip: string) {
  const now = Date.now();
  const row = attempts.get(ip);
  if (!row || row.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 });
    return true;
  }
  row.count += 1;
  return row.count <= 8;
}

export async function passwordMatches(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH || "";
  if (!hash || !password) return false;
  return bcrypt.compare(password, hash);
}

function sign(body: string) {
  return createHmac("sha256", process.env.SESSION_SECRET || "").update(body).digest("base64url");
}

export function createSessionValue() {
  const body = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MS })).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readSessionValue(value: string | undefined) {
  if (!value || !process.env.SESSION_SECRET) return false;
  const [body, sig] = value.split(".");
  if (!body || !sig) return false;
  const expected = sign(body);
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { exp?: number };
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function hasSession() {
  return readSessionValue(cookies().get(ADMIN_COOKIE)?.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview",
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}

export function clientIp(header: string | null) {
  return (header || "local").split(",")[0].trim() || "local";
}
