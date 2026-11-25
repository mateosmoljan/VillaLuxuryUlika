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

export default function AdminCalendar() {
  const router = useRouter();
  const [days, setDays] = useState<Cell[]>([]);
  const [notice, setNotice] = useState("");
  const [writable, setWritable] = useState(false);
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  });
  const [anchor, setAnchor] = useState("");
  const [end, setEnd] = useState("");
  const [price, setPrice] = useState("");
  const [minNights, setMinNights] = useState("");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

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

  const monthDays = useMemo(
    () => days.filter((day) => day.date.startsWith(`${cursor.year}-${String(cursor.month).padStart(2, "0")}`)),
    [days, cursor]
  );
  const from = anchor && end ? (anchor < end ? anchor : end) : anchor;
  const to = anchor && end ? (anchor < end ? end : anchor) : anchor;
  const title = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(
    new Date(cursor.year, cursor.month - 1, 1)
  );
  const offset = (new Date(cursor.year, cursor.month - 1, 1).getDay() + 6) % 7;

  function choose(date: string) {
    if (!anchor || (anchor && end)) {
      setAnchor(date);
      setEnd("");
      return;
    }
    setEnd(date);
  }

  async function send(action: "save" | "close" | "open" | "reset") {
    if (!from) return;
    setMessage("");
    const body: Record<string, unknown> = { from, to: to || from, action };
    if (action === "save") {
      if (price !== "") body.price = Number(price);
      if (minNights === "default") body.minNights = null;
      else if (minNights !== "") body.minNights = Number(minNights);
      body.note = note;
    }
    const response = await fetch("/api/admin/calendar", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error || "Could not save.");
      return;
    }
    setMessage("Saved.");
    await load();
  }

  return (
    <>
      <header>
        <h1>Calendar</h1>
        <button
          type="button"
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
          }}
        >
          Log out
        </button>
      </header>
      {notice ? <p className="notice">{notice}</p> : null}
      <div className="nav">
        <button type="button" onClick={() => setCursor(shift(cursor, -1))} aria-label="Previous month">
          ‹
        </button>
        <strong>{title}</strong>
        <button type="button" onClick={() => setCursor(shift(cursor, 1))} aria-label="Next month">
          ›
        </button>
      </div>
      <div className="grid" aria-label="Admin calendar">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div className="dow" key={day}>{day}</div>
        ))}
        {Array.from({ length: offset }, (_, index) => (
          <span key={`e${index}`} />
        ))}
        {monthDays.map((day) => {
          const selected = from && to && day.date >= from && day.date <= to;
          return (
            <button
              key={day.date}
              type="button"
              className={`cell${day.closed ? " closed" : ""}${selected ? " selected" : ""}`}
              onClick={() => choose(day.date)}
            >
              {Number(day.date.slice(8))}
              <small>{day.price == null ? "—" : `${day.price} €`}</small>
            </button>
          );
        })}
      </div>
      <div className="panel" style={{ marginTop: "1rem" }}>
        <p>{from ? `${from}${to && to !== from ? ` – ${to}` : ""}` : "Select a date or a range."}</p>
        <div className="row">
          <label>
            Daily price €
            <input inputMode="decimal" value={price} onChange={(event) => setPrice(event.target.value)} />
          </label>
          <label>
            Min nights
            <input value={minNights} placeholder="default" onChange={(event) => setMinNights(event.target.value)} />
          </label>
          <label>
            Note
            <input value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
        </div>
        <div className="row" style={{ marginTop: "0.8rem" }}>
          <button className="gold" type="button" disabled={!writable || !from} onClick={() => send("save")}>
            Save
          </button>
          <button type="button" disabled={!writable || !from} onClick={() => send("close")}>
            Close
          </button>
          <button type="button" disabled={!writable || !from} onClick={() => send("open")}>
            Open
          </button>
          <button type="button" disabled={!writable || !from} onClick={() => send("reset")}>
            Reset
          </button>
        </div>
        {message ? <p>{message}</p> : null}
      </div>
    </>
  );
}

function shift(cursor: { year: number; month: number }, by: number) {
  const date = new Date(cursor.year, cursor.month - 1 + by, 1);
  return { year: date.getFullYear(), month: date.getMonth() + 1 };
}
