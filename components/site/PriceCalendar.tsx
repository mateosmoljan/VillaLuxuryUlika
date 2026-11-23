"use client";

import { useMemo, useState } from "react";
import type { Copy } from "@/lib/site/copy";
import type { Chrome } from "@/lib/site/chrome";
import type { PriceRow } from "@/lib/store/types";

function utcDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export default function PriceCalendar({
  copy,
  locale,
  days,
  chrome,
}: {
  copy: Copy;
  locale: string;
  days: PriceRow[];
  chrome: Chrome;
}) {
  const months = useMemo(() => {
    const grouped = new Map<string, PriceRow[]>();
    for (const day of days) {
      const id = day.date.slice(0, 7);
      const list = grouped.get(id) ?? [];
      list.push(day);
      grouped.set(id, list);
    }
    return Array.from(grouped.entries()).map(([id, monthDays]) => ({ id, days: monthDays }));
  }, [days]);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const month = months[index];

  const estimate = useMemo(() => {
    if (!start || !end) return null;
    const nights = days.filter((day) => day.date >= start && day.date < end);
    if (!nights.length) return { kind: "empty" as const };
    if (nights.some((day) => day.closed || day.price == null)) return { kind: "blocked" as const, nights: nights.length };
    const total = nights.reduce((sum, day) => sum + (day.price ?? 0), 0);
    return { kind: "ok" as const, nights: nights.length, total };
  }, [days, end, start]);

  if (!month) return null;
  const label = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(utcDate(`${month.id}-01`));
  const longDate = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const first = utcDate(month.days[0].date);
  const lead = (first.getUTCDay() + 6) % 7;
  const cells: (PriceRow | null)[] = [...Array.from({ length: lead }, () => null), ...month.days];

  function choose(date: string) {
    if (!start || (start && end)) {
      setStart(date);
      setEnd(null);
      return;
    }
    if (date <= start) {
      setStart(date);
      setEnd(null);
      return;
    }
    setEnd(date);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl bg-olive-deep p-5 text-white">
        <h2 className="font-display text-3xl">{chrome.estimateTitle}</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{chrome.estimateHint}</p>
        <p className="mt-4 text-sm">
          {chrome.arrival}: {start ?? "—"}
          <br />
          {chrome.departure}: {end ?? "—"}
        </p>
        {estimate?.kind === "ok" && (
          <p className="mt-4 text-sm">
            {estimate.nights} {chrome.estimateNights}
            <b className="mt-1 block font-display text-4xl">{estimate.total} {copy.prices.currency}</b>
            <span className="text-white/75">{chrome.estimateTotal}</span>
          </p>
        )}
        {estimate?.kind === "blocked" && <p className="mt-4 text-sm text-white/90">{chrome.estimateBlocked}</p>}
        {estimate?.kind === "empty" && <p className="mt-4 text-sm">{chrome.estimateEmpty}</p>}
        <ul className="mt-6 space-y-1 text-sm text-white/80">
          <li>{chrome.openLegend}</li>
          <li>{chrome.closedLegend}</li>
          <li>{chrome.blankLegend}</li>
        </ul>
      </aside>
      <div>
        <div className="flex items-center justify-between gap-3">
          <button type="button" className="rounded-full border border-sand px-3 py-2 text-sm disabled:opacity-40" onClick={() => setIndex((value) => value - 1)} disabled={index === 0}>
            {copy.prices.previous}
          </button>
          <label className="min-w-0 flex-1 text-center">
            <span className="sr-only">{copy.prices.month}</span>
            <select className="w-full max-w-xs bg-transparent text-center font-display text-2xl capitalize" value={index} onChange={(event) => setIndex(Number(event.target.value))}>
              {months.map((item, itemIndex) => (
                <option key={item.id} value={itemIndex}>
                  {new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(utcDate(`${item.id}-01`))}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="rounded-full border border-sand px-3 py-2 text-sm disabled:opacity-40" onClick={() => setIndex((value) => value + 1)} disabled={index === months.length - 1}>
            {copy.prices.next}
          </button>
        </div>
        <p className="mt-1 text-center text-sm text-ink/60">{label} · {copy.prices.currency}</p>
        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-ink/50">
          {copy.prices.weekdays.map((day) => <div key={day} className="py-1">{day}</div>)}
        </div>
        <div className="grid min-h-[22rem] grid-cols-7 gap-1">
          {cells.map((cell, cellIndex) => {
            if (!cell) return <div key={`empty-${cellIndex}`} />;
            const selected = Boolean(start && end && cell.date >= start && cell.date < end) || cell.date === start || cell.date === end;
            const amount = cell.price == null ? copy.prices.unavailable : `${cell.price} ${copy.prices.currency}`;
            const spoken = `${longDate.format(utcDate(cell.date))}, ${cell.closed ? chrome.closedLegend : amount}`;
            return (
              <button
                key={cell.date}
                type="button"
                aria-label={spoken}
                aria-pressed={selected}
                onClick={() => choose(cell.date)}
                className={`flex h-16 flex-col items-center justify-center rounded-xl border text-ink sm:h-[4.5rem] ${
                  selected
                    ? "border-olive bg-olive text-white"
                    : cell.closed
                      ? "border-clay/30 bg-clay/10"
                      : cell.price == null
                        ? "border-transparent bg-stone/70 text-ink/40"
                        : "border-sand bg-white"
                }`}
              >
                <span className="text-xs">{Number(cell.date.slice(-2))}</span>
                <span className="text-sm font-semibold">{cell.price == null ? "—" : cell.price}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
