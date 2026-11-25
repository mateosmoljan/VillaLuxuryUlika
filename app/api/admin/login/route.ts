import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  allowLogin,
  clientIp,
  createSessionValue,
  isAuthConfigured,
  passwordMatches,
  sessionCookieOptions,
} from "@/lib/adminSession";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  const ip = clientIp(request.headers.get("x-forwarded-for"));
  if (!allowLogin(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  if (!(await passwordMatches(body.password || ""))) {
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionValue(), sessionCookieOptions());
  return response;
}
