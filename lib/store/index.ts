import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import { gallery } from "@/lib/site/gallery";
import { getCopy, isLocale, type Copy, type Locale } from "@/lib/site/copy";
import { priceMonths } from "@/lib/site/prices";
import type { PriceRow, SiteState, StoreMode } from "./types";

export const HERO_DEFAULT = "/assets/images/i/111.jpg";
const FILE = path.join(process.cwd(), "data", "store.json");

export function seedPrices(): PriceRow[] {
  return priceMonths.flatMap((month) =>
    month.days.map((day) => ({
      date: day.date,
      price: day.price,
      closed: false,
    }))
  );
}

export function allowedImageSrcs(): Set<string> {
  return new Set(gallery.map((image) => image.src));
}

function defaultState(): SiteState {
  return {
    prices: seedPrices(),
    copies: {},
    heroSrc: HERO_DEFAULT,
    spaceImages: {},
    galleryAlts: {},
  };
}

function normalize(input: Partial<SiteState> | null | undefined): SiteState {
  const seed = seedPrices();
  const saved = new Map((input?.prices ?? []).map((row) => [row.date, row]));
  return {
    prices: seed.map((day) => {
      const row = saved.get(day.date);
      if (!row) return day;
      const price =
        row.price === null || (Number.isInteger(row.price) && row.price > 0)
          ? row.price
          : day.price;
      return { date: day.date, price, closed: Boolean(row.closed) };
    }),
    copies: input?.copies ?? {},
    heroSrc: typeof input?.heroSrc === "string" && input.heroSrc.startsWith("/assets/")
      ? input.heroSrc
      : HERO_DEFAULT,
    spaceImages: input?.spaceImages ?? {},
    galleryAlts: input?.galleryAlts ?? {},
  };
}

function fileWritable() {
  if (process.env.VERCEL) return false;
  try {
    fs.mkdirSync(path.dirname(FILE), { recursive: true });
    fs.accessSync(path.dirname(FILE), fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

function readFileState(): SiteState | null {
  try {
    if (!fs.existsSync(FILE)) return null;
    return normalize(JSON.parse(fs.readFileSync(FILE, "utf8")));
  } catch {
    return null;
  }
}

function writeFileState(state: SiteState) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  const temp = `${FILE}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(state));
  fs.renameSync(temp, FILE);
}

function databaseUrl() {
  return process.env.DATABASE_URL || "";
}

async function ensurePostgres() {
  const sql = neon(databaseUrl());
  await sql.query(
    `CREATE TABLE IF NOT EXISTS site_state (
      id integer PRIMARY KEY,
      data jsonb NOT NULL,
      updated_at timestamptz NOT NULL DEFAULT now()
    )`
  );
  return sql;
}

async function readPostgres(): Promise<SiteState | null> {
  const sql = await ensurePostgres();
  const rows = (await sql.query("SELECT data FROM site_state WHERE id = 1")) as { data?: SiteState }[];
  const data = rows[0]?.data;
  return data ? normalize(data) : null;
}

async function writePostgres(state: SiteState) {
  const sql = await ensurePostgres();
  await sql.query(
    `INSERT INTO site_state (id, data, updated_at)
     VALUES (1, $1::jsonb, now())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [JSON.stringify(state)]
  );
}

export async function readState(): Promise<{ state: SiteState; mode: StoreMode }> {
  if (databaseUrl()) {
    try {
      const existing = await readPostgres();
      if (existing) return { state: existing, mode: "postgres" };
      const seeded = defaultState();
      await writePostgres(seeded);
      return { state: seeded, mode: "postgres" };
    } catch (error) {
      console.error("DATABASE_URL is set but the database could not be used.");
      console.error(error);
      return { state: defaultState(), mode: "seed" };
    }
  }
  const fromFile = readFileState();
  if (fromFile) return { state: fromFile, mode: "file" };
  return { state: defaultState(), mode: fileWritable() ? "file" : "seed" };
}

let writeChain: Promise<unknown> = Promise.resolve();

export async function updateState(mutator: (state: SiteState) => void) {
  const run = writeChain.then(async () => {
    const { state, mode } = await readState();
    if (mode === "seed") {
      throw new Error("NO_DATABASE");
    }
    mutator(state);
    if (mode === "postgres") await writePostgres(state);
    else writeFileState(state);
  });
  writeChain = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

export function localeCopy(state: SiteState, locale: Locale): Copy {
  const stored = state.copies[locale];
  const copy = structuredClone(stored ?? getCopy(locale)) as Copy;
  for (const space of copy.spaces.items) {
    const src = state.spaceImages[space.id];
    if (src) space.image = src;
  }
  return copy;
}

export function publishedGallery(state: SiteState) {
  return gallery.map((image) => ({
    src: image.src,
    alt: {
      ...image.alt,
      ...(state.galleryAlts[image.src] ?? {}),
    },
  }));
}

export function assertLocale(value: string): Locale {
  if (!isLocale(value)) throw new Error("locale");
  return value;
}
