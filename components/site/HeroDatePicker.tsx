"use client";

import { useEffect, useRef, useState } from "react";
import { DateRange, type RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import { datePattern, pickerLocale } from "@/lib/site/dateLocale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type Range = { startDate?: Date; endDate?: Date; key?: string };

export default function HeroDatePicker({
  locale,
  onChange,
  onClose,
}: {
  locale: string;
  onChange: (value: { arrival: string; departure: string }) => void;
  onClose: () => void;
}) {
  const picker = pickerLocale(locale);
  const pattern = datePattern(locale);
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<Range[]>([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    setWide(window.innerWidth > 720);
  }, []);

  useEffect(() => {
    function outside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) onClose();
    }
    document.addEventListener("mousedown", outside);
    return () => document.removeEventListener("mousedown", outside);
  }, [onClose]);

  function apply(next: Range[]) {
    setRange(next);
    const start = next[0]?.startDate;
    const end = next[0]?.endDate;
    if (!start || !end) return;
    onChange({
      arrival: format(start, pattern, { locale: picker }),
      departure: format(end, pattern, { locale: picker }),
    });
    if (start.getTime() !== end.getTime()) onClose();
  }

  return (
    <div ref={ref} className="absolute left-0 top-full z-30 mt-2 max-w-[100vw] overflow-auto rounded-2xl border border-sand bg-white p-2 shadow-xl">
      <DateRange
        editableDateInputs
        onChange={(item: RangeKeyDict) => apply([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        months={wide ? 2 : 1}
        locale={picker}
        direction={wide ? "horizontal" : "vertical"}
        rangeColors={["#3e4a34"]}
        dateDisplayFormat={pattern}
      />
    </div>
  );
}
