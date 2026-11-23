"use client";

import { useEffect, useRef, useState } from "react";
import { DateRange, type RangeKeyDict } from "react-date-range";
import { format } from "date-fns";
import hr from "date-fns/locale/hr";
import de from "date-fns/locale/de";
import it from "date-fns/locale/it";
import enGB from "date-fns/locale/en-GB";
import type { Locale } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const bases: Record<string, Locale> = { hr, de, it, en: enGB };

function pattern(code: string) {
  if (code === "hr") return "d.M.yyyy.";
  if (code === "de") return "dd.MM.yyyy";
  if (code === "it") return "dd/MM/yyyy";
  return "d.M.yyyy";
}

type Range = { startDate?: Date; endDate?: Date; key?: string };

export default function DatePopover({
  locale,
  onChange,
  onClose,
}: {
  locale: string;
  onChange: (value: { arrival: string; departure: string }) => void;
  onClose: () => void;
}) {
  const base = bases[locale] ?? enGB;
  const picker = { ...base, options: { ...base.options, weekStartsOn: 1 as const } };
  const stamp = pattern(locale);
  const ref = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState<Range[]>([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    setWide(window.innerWidth > 720);
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
      arrival: format(start, stamp, { locale: picker }),
      departure: format(end, stamp, { locale: picker }),
    });
    if (start.getTime() !== end.getTime()) onClose();
  }

  return (
    <div ref={ref} className="brochure-pop">
      <DateRange
        editableDateInputs
        onChange={(item: RangeKeyDict) => apply([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={range}
        months={wide ? 2 : 1}
        direction={wide ? "horizontal" : "vertical"}
        locale={picker}
        rangeColors={["#3e4a34"]}
        dateDisplayFormat={stamp}
      />
    </div>
  );
}
