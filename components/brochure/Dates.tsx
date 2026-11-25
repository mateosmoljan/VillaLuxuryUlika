"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { formatStay, readStay, writeStay } from "@/lib/brochure/staySync";

const DatePopover = dynamic(() => import("./DatePopover"), { ssr: false });

function toIso(value: string, locale: string) {
  if (!value) return "";
  const parts = locale === "it" ? value.split("/") : value.replace(/\.$/, "").split(".");
  const [day, month, year] = parts;
  if (!year || !month || !day) return "";
  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

const hints: Record<string, string> = {
  hr: "dd.mm.yyyy.",
  de: "tt.mm.jjjj",
  it: "gg/mm/aaaa",
  en: "dd/mm/yyyy",
};

export default function Dates({
  locale,
  arrivalLabel,
  departureLabel,
  adultsLabel,
  childrenLabel,
}: {
  locale: string;
  arrivalLabel: string;
  departureLabel: string;
  adultsLabel: string;
  childrenLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const hint = hints[locale] ?? hints.en;

  useEffect(() => {
    const saved = readStay();
    if (!saved) return;
    if (saved.arrival) setArrival(formatStay(saved.arrival, locale));
    if (saved.departure) setDeparture(formatStay(saved.departure, locale));
    if (saved.adults) setAdults(saved.adults);
    if (saved.children != null) setChildren(saved.children);
    function onStay() {
      const next = readStay();
      if (!next) return;
      setArrival(next.arrival ? formatStay(next.arrival, locale) : "");
      setDeparture(next.departure ? formatStay(next.departure, locale) : "");
      setAdults(next.adults || 2);
      setChildren(next.children || 0);
    }
    window.addEventListener("ulika-stay", onStay);
    return () => window.removeEventListener("ulika-stay", onStay);
  }, [locale]);

  function setGuestCount(nextAdults: number, nextChildren: number) {
    const adultsCapped = Math.min(8, Math.max(1, nextAdults));
    const childrenCapped = Math.min(8 - adultsCapped, Math.max(0, nextChildren));
    setAdults(adultsCapped);
    setChildren(childrenCapped);
  }

  return (
    <div className="hs-f" style={{ position: "relative" }}>
      <label>
        {arrivalLabel}
        <button type="button" className="date-btn" onClick={() => setOpen(true)}>
          <span className={arrival ? "" : "muted"}>{arrival || hint}</span>
        </button>
      </label>
      <label>
        {departureLabel}
        <button type="button" className="date-btn" onClick={() => setOpen(true)}>
          <span className={departure ? "" : "muted"}>{departure || hint}</span>
        </button>
      </label>
      <label>
        {adultsLabel}
        <select name="adults" value={adults} onChange={(event) => {
          const next = Number(event.target.value);
          setGuestCount(next, children);
          const saved = readStay();
          writeStay({ arrival: saved?.arrival || "", departure: saved?.departure || "", adults: next, children: Math.min(children, 8 - next) });
        }}>
          {Array.from({ length: 8 - children }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </label>
      <label>
        {childrenLabel}
        <select name="children" value={children} onChange={(event) => {
          const next = Number(event.target.value);
          setGuestCount(adults, next);
          const saved = readStay();
          writeStay({ arrival: saved?.arrival || "", departure: saved?.departure || "", adults, children: next });
        }}>
          {Array.from({ length: 8 - adults + 1 }, (_, index) => index).map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </label>
      <input type="hidden" name="arrival" value={toIso(arrival, locale)} />
      <input type="hidden" name="departure" value={toIso(departure, locale)} />
      {open ? (
        <DatePopover
          locale={locale}
          onChange={(value) => {
            setArrival(value.arrival);
            setDeparture(value.departure);
            const saved = readStay();
            writeStay({
              arrival: toIso(value.arrival, locale),
              departure: toIso(value.departure, locale),
              adults: saved?.adults || adults,
              children: saved?.children || children,
            });
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
