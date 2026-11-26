"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Cell = {
  date: string;
  price: number | null;
  basePrice: number | null;
  closed: boolean;
  minNights: number | null;
  note: string;
  overridden: boolean;
};

const MONTHS = ["sij", "velj", "ožu", "tra", "svi", "lip", "srp", "kol", "ruj", "lis", "stu", "pro"];
const WEEKDAYS = ["pon", "uto", "sri", "čet", "pet", "sub", "ned"];

export default function AdminCalendar() {
  const router = useRouter();
  const [days, setDays] = useState<Cell[]>([]);
  const [notice, setNotice] = useState("");
  const [writable, setWritable] = useState(false);
  const [cursor, setCursor] = useState(() => currentMonth());
  const [anchor, setAnchor] = useState("");
  const [end, setEnd] = useState("");
  const [awaitingEnd, setAwaitingEnd] = useState(false);
  const [dragFrom, setDragFrom] = useState("");
  const [dragging, setDragging] = useState(false);
  const [availability, setAvailability] = useState<"open" | "closed" | "">("");
  const [price, setPrice] = useState("");
  const [minNights, setMinNights] = useState("");
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);
  const [toast, setToast] = useState("");

  async function load() {
    const response = await fetch("/api/admin/calendar", { cache: "no-store" });
    if (response.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await response.json();
    setDays(data.days || []);
    setNotice(data.notice || "");
    setWritable(Boolean(data.writable));
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") clearSelection();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const known = useMemo(() => {
    const map = new Map<string, Cell>();
    days.forEach((day) => map.set(day.date, day));
    return map;
  }, [days]);

  const monthKey = `${cursor.year}-${String(cursor.month).padStart(2, "0")}`;
  const monthDays = useMemo(
    () => days.filter((day) => day.date.startsWith(monthKey)),
    [days, monthKey]
  );
  const from = anchor && end ? (anchor < end ? anchor : end) : anchor;
  const to = anchor && end ? (anchor < end ? end : anchor) : anchor;
  const selected = useMemo(() => {
    if (!from) return [];
    return days.filter((day) => day.date >= from && day.date <= (to || from));
  }, [days, from, to]);
  const blockedInMonth = monthDays.filter((day) => day.closed && day.date >= todayIso()).length;
  const mixed = selected.length > 0 && selected.some((day) => day.closed) && selected.some((day) => !day.closed);
  const offset = (new Date(cursor.year, cursor.month - 1, 1).getDay() + 6) % 7;
  const monthTitle = `${capitalize(new Intl.DateTimeFormat("hr", { month: "long" }).format(new Date(cursor.year, cursor.month - 1, 1)))} ${cursor.year}`;

  function clearSelection() {
    setAnchor("");
    setEnd("");
    setAwaitingEnd(false);
    setDragging(false);
    setDragFrom("");
    setAvailability("");
    setPrice("");
    setMinNights("");
    setNote("");
  }

  function begin(date: string) {
    if (isPast(date)) return;
    setDragFrom(date);
    setDragging(false);
  }

  function move(date: string) {
    if (!dragFrom || isPast(date) || date === dragFrom) return;
    setDragging(true);
    setAnchor(dragFrom);
    setEnd(date);
    setAwaitingEnd(false);
  }

  function finish(date: string) {
    if (isPast(date)) {
      setDragFrom("");
      setDragging(false);
      return;
    }
    if (dragging && dragFrom) {
      setAnchor(dragFrom);
      setEnd(date);
      setAwaitingEnd(false);
    } else if (awaitingEnd && anchor && date !== anchor) {
      setEnd(date);
      setAwaitingEnd(false);
    } else {
      setAnchor(date);
      setEnd("");
      setAwaitingEnd(true);
      const cell = known.get(date);
      setNote(cell?.note || "");
      setAvailability(cell?.closed ? "closed" : "open");
    }
    setDragFrom("");
    setDragging(false);
  }

  async function save() {
    if (!from || !availability) return;
    setPending(true);
    const range = { from, to: to || from };
    const availabilityResponse = await fetch("/api/admin/calendar", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...range, action: availability === "closed" ? "close" : "open" }),
    });
    if (!availabilityResponse.ok) {
      setPending(false);
      setToast("Spremanje nije uspjelo");
      return;
    }
    if (price !== "" || minNights !== "" || note !== "") {
      const patch: Record<string, unknown> = { ...range, action: "save", note };
      if (price !== "") patch.price = Number(price);
      if (minNights === "default") patch.minNights = null;
      else if (minNights !== "") patch.minNights = Number(minNights);
      const saveResponse = await fetch("/api/admin/calendar", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      });
      if (!saveResponse.ok) {
        setPending(false);
        setToast("Spremanje nije uspjelo");
        return;
      }
    }
    setPending(false);
    setToast(availability === "closed" ? "Datumi zatvoreni" : "Datumi otvoreni");
    window.setTimeout(() => setToast(""), 2200);
    await load();
  }

  return (
    <div className="shell">
      <section className="calendar" aria-label="Kalendar">
        <div className="topbar">
          <div className="month-nav">
            <button type="button" className="icon" onClick={() => setCursor(shift(cursor, -1))} aria-label="Prethodni mjesec">‹</button>
            <h1>{monthTitle}</h1>
            <button type="button" className="icon" onClick={() => setCursor(shift(cursor, 1))} aria-label="Sljedeći mjesec">›</button>
            <button type="button" className="today" onClick={() => setCursor(currentMonth())}>Danas</button>
          </div>
          <div className="top-actions">
            <ul className="legend">
              <li><i className="sw free" /> Slobodno</li>
              <li><i className="sw blocked" /> Zatvoreno</li>
            </ul>
            <button
              type="button"
              className="logout"
              onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                router.push("/admin/login");
                router.refresh();
              }}
            >
              Odjava
            </button>
          </div>
        </div>
        {notice ? <p className="notice">{notice}</p> : null}
        <div className="grid">
          {WEEKDAYS.map((day) => <div className="dow" key={day}>{day}</div>)}
          {Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} />)}
          {monthDays.map((day) => {
            const past = isPast(day.date);
            const inRange = Boolean(from && day.date >= from && day.date <= (to || from) && !past);
            const edge = inRange && (day.date === from || day.date === (to || from));
            return (
              <button
                key={day.date}
                type="button"
                disabled={past}
                className={[
                  "cell",
                  past ? "past" : "",
                  day.closed ? "blocked" : "free",
                  day.date === todayIso() ? "today" : "",
                  inRange ? "in-range" : "",
                  edge ? "edge" : "",
                ].filter(Boolean).join(" ")}
                onPointerDown={() => begin(day.date)}
                onPointerEnter={() => move(day.date)}
                onPointerUp={() => finish(day.date)}
              >
                <span className="num">{Number(day.date.slice(8))}</span>
                {day.price != null ? <span className="price">{day.price} €</span> : null}
                {day.note ? <span className="note-dot" aria-hidden /> : null}
              </button>
            );
          })}
        </div>
      </section>
      <aside className={`inspector${from ? " open" : ""}`} aria-label="Odabrani datumi">
        {from ? (
          <>
            <div className="inspector-head">
              <div>
                <h2>{rangeTitle(from, to || from)}</h2>
                <p>{dayCount(from, to || from)}</p>
              </div>
              <button type="button" className="icon" onClick={clearSelection} aria-label="Poništi odabir">×</button>
            </div>
            {mixed ? <p className="mixed">Raspon je mješovit. Odaberi stanje za sve dane.</p> : null}
            <div className="segment" role="group" aria-label="Dostupnost">
              <button type="button" className={availability === "open" ? "on" : ""} onClick={() => setAvailability("open")}>
                {availability === "open" ? "✓ " : ""}Slobodno
              </button>
              <button type="button" className={availability === "closed" ? "on" : ""} onClick={() => setAvailability("closed")}>
                {availability === "closed" ? "✓ " : ""}Zatvoreno
              </button>
            </div>
            <label>
              Bilješka (opcionalno)
              <input value={note} onChange={(event) => setNote(event.target.value)} />
            </label>
            <label>
              Cijena € (opcionalno)
              <input inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} />
            </label>
            <label>
              Min. noći (opcionalno)
              <input value={minNights} placeholder="zadano" onChange={(event) => setMinNights(event.target.value)} />
            </label>
            <button type="button" className="save" disabled={!writable || !availability || pending} onClick={save}>
              {pending ? "Spremam…" : "Spremi"}
            </button>
            <button type="button" className="cancel" onClick={clearSelection}>Odustani</button>
          </>
        ) : (
          <div className="empty">
            <h2>Odaberi datum ili raspon na kalendaru za otvaranje ili zatvaranje</h2>
            <p>{blockedInMonth} zatvorenih noći u ovom mjesecu.</p>
          </div>
        )}
      </aside>
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </div>
  );
}

function currentMonth() {
  const now = new Date();
  return { year: now.getFullYear(), month: now.getMonth() + 1 };
}

function shift(cursor: { year: number; month: number }, by: number) {
  const date = new Date(cursor.year, cursor.month - 1 + by, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}

function todayIso() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isPast(date: string) {
  return date < todayIso();
}

function capitalize(value: string) {
  return value.charAt(0).toLocaleUpperCase("hr") + value.slice(1);
}

function formatPart(date: string) {
  const month = Number(date.slice(5, 7));
  const day = Number(date.slice(8, 10));
  return `${day}. ${MONTHS[month - 1]}`;
}

function rangeTitle(from: string, to: string) {
  if (from === to) return `${formatPart(from)} ${from.slice(0, 4)}.`;
  if (from.slice(0, 4) === to.slice(0, 4)) return `${formatPart(from)} – ${formatPart(to)} ${to.slice(0, 4)}.`;
  return `${formatPart(from)} ${from.slice(0, 4)}. – ${formatPart(to)} ${to.slice(0, 4)}.`;
}

function dayCount(from: string, to: string) {
  const start = new Date(`${from}T00:00:00`);
  const end = new Date(`${to}T00:00:00`);
  const count = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  return count === 1 ? "1 dan" : `${count} dana`;
}
