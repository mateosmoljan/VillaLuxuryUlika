export type DayPatch = {
  price?: number | null;
  closed?: boolean;
  minNights?: number | null;
  note?: string;
};

export type CalendarPatches = Record<string, DayPatch>;

export function emptyPatches(): CalendarPatches {
  return {};
}

export function eachDate(from: string, to: string) {
  const start = from <= to ? from : to;
  const end = from <= to ? to : from;
  const dates: string[] = [];
  const cursor = new Date(`${start}T00:00:00`);
  const last = new Date(`${end}T00:00:00`);
  while (cursor <= last) {
    dates.push(iso(cursor.getFullYear(), cursor.getMonth() + 1, cursor.getDate()));
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export function applyPatch(current: DayPatch | undefined, next: DayPatch): DayPatch | null {
  const merged: DayPatch = { ...(current || {}) };
  if ("price" in next) merged.price = next.price;
  if ("closed" in next) merged.closed = next.closed;
  if ("minNights" in next) merged.minNights = next.minNights;
  if ("note" in next) merged.note = next.note;
  const empty =
    merged.price === undefined &&
    !merged.closed &&
    (merged.minNights === undefined || merged.minNights === null) &&
    !merged.note;
  return empty ? null : merged;
}

export function patchRange(patches: CalendarPatches, from: string, to: string, next: DayPatch) {
  const copy: CalendarPatches = { ...patches };
  eachDate(from, to).forEach((date) => {
    const applied = applyPatch(copy[date], next);
    if (applied) copy[date] = applied;
    else delete copy[date];
  });
  return copy;
}

export function clearRange(patches: CalendarPatches, from: string, to: string) {
  const copy: CalendarPatches = { ...patches };
  eachDate(from, to).forEach((date) => delete copy[date]);
  return copy;
}

function iso(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
