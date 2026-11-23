import type { MetadataRoute } from "next";
import { locales, pageUrl, publicPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return publicPages.flatMap((page) =>
    locales.map((locale) => ({
      url: pageUrl(locale, page),
      lastModified,
      alternates: {
        languages: Object.fromEntries(
          locales.map((item) => [item, pageUrl(item, page)])
        ),
      },
    }))
  );
}
