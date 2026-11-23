import { createHmac, timingSafeEqual } from "crypto";
import { cookies, headers } from "next/headers";
import bcrypt from "bcryptjs";

const COOKIE = "ulika_host";
const WEEK = 60 * 60 * 24 * 7;

/**
 * Preview/local seed only. This is not a real host password.
 * Production (VERCEL_ENV=production) ignores it unless HOST_EMAIL and
 * HOST_PASSWORD_HASH are set in the environment.
 * Placeholder password: preview-seed-change-me
 * Placeholder email: host@example.com
 */
const SEED_EMAIL = "host@example.com";
const SEED_HASH = "$2b$12$ogOHsQ.fORWgkuI0jJjX6Ocgz6usgIvx4UEgZSEbTEbzJPiBB4oQK";
const SEED_SESSION = "preview-only-session-secret-not-for-production";

const attempts = new Map<string, number[]>();

function seedAllowed() {
  return process.env.VERCEL_ENV !== "production";
}

export function hostEmail() {
  if (process.env.HOST_EMAIL) return process.env.HOST_EMAIL.trim().toLowerCase();
  return seedAllowed() ? SEED_EMAIL : "";
}

function passwordHash() {
  if (process.env.HOST_PASSWORD_HASH) return process.env.HOST_PASSWORD_HASH.trim();
  return seedAllowed() ? SEED_HASH : "";
}

function sessionSecret() {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  return seedAllowed() ? SEED_SESSION : "";
}

export function authConfigured() {
  return Boolean(hostEmail() && passwordHash() && sessionSecret());
}

export function loginAllowed(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 15 * 60 * 1000);
  attempts.set(ip, recent);
  return recent.length < 8;
}

export function recordFailure(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((time) => now - time < 15 * 60 * 1000);
  recent.push(now);
  attempts.set(ip, recent);
}

export async function passwordMatches(password: string) {
  const hash = passwordHash();
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}

function sign(body: string) {
  return createHmac("sha256", sessionSecret()).update(body).digest("base64url");
}

export function writeSession(email: string) {
  const body = Buffer.from(
    JSON.stringify({ email, exp: Date.now() + WEEK * 1000 })
  ).toString("base64url");
  const token = `${body}.${sign(body)}`;
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.VERCEL === "1",
    path: "/",
    maxAge: WEEK,
  });
}

export function clearSession() {
  cookies().set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}

function requestToken() {
  const fromJar = cookies().get(COOKIE)?.value;
  if (fromJar) return fromJar;
  const raw = headers().get("cookie") || "";
  const part = raw
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${COOKIE}=`));
  return part ? decodeURIComponent(part.slice(COOKIE.length + 1)) : "";
}

export function readSession(): { email: string } | null {
  const token = requestToken();
  const secret = sessionSecret();
  const email = hostEmail();
  if (!token || !secret || !email) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, "base64url").toString()) as {
      email?: string;
      exp?: number;
    };
    if (!data.email || !data.exp || data.exp < Date.now()) return null;
    if (data.email !== email) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}
