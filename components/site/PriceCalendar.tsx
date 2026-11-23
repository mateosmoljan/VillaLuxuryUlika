"use client";

import { useMemo, useState } from "react";
import type { Copy } from "@/lib/site/copy";
import type { PriceRow } from "@/lib/store/types";

function utcDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

export default function PriceCalendar({
  copy,
  locale,
  days,
  closedLabel,
}: {
  copy: Copy;
  locale: string;
  days: PriceRow[];
  closedLabel: string;
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
  const month = months[index];
  const label = useMemo(() => {
    if (!month) return "";
    return new Intl.DateTimeFormat(locale, {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(utcDate(`${month.id}-01`));
  }, [locale, month]);

  const longDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
    [locale]
  );

  if (!month) return null;
  const first = utcDate(month.days[0].date);
  const lead = (first.getUTCDay() + 6) % 7;
  const cells: (PriceRow | null)[] = [...Array.from({ length: lead }, () => null), ...month.days];

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-full border border-sand px-3 py-2 text-sm text-ink disabled:opacity-40"
          onClick={() => setIndex((value) => value - 1)}
          disabled={index === 0}
        >
          {copy.prices.previous}
        </button>
        <label className="min-w-0 flex-1 text-center">
          <span className="sr-only">{copy.prices.month}</span>
          <select
            className="w-full max-w-xs bg-transparent text-center font-display text-2xl capitalize text-ink"
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
          >
            {months.map((item, itemIndex) => (
              <option key={item.id} value={itemIndex}>
                {new Intl.DateTimeFormat(locale, {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(utcDate(`${item.id}-01`))}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="rounded-full border border-sand px-3 py-2 text-sm text-ink disabled:opacity-40"
          onClick={() => setIndex((value) => value + 1)}
          disabled={index === months.length - 1}
        >
          {copy.prices.next}
        </button>
      </div>
      <p className="mt-2 text-center text-sm text-ink/60">
        {label} · {copy.prices.currency}
      </p>
      <div className="mt-6 grid grid-cols-7 gap-1 text-center text-xs uppercase tracking-wide text-ink/50 sm:gap-2">
        {copy.prices.weekdays.map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="grid min-h-[24rem] grid-cols-7 gap-1 sm:gap-2">
        {cells.map((cell, cellIndex) => {
          if (!cell) return <div key={`empty-${cellIndex}`} />;
          const dayNumber = Number(cell.date.slice(-2));
          const amount = cell.price == null ? copy.prices.unavailable : `${cell.price} ${copy.prices.currency}`;
          const spoken = cell.closed
            ? `${longDate.format(utcDate(cell.date))}, ${closedLabel}, ${amount}`
            : `${longDate.format(utcDate(cell.date))}, ${amount}`;
          return (
            <div
              key={cell.date}
              aria-label={spoken}
              className={`flex h-16 flex-col items-center justify-center rounded-xl border sm:h-20 ${
                cell.closed
                  ? "border-clay/40 bg-clay/10 text-ink/70"
                  : cell.price == null
                    ? "border-transparent bg-stone/50 text-ink/35"
                    : "border-sand bg-paper text-ink"
              }`}
            >
              <span className="text-xs">{dayNumber}</span>
              <span className="text-sm font-medium sm:text-base">{cell.price == null ? "—" : cell.price}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
