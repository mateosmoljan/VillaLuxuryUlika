import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site/seo";

const locales = ["hr", "en", "de", "it"] as const;
const paths = [
  "",
  "/villa-luxury-ulika",
  "/pricelist",
  "/photogallery",
  "/surroundings",
  "/contact",
  "/guides/heated-pool",
  "/guides/for-families",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-23");
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [code, `${siteUrl}/${code}${path}`])
        ),
      },
    }))
  );
}
