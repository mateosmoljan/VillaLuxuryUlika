import type { Copy, Locale } from "@/lib/site/copy";

export type PriceRow = {
  date: string;
  price: number | null;
  closed: boolean;
};

export type SiteState = {
  prices: PriceRow[];
  copies: Partial<Record<Locale, Copy>>;
  heroSrc: string;
  spaceImages: Record<string, string>;
  galleryAlts: Record<string, Partial<Record<Locale, string>>>;
};

export type StoreMode = "postgres" | "file" | "seed";
