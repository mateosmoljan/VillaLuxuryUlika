import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import type { Locale } from "@/lib/site/copy";
import { localeCopy, publishedGallery, readState } from "./index";

const readCached = unstable_cache(async () => (await readState()).state, ["site-state-v1"], {
  tags: ["site"],
});

export async function getPublished(locale: Locale) {
  const state = await readCached();
  return {
    copy: localeCopy(state, locale),
    hero: state.heroSrc,
    gallery: publishedGallery(state),
    prices: state.prices,
  };
}

export function refreshPublic() {
  revalidateTag("site");
  const locales: Locale[] = ["hr", "en", "de", "it"];
  const paths = ["", "/villa-luxury-ulika", "/pricelist", "/photogallery", "/surroundings", "/contact"];
  for (const locale of locales) {
    for (const path of paths) revalidatePath(`/${locale}${path}`);
  }
}
