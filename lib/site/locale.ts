import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./copy";

export function prepareLocale(locale: string): Locale {
  if (!isLocale(locale)) notFound();
  unstable_setRequestLocale(locale);
  return locale;
}
