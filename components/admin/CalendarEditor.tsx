"use client";

import { useFormState } from "react-dom";
import { useMemo, useState } from "react";
import { saveCalendar } from "@/app/admin/actions";
import type { PriceRow } from "@/lib/store/types";

export default function CalendarEditor({ days }: { days: PriceRow[] }) {
  const months = useMemo(() => {
    const map = new Map<string, PriceRow[]>();
    for (const day of days) {
      const id = day.date.slice(0, 7);
      const list = map.get(id) ?? [];
      list.push(day);
      map.set(id, list);
    }
    return Array.from(map.entries());
  }, [days]);
  const [index, setIndex] = useState(0);
  const [from, setFrom] = useState(days[0]?.date ?? "");
  const [to, setTo] = useState(days[0]?.date ?? "");
  const [message, formAction] = useFormState(async (_previous: string, form: FormData) => {
    const result = await saveCalendar(form);
    if (result && "error" in result) {
      if (result.error === "database") {
        return "Spremanje treba DATABASE_URL (Neon, besplatni plan). Na ovom pregledu izmjene se ne mogu trajno spremiti.";
      }
      if (result.error === "price") {
        return "Iznos mora biti cijeli broj veći od nule, ili ostavite dan bez iznosa.";
      }
      return "Odaberite datume koji postoje u cjeniku.";
    }
    return "";
  }, "");
  const month = months[index];
  const label = month
    ? new Intl.DateTimeFormat("hr", { month: "long", year: "numeric", timeZone: "UTC" }).format(
        new Date(`${month[0]}-01T00:00:00Z`)
      )
    : "";

  if (!month) return null;
  const first = new Date(`${month[1][0].date}T00:00:00Z`);
  const lead = (first.getUTCDay() + 6) % 7;

  return (
    <div className="space-y-8">
      <form action={formAction} className="grid gap-3 rounded-2xl border border-sand bg-white/60 p-4 md:grid-cols-4">
        <label className="text-sm">
          Od
          <input type="date" name="from" required value={from} onChange={(event) => setFrom(event.target.value)} className="mt-1 w-full rounded-lg border border-sand bg-paper px-2 py-1" />
        </label>
        <label className="text-sm">
          Do
          <input type="date" name="to" required value={to} onChange={(event) => setTo(event.target.value)} className="mt-1 w-full rounded-lg border border-sand bg-paper px-2 py-1" />
        </label>
        <label className="text-sm">
          Iznos
          <select name="priceMode" className="mt-1 w-full rounded-lg border border-sand bg-paper px-2 py-1">
            <option value="keep">Ne mijenjaj</option>
            <option value="set">Postavi broj</option>
            <option value="clear">Bez iznosa</option>
          </select>
          <input name="price" inputMode="numeric" placeholder="190" className="mt-2 w-full rounded-lg border border-sand bg-paper px-2 py-1" />
        </label>
        <label className="text-sm">
          Dostupnost
          <select name="closedMode" className="mt-1 w-full rounded-lg border border-sand bg-paper px-2 py-1">
            <option value="keep">Ne mijenjaj</option>
            <option value="open">Otvori</option>
            <option value="closed">Zatvori</option>
          </select>
          <button className="mt-2 w-full rounded-full bg-olive px-3 py-2 text-sm text-paper" type="submit">
            Spremi raspon
          </button>
        </label>
      </form>
      {message && <p className="text-sm text-clay">{message}</p>}
      <div className="flex items-center justify-between gap-3">
        <button type="button" className="rounded-full border border-sand px-3 py-1 text-sm" onClick={() => setIndex((value) => Math.max(0, value - 1))} disabled={index === 0}>
          Prijašnji
        </button>
        <p className="font-display text-2xl capitalize">{label}</p>
        <button type="button" className="rounded-full border border-sand px-3 py-1 text-sm" onClick={() => setIndex((value) => Math.min(months.length - 1, value + 1))} disabled={index === months.length - 1}>
          Sljedeći
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs uppercase text-ink/50">
        {["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: lead }).map((_, empty) => (
          <div key={`e-${empty}`} />
        ))}
        {month[1].map((day) => (
          <button
            key={day.date}
            type="button"
            onClick={() => {
              setFrom(day.date);
              setTo(day.date);
            }}
            className={`h-16 rounded-xl border text-sm ${day.closed ? "border-clay bg-clay/10" : "border-sand bg-paper"}`}
          >
            <span className="block text-xs">{Number(day.date.slice(-2))}</span>
            <span className="block">{day.price ?? "—"}</span>
            {day.closed && <span className="block text-[10px] uppercase text-clay">zatvoreno</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
