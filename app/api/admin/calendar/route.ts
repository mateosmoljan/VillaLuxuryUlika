import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { hasSession } from "@/lib/adminSession";
import { dailyPrices } from "@/lib/dailyPrices";
import { loadStore, resetRange, updateRange } from "@/lib/calendarStore";
import type { DayPatch } from "@/lib/calendarData";

export const dynamic = "force-dynamic";

function denied() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

function refresh() {
  ["hr", "en", "de", "it"].forEach((locale) => {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/pricelist`);
    revalidatePath(`/${locale}/villa-luxury-ulika`);
  });
  revalidatePath("/api/calendar");
}

export async function GET() {
  if (!hasSession()) return denied();
  const store = await loadStore();
  const days = Object.keys(dailyPrices)
    .sort()
    .map((date) => {
      const patch = store.patches[date];
      return {
        date,
        price: patch && "price" in patch ? patch.price ?? null : dailyPrices[date],
        basePrice: dailyPrices[date],
        closed: Boolean(patch?.closed),
        minNights: patch?.minNights ?? null,
        note: patch?.note || "",
        overridden: Boolean(patch),
      };
    });
  return NextResponse.json({
    storage: store.source,
    writable: store.writable,
    notice: store.notice,
    days,
  });
}

export async function POST(request: Request) {
  if (!hasSession()) return denied();
  const body = (await request.json().catch(() => ({}))) as {
    from?: string;
    to?: string;
    action?: "save" | "close" | "open" | "reset";
    price?: number | null;
    minNights?: number | null;
    note?: string;
  };
  if (!body.from || !body.to) {
    return NextResponse.json({ error: "range" }, { status: 400 });
  }
  try {
    if (body.action === "reset") await resetRange(body.from, body.to);
    else if (body.action === "close" || body.action === "open") {
      await updateRange(body.from, body.to, { closed: body.action === "close" });
    } else {
      const patch: DayPatch = {};
      if (body.price !== undefined) patch.price = body.price;
      if (body.minNights !== undefined) patch.minNights = body.minNights;
      if (body.note !== undefined) patch.note = body.note;
      await updateRange(body.from, body.to, patch);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "save_failed";
    return NextResponse.json({ error: message }, { status: 503 });
  }
  refresh();
  return NextResponse.json({ ok: true });
}
