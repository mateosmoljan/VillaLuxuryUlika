import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

const locales = ["hr", "en", "de", "it"] as const;
const paths = ["", "/villa-luxury-ulika", "/pricelist", "/photogallery", "/surroundings", "/contact", "/events", "/guides/pool", "/guides/family"];

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((code) => [code, `${siteUrl}/${code}${path}`])),
          "x-default": `${siteUrl}/en${path}`,
        },
      },
    }))
  );
}
