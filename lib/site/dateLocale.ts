import type { Locale } from "date-fns";
import hr from "date-fns/locale/hr";
import de from "date-fns/locale/de";
import it from "date-fns/locale/it";
import enGB from "date-fns/locale/en-GB";

const bases: Record<string, Locale> = { hr, de, it, en: enGB };

export function pickerLocale(code: string): Locale {
  const base = bases[code] ?? enGB;
  return {
    ...base,
    options: { ...base.options, weekStartsOn: 1 },
  };
}

export function datePattern(code: string): string {
  if (code === "hr") return "d.M.yyyy.";
  if (code === "de") return "dd.MM.yyyy";
  if (code === "it") return "dd/MM/yyyy";
  return "d.M.yyyy";
}
