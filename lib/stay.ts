export const STAY_KEY = "ulika-stay";

export type StayPick = {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
};

export function readStay(): StayPick | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(localStorage.getItem(STAY_KEY) || "") as StayPick;
    if (!parsed || typeof parsed.arrival !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeStay(value: StayPick) {
  localStorage.setItem(STAY_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event("ulika-stay"));
}

export function formatStay(iso: string, locale: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return "";
  if (locale === "hr") return `${day}.${month}.${year}.`;
  if (locale === "de") return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`;
  if (locale === "it") return `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
  return `${day}.${month}.${year}`;
}
