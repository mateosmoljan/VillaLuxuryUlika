"use client";

import { useMemo, useState } from "react";
import { getDailyPrice } from "@/lib/dailyPrices";

const start = { year: 2026, month: 11 };

export default function PriceMonth({ locale }: { locale: string }) {
  const [cursor, setCursor] = useState(start);
  const label = useMemo(() => {
    const name = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
      new Date(cursor.year, cursor.month - 1, 1),
    );
    return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
  }, [cursor, locale]);
  const first = new Date(cursor.year, cursor.month - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const days = new Date(cursor.year, cursor.month, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];

  function shift(by: number) {
    const date = new Date(cursor.year, cursor.month - 1 + by, 1);
    const next = { year: date.getFullYear(), month: date.getMonth() + 1 };
    if (next.year < 2026 || (next.year === 2026 && next.month < 11)) return;
    if (next.year > 2027 || (next.year === 2027 && next.month > 12)) return;
    setCursor(next);
  }

  return (
    <div>
      <div className="sec-h">
        <button className="btn btn-line" type="button" onClick={() => shift(-1)}>
          ‹
        </button>
        <h2>{label}</h2>
        <button className="btn btn-line" type="button" onClick={() => shift(1)}>
          ›
        </button>
      </div>
      <div className="pcal">
        {cells.map((day, index) => {
          if (!day) return <span key={`e${index}`} />;
          const price = getDailyPrice(cursor.year, cursor.month, day);
          return (
            <b key={day}>
              {day}
              <i>{price == null ? "—" : price}</i>
            </b>
          );
        })}
      </div>
    </div>
  );
}
