import { NextResponse } from "next/server";
import { loadStore } from "@/lib/calendarStore";

export const dynamic = "force-dynamic";

export async function GET() {
  const store = await loadStore();
  return NextResponse.json(
    { source: store.source, patches: store.patches },
    { headers: { "cache-control": "no-store" } }
  );
}
