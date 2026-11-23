"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const DatePopover = dynamic(() => import("./DatePopover"), { ssr: false });

export default function Dates({
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

  return (
    <div className="hs-f" style={{ position: "relative" }}>
      <label>
        {arrivalLabel}
        <button type="button" className="date-btn" onClick={() => setOpen(true)}>
          {arrival}
        </button>
      </label>
      <label>
        {departureLabel}
        <button type="button" className="date-btn" onClick={() => setOpen(true)}>
          {departure}
        </button>
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
