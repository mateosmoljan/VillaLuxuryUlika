import type { Metadata } from "next";
import { getCopy, isLocale, type Locale } from "./copy";

export const siteUrl = "https://www.villaluxulika.com";

const ogLocales: Record<Locale, string> = {
  hr: "hr_HR",
  en: "en_US",
  de: "de_DE",
  it: "it_IT",
};

export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string
): Metadata {
  const key: Locale = isLocale(locale) ? locale : "en";
  const copy = getCopy(key);
  const languages = Object.fromEntries(
    (["hr", "en", "de", "it"] as const).map((code) => [
      code,
      `${siteUrl}/${code}${path}`,
    ])
  );
  const url = `${siteUrl}/${key}${path}`;
  const preview = process.env.VERCEL_ENV === "preview";

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Villa Luxury Ulika",
      locale: ogLocales[key],
      alternateLocale: (Object.keys(ogLocales) as Locale[])
        .filter((code) => code !== key)
        .map((code) => ogLocales[code]),
      type: "website",
      images: [
        {
          url: "/og/villa.jpg",
          width: 1200,
          height: 800,
          alt: copy.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og/villa.jpg"],
    },
    robots: preview
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
