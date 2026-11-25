"use client";

import { useEffect, useMemo, useState } from "react";
import { formatStay, readStay, writeStay, type StayPick } from "@/lib/brochure/staySync";

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
    rest: "Ostatak pri dolasku",
    confirm: "Konačnu cijenu potvrđuje domaćin.",
    prev: "Prethodni mjesec",
    next: "Sljedeći mjesec",
    blocked: "Termin uključuje zauzetu noć.",
    in: "Dolazak",
    out: "Odlazak",
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
    rest: "Remainder on arrival",
    confirm: "The host confirms the final price.",
    prev: "Previous month",
    next: "Next month",
    blocked: "That stay includes a booked night.",
    in: "Arrival",
    out: "Departure",
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
    rest: "Rest bei Ankunft",
    confirm: "Der Gastgeber bestätigt den Endpreis.",
    prev: "Vorheriger Monat",
    next: "Nächster Monat",
    blocked: "Der Termin enthält eine belegte Nacht.",
    in: "Ankunft",
    out: "Abreise",
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
    rest: "Saldo all'arrivo",
    confirm: "Il prezzo finale lo conferma il proprietario.",
    prev: "Mese precedente",
    next: "Mese successivo",
    blocked: "Il soggiorno include una notte occupata.",
    in: "Arrivo",
    out: "Partenza",
  },
} as const;

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
  const name = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1));
  return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
}

function weekdays(locale: string) {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, index) => format.format(new Date(2024, 0, 1 + index)));
}

export default function StayPlanner({
  locale,
  days,
  notes,
  adultsLabel,
  childrenLabel,
}: {
  locale: string;
  days: Day[];
  notes: { advance: string; deposit: string; times: string; pets: string };
  adultsLabel: string;
  childrenLabel: string;
}) {
  const text = copy[locale as keyof typeof copy] ?? copy.en;
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

  useEffect(() => {
    const saved = readStay();
    const query = new URLSearchParams(window.location.search);
    const nextArrival = query.get("arrival") || saved?.arrival || "";
    const nextDeparture = query.get("departure") || saved?.departure || "";
    if (nextArrival) setArrival(nextArrival);
    if (nextDeparture) setDeparture(nextDeparture);
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
    if (date < floor) return;
    if (date > new Date(2027, 11, 1)) return;
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

  const months = [0, 1].map((offset) => {
    const date = new Date(cursor.year, cursor.month - 1 + offset, 1);
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  });
  const now = new Date();
  const atStart = cursor.year === now.getFullYear() && cursor.month === now.getMonth() + 1;

  return (
    <div className="stay">
      <div className="sec-h">
        <button className="btn btn-line" type="button" onClick={() => shift(-1)} disabled={atStart} aria-label={text.prev}>
          ‹
        </button>
        <button className="btn btn-line" type="button" onClick={() => shift(1)} aria-label={text.next}>
          ›
        </button>
      </div>
      <div className="cal-months">
        {months.map((month) => (
          <Month
            key={`${month.year}-${month.month}`}
            year={month.year}
            month={month.month}
            locale={locale}
            today={today}
            arrival={arrival}
            departure={departure}
            known={known}
            labels={text}
            onChoose={choose}
          />
        ))}
      </div>
      <ul className="legend" aria-label={text.selected}>
        <li><i className="sw booked" /> {text.booked}</li>
        <li><i className="sw free" /> {text.free}</li>
        <li><i className="sw ask" /> {text.ask}</li>
        <li><i className="sw today" /> {text.today}</li>
        <li><i className="sw selected" /> {text.selected}</li>
        <li><i className="sw past" /> {text.past}</li>
      </ul>
      {notice ? <p role="status">{notice}</p> : null}
      <form className="calc" action={`/${locale}/contact`} method="get">
        <p className="hs-h">{text.in} / {text.out}</p>
        <div className="hs-f">
          <label>{text.in}<input readOnly value={arrival ? formatStay(arrival, locale) : ""} /></label>
          <label>{text.out}<input readOnly value={departure ? formatStay(departure, locale) : ""} /></label>
          <label>{adultsLabel}
            <select name="adults" value={adults} onChange={(event) => {
              const next = Number(event.target.value);
              const kids = Math.min(children, 8 - next);
              setAdults(next);
              setChildren(kids);
              publish({ arrival, departure, adults: next, children: kids });
            }}>
              {Array.from({ length: 8 - children }, (_, index) => index + 1).map((count) => <option key={count}>{count}</option>)}
            </select>
          </label>
          <label>{childrenLabel}
            <select name="children" value={children} onChange={(event) => {
              const next = Number(event.target.value);
              setChildren(next);
              publish({ arrival, departure, adults, children: next });
            }}>
              {Array.from({ length: 8 - adults + 1 }, (_, index) => index).map((count) => <option key={count}>{count}</option>)}
            </select>
          </label>
        </div>
        <input type="hidden" name="arrival" value={arrival} />
        <input type="hidden" name="departure" value={departure} />
        <p>{nights.length} {text.nights} · {adultsLabel} {adults} · {childrenLabel} {children}</p>
        <ul>
          {nights.map((date, index) => (
            <li key={date}>{formatStay(date, locale)} — {priced[index] == null ? text.ask : priced[index]}</li>
          ))}
        </ul>
        <p><b>{text.total}:</b> {sum == null ? text.ask : sum}</p>
        {advance != null ? (
          <p>{text.advance}: {advance} · {text.rest}: {(sum ?? 0) - advance}</p>
        ) : null}
        <p>{notes.advance}</p>
        <p>{notes.deposit}</p>
        <p>{notes.times}</p>
        <p>{notes.pets}</p>
        <p>{text.confirm}</p>
        <button className="btn btn-cta" type="submit">{text.in}</button>
      </form>
    </div>
  );
}

function Month({
  year, month, locale, today, arrival, departure, known, labels, onChoose,
}: {
  year: number;
  month: number;
  locale: string;
  today: string;
  arrival: string;
  departure: string;
  known: Map<string, Day>;
  labels: (typeof copy)[keyof typeof copy];
  onChoose: (date: string) => void;
}) {
  const first = new Date(year, month - 1, 1);
  const offset = (first.getDay() + 6) % 7;
  const count = new Date(year, month, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: count }, (_, index) => index + 1)];
  return (
    <div className="cal-month">
      <h3>{monthLabel(year, month, locale)}</h3>
      <div className="pcal-wd">{weekdays(locale).map((day) => <div key={day}>{day}</div>)}</div>
      <div className="pcal">
        {cells.map((day, index) => {
          if (!day) return <span key={`e${index}`} />;
          const date = iso(year, month, day);
          const row = known.get(date);
          const past = date < today;
          const closed = Boolean(row?.closed);
          const unpriced = !closed && (row ? row.price == null : true);
          const selected = arrival && departure ? date >= arrival && date <= departure : date === arrival;
          const state = past ? labels.past : closed ? labels.booked : unpriced ? labels.ask : labels.free;
          const className = ["day", past ? "past" : "", closed ? "booked" : "", !past && !closed && unpriced ? "ask" : "", !past && !closed && !unpriced ? "free" : "", date === today ? "today" : "", selected ? "selected" : ""].filter(Boolean).join(" ");
          return (
            <button
              key={date}
              type="button"
              className={className}
              disabled={past || closed}
              aria-pressed={selected}
              aria-label={`${formatStay(date, locale)}, ${date === today ? labels.today : state}`}
              onClick={() => onChoose(date)}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
