/**
 * Minimum nights by arrival date. Edit the windows here.
 * `to` earlier than `from` means the window crosses New Year.
 */
export const defaultMinNights = 3;

export const minStayWindows: { from: string; to: string; nights: number }[] = [
  { from: "12-29", to: "01-01", nights: 4 },
  { from: "05-08", to: "06-04", nights: 4 },
  { from: "06-05", to: "09-10", nights: 7 },
  { from: "09-11", to: "10-01", nights: 4 },
];

/** Holy Thursday through Easter Monday, Western Easter. */
export const easterMinNights = 4;

/** Gregorian Easter Sunday, Meeus/Jones/Butcher. */
export function easterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(year, month, day);
}

export function easterArrivalWindow(year: number) {
  const sunday = easterSunday(year);
  return { from: shiftIso(sunday, -3), to: shiftIso(sunday, 1) };
}

export function minimumNights(arrivalIso: string) {
  const year = Number(arrivalIso.slice(0, 4));
  const easter = easterArrivalWindow(year);
  if (arrivalIso >= easter.from && arrivalIso <= easter.to) return easterMinNights;
  const monthDay = arrivalIso.slice(5);
  for (const window of minStayWindows) {
    const wraps = window.from > window.to;
    const inside = wraps
      ? monthDay >= window.from || monthDay <= window.to
      : monthDay >= window.from && monthDay <= window.to;
    if (inside) return window.nights;
  }
  return defaultMinNights;
}

export function minimumStayMessage(locale: string, nights: number) {
  const word = nightWord(locale, nights);
  if (locale === "hr") return `Minimalni boravak za ovaj termin je ${nights} ${word}.`;
  if (locale === "de") return `Der Mindestaufenthalt für diesen Zeitraum beträgt ${nights} ${word}.`;
  if (locale === "it") return `Il soggiorno minimo per queste date è di ${nights} ${word}.`;
  return `The minimum stay for these dates is ${nights} ${word}.`;
}

/** Shown for the selected arrival, including when the stay is already long enough. */
export function minimumStayHint(locale: string, nights: number) {
  const word = nightWord(locale, nights);
  if (locale === "hr") return `Minimalni boravak: ${nights} ${word}.`;
  if (locale === "de") return `Mindestaufenthalt: ${nights} ${word}.`;
  if (locale === "it") return `Soggiorno minimo: ${nights} ${word}.`;
  return `Minimum stay: ${nights} ${word}.`;
}

export function nightsLabel(locale: string, count: number) {
  return `${count} ${nightWord(locale, count)}`;
}

function nightWord(locale: string, count: number) {
  if (locale === "hr") return count % 10 === 1 && count % 100 !== 11 ? "noć" : "noći";
  if (locale === "de") return count === 1 ? "Nacht" : "Nächte";
  if (locale === "it") return count === 1 ? "notte" : "notti";
  return count === 1 ? "night" : "nights";
}

function iso(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function shiftIso(value: string, days: number) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day + days);
  return iso(date.getFullYear(), date.getMonth() + 1, date.getDate());
}
