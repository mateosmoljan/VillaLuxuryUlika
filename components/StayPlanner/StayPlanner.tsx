"use client";

import { useEffect, useMemo, useState } from "react";
import { bookings } from "@/lib/bookings";
import { dailyPrices } from "@/lib/dailyPrices";
import { formatStay, readStay, writeStay, type StayPick } from "@/lib/stay";
import { Link } from "@/navigation";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import "./stay.css";

type Day = { date: string; price: number | null; closed: boolean };

const copy = {
  hr: {
    booked: "Zauzeto",
    free: "Slobodno",
    today: "Danas",
    selected: "Odabrani termin",
    past: "Prošli datum",
    ask: "Na upit",
    nights: "noći",
    total: "Zbroj navedenih noći",
    advance: "Predujam 30 %",
    rest: "70 % pri dolasku",
    prev: "Prethodni mjesec",
    next: "Sljedeći mjesec",
    blocked: "Termin uključuje zauzetu noć.",
    in: "Dolazak",
    out: "Odlazak",
    adults: "Odrasli",
    children: "Djeca",
  },
  en: {
    booked: "Booked",
    free: "Free",
    today: "Today",
    selected: "Selected stay",
    past: "Past date",
    ask: "On request",
    nights: "nights",
    total: "Sum of listed nights",
    advance: "30% advance",
    rest: "70% on arrival",
    prev: "Previous month",
    next: "Next month",
    blocked: "That stay includes a booked night.",
    in: "Arrival",
    out: "Departure",
    adults: "Adults",
    children: "Children",
  },
  de: {
    booked: "Belegt",
    free: "Frei",
    today: "Heute",
    selected: "Gewählter Termin",
    past: "Vergangen",
    ask: "Auf Anfrage",
    nights: "Nächte",
    total: "Summe der genannten Nächte",
    advance: "30 % Anzahlung",
    rest: "70 % bei Ankunft",
    prev: "Vorheriger Monat",
    next: "Nächster Monat",
    blocked: "Der Termin enthält eine belegte Nacht.",
    in: "Ankunft",
    out: "Abreise",
    adults: "Erwachsene",
    children: "Kinder",
  },
  it: {
    booked: "Occupato",
    free: "Libero",
    today: "Oggi",
    selected: "Soggiorno scelto",
    past: "Data passata",
    ask: "Su richiesta",
    nights: "notti",
    total: "Somma delle notti indicate",
    advance: "Acconto 30 %",
    rest: "70 % all'arrivo",
    prev: "Mese precedente",
    next: "Mese successivo",
    blocked: "Il soggiorno include una notte occupata.",
    in: "Arrivo",
    out: "Partenza",
    adults: "Adulti",
    children: "Bambini",
  },
} as const;

const messages = { hr, en, de, it } as const;

function iso(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function addDay(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day + 1);
  return iso(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function todayIso() {
  const date = new Date();
  return iso(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

function monthLabel(year: number, month: number, locale: string) {
  const name = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(
    new Date(year, month - 1, 1)
  );
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
}

function weekdays(locale: string) {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, index) => formatter.format(new Date(2024, 0, 1 + index)));
}

function stayDays(): Day[] {
  const closed = new Set<string>();
  bookings.forEach((booking) => {
    const start = new Date(booking.from);
    const end = new Date(booking.to);
    const cursor = new Date(start);
    cursor.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    while (cursor < end) {
      closed.add(iso(cursor.getFullYear(), cursor.getMonth() + 1, cursor.getDate()));
      cursor.setDate(cursor.getDate() + 1);
    }
  });
  return Object.entries(dailyPrices).map(([date, price]) => ({
    date,
    price,
    closed: closed.has(date),
  }));
}

function lastPricedMonth() {
  let year = 0;
  let month = 0;
  Object.entries(dailyPrices).forEach(([date, price]) => {
    if (price == null) return;
    const y = Number(date.slice(0, 4));
    const m = Number(date.slice(5, 7));
    if (y > year || (y === year && m > month)) {
      year = y;
      month = m;
    }
  });
  return { year, month };
}

export default function StayPlanner({ locale }: { locale: string }) {
  const text = copy[locale as keyof typeof copy] ?? copy.en;
  const pack = messages[locale as keyof typeof messages] ?? en;
  const depositNote = pack.Payment_conditions.des3;
  const days = useMemo(() => stayDays(), []);
  const known = useMemo(() => {
    const map = new Map<string, Day>();
    days.forEach((day) => map.set(day.date, day));
    return map;
  }, [days]);
  const today = todayIso();
  const [cursor, setCursor] = useState(() => {
    const date = new Date();
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  });
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [notice, setNotice] = useState("");
  const [hover, setHover] = useState("");

  useEffect(() => {
    const saved = readStay();
    if (saved?.arrival) setArrival(saved.arrival);
    if (saved?.departure) setDeparture(saved.departure);
    if (saved?.adults) setAdults(saved.adults);
    if (saved?.children) setChildren(saved.children);
    function onStay() {
      const next = readStay();
      if (!next) return;
      setArrival(next.arrival || "");
      setDeparture(next.departure || "");
      setAdults(next.adults || 2);
      setChildren(next.children || 0);
    }
    window.addEventListener("ulika-stay", onStay);
    return () => window.removeEventListener("ulika-stay", onStay);
  }, []);

  function publish(next: StayPick) {
    writeStay(next);
  }

  function shift(by: number) {
    const date = new Date(cursor.year, cursor.month - 1 + by, 1);
    const now = new Date();
    const floor = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = lastPricedMonth();
    const ceiling = new Date(last.year, last.month - 1, 1);
    if (date < floor || date > ceiling) return;
    setCursor({ year: date.getFullYear(), month: date.getMonth() + 1 });
  }

  function choose(date: string) {
    if (date < today) return;
    const row = known.get(date);
    if (row?.closed) return;
    const guests = { adults, children };
    if (!arrival || departure) {
      setArrival(date);
      setDeparture("");
      setNotice("");
      publish({ arrival: date, departure: "", ...guests });
      return;
    }
    if (date <= arrival) {
      setArrival(date);
      setDeparture("");
      publish({ arrival: date, departure: "", ...guests });
      return;
    }
    for (let cursorDate = arrival; cursorDate < date; cursorDate = addDay(cursorDate)) {
      if (known.get(cursorDate)?.closed) {
        setNotice(text.blocked);
        return;
      }
    }
    setDeparture(date);
    setNotice("");
    publish({ arrival, departure: date, ...guests });
  }

  function rangeIsOpen(from: string, to: string) {
    if (!from || !to || to <= from) return false;
    for (let cursorDate = from; cursorDate < to; cursorDate = addDay(cursorDate)) {
      if (known.get(cursorDate)?.closed) return false;
    }
    return true;
  }

  const nights = useMemo(() => {
    if (!arrival || !departure || departure <= arrival) return [];
    const list: string[] = [];
    for (let date = arrival; date < departure; date = addDay(date)) list.push(date);
    return list;
  }, [arrival, departure]);

  const priced = nights.map((date) => known.get(date)?.price ?? null);
  const complete = nights.length > 0 && priced.every((price) => price != null);
  const sum = complete ? priced.reduce<number>((total, price) => total + (price ?? 0), 0) : null;
  const advance = sum == null ? null : Math.round(sum * 0.3);
  const rest = sum == null || advance == null ? null : sum - advance;

  const months = [0, 1].map((offset) => {
    const date = new Date(cursor.year, cursor.month - 1 + offset, 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  });
  const now = new Date();
  const atStart = cursor.year === now.getFullYear() && cursor.month === now.getMonth() + 1;
  const last = lastPricedMonth();
  const shownEnd = months[1];
  const atEnd =
    shownEnd.year > last.year || (shownEnd.year === last.year && shownEnd.month >= last.month);

  return (
    <div className="stay-cal">
      <div className="cal-nav">
        <button className="cal-arrow" type="button" onClick={() => shift(-1)} disabled={atStart} aria-label={text.prev}>
          ‹
        </button>
        <button className="cal-arrow" type="button" onClick={() => shift(1)} disabled={atEnd} aria-label={text.next}>
          ›
        </button>
      </div>
      <div className="cal-months" onMouseLeave={() => setHover("")}>
        {months.map((month) => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            locale={locale}
            today={today}
            arrival={arrival}
            departure={departure}
            hover={hover}
            preview={!departure && rangeIsOpen(arrival, hover)}
            known={known}
            labels={text}
            onChoose={choose}
            onHover={setHover}
          />
        ))}
      </div>
      <ul className="legend" aria-label={text.selected}>
        <li><i className="sw booked" /> {text.booked}</li>
        <li><i className="sw free" /> {text.free}</li>
        <li><i className="sw ask" /> {text.ask}</li>
        <li><i className="sw today" /> {text.today}</li>
        <li><i className="sw selected" /> {text.selected}</li>
      </ul>
      {notice ? <p role="status">{notice}</p> : null}
      <div className="calc">
        <p className="calc-title">{text.in} / {text.out}</p>
        <div className="calc-grid">
          <label>
            {text.in}
            <input readOnly value={arrival ? formatStay(arrival, locale) : ""} />
          </label>
          <label>
            {text.out}
            <input readOnly value={departure ? formatStay(departure, locale) : ""} />
          </label>
          <label>
            {text.adults}
            <select
              value={adults}
              onChange={(event) => {
                const next = Number(event.target.value);
                const kids = Math.min(children, 8 - next);
                setAdults(next);
                setChildren(kids);
                publish({ arrival, departure, adults: next, children: kids });
              }}
            >
              {Array.from({ length: 8 - children }, (_, index) => index + 1).map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </label>
          <label>
            {text.children}
            <select
              value={children}
              onChange={(event) => {
                const next = Number(event.target.value);
                setChildren(next);
                publish({ arrival, departure, adults, children: next });
              }}
            >
              {Array.from({ length: 8 - adults + 1 }, (_, index) => index).map((count) => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="stay-meta">
          {nights.length} {text.nights} · {text.adults} {adults} · {text.children} {children}
        </p>
        {nights.length > 0 ? (
          <ul className="nights">
            {nights.map((date, index) => (
              <li key={date}>
                {formatStay(date, locale)} — {priced[index] == null ? text.ask : `${priced[index]} €`}
              </li>
            ))}
          </ul>
        ) : null}
        <p className="total">
          <span>{text.total}</span>
          <strong>{sum == null ? text.ask : `${sum} €`}</strong>
        </p>
        {advance != null && rest != null ? (
          <p className="split">
            {text.advance}: {advance} € · {text.rest}: {rest} €
          </p>
        ) : null}
        <p className="note">{depositNote}</p>
        <Link
          href={`/contact?arrival=${encodeURIComponent(arrival)}&departure=${encodeURIComponent(departure)}`}
          className="btn justify-center mt-3"
        >
          {pack.Villa_BookStay.button}
        </Link>
      </div>
    </div>
  );
}

function Month({
  year, month, locale, today, arrival, departure, hover, preview, known, labels, onChoose, onHover,
}: {
  year: number;
  month: number;
  locale: string;
  today: string;
  arrival: string;
  departure: string;
  hover: string;
  preview: boolean;
  known: Map<string, Day>;
  labels: (typeof copy)[keyof typeof copy];
  onChoose: (date: string) => void;
  onHover: (date: string) => void;
}) {
  const first = new Date(year, month - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const count = new Date(year, month, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];
  return (
    <div className="cal-month">
      <h3>{monthLabel(year, month, locale)}</h3>
      <div className="pcal-wd">
        {weekdays(locale).map((day) => (
          <div key={`${year}-${month}-${day}`}>{day}</div>
        ))}
      </div>
      <div className="pcal">
        {cells.map((day, index) => {
          if (!day) return <span key={`e${index}`} />;
          const date = iso(year, month, day);
          const row = known.get(date);
          const past = date < today;
          const closed = Boolean(row?.closed);
          const unpriced = !closed && (row ? row.price == null : true);
          const hasRange = Boolean(arrival && departure && departure > arrival);
          const previewing = preview && hover > arrival;
          const isArrival = date === arrival && Boolean(arrival);
          const isDepart = (hasRange && date === departure) || (previewing && date === hover);
          const isBetween =
            (hasRange && date > arrival && date < departure) ||
            (previewing && date > arrival && date < hover);
          const state = past ? labels.past : closed ? labels.booked : unpriced ? labels.ask : labels.free;
          const className = [
            "day",
            past ? "past" : "",
            closed ? "booked" : "",
            !past && !closed && unpriced ? "ask" : "",
            !past && !closed && !unpriced ? "free" : "",
            date === today ? "today" : "",
            isBetween ? "between" : "",
            isArrival ? "arrive" : "",
            isDepart ? "depart" : "",
          ]
            .filter(Boolean)
            .join(" ");
          const priceLabel = row?.price != null && !isDepart ? `, ${row.price} €` : "";
          const when = isArrival ? labels.in : isDepart ? labels.out : date === today ? labels.today : state;
          return (
            <button
              key={date}
              type="button"
              className={className}
              disabled={past || closed}
              aria-pressed={isArrival || isBetween || (hasRange && isDepart)}
              aria-label={`${formatStay(date, locale)}, ${when}${priceLabel}`}
              onMouseEnter={() => onHover(past || closed ? "" : date)}
              onFocus={() => onHover(past || closed ? "" : date)}
              onClick={() => onChoose(date)}
            >
              <span className="num">{day}</span>
              {row?.price != null && !past && !closed && !isDepart ? <small>{row.price} €</small> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
