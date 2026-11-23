"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const HeroDatePicker = dynamic(() => import("./HeroDatePicker"), { ssr: false });

export default function HeroDates({
  locale,
  arrivalLabel,
  departureLabel,
}: {
  locale: string;
  arrivalLabel: string;
  departureLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const field = "mt-1 flex h-12 w-full items-center rounded-xl border border-sand bg-white px-3 text-left text-base text-ink";

  return (
    <div className="relative grid gap-3 sm:col-span-2 sm:grid-cols-2">
      <label className="text-sm font-semibold text-ink/70">
        {arrivalLabel}
        <button type="button" className={field} onClick={() => setOpen(true)}>
          {arrival}
        </button>
      </label>
      <label className="text-sm font-semibold text-ink/70">
        {departureLabel}
        <button type="button" className={field} onClick={() => setOpen(true)}>
          {departure}
        </button>
      </label>
      <input type="hidden" name="arrival" value={arrival} />
      <input type="hidden" name="departure" value={departure} />
      {open ? (
        <HeroDatePicker
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
