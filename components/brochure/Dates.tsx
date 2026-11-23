"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const DatePopover = dynamic(() => import("./DatePopover"), { ssr: false });

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
        <select name="adults" value={adults} onChange={(event) => setGuestCount(Number(event.target.value), children)}>
          {Array.from({ length: 8 - children }, (_, index) => index + 1).map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </label>
      <label>
        {childrenLabel}
        <select name="children" value={children} onChange={(event) => setGuestCount(adults, Number(event.target.value))}>
          {Array.from({ length: 8 - adults + 1 }, (_, index) => index).map((count) => (
            <option key={count} value={count}>{count}</option>
          ))}
        </select>
      </label>
      <input type="hidden" name="arrival" value={arrival} />
      <input type="hidden" name="departure" value={departure} />
      {open ? (
        <DatePopover
          locale={locale}
          onChange={(value) => {
            setArrival(value.arrival);
            setDeparture(value.departure);
          }}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}
