import PhotoGrid from "@/components/site/PhotoGrid";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";
import { Link } from "@/navigation";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/photogallery", copy.gallery.title, copy.gallery.intro);
}

export default async function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy, gallery } = await getPublished(locale);
  const ui = getChrome(locale);
  const shots = gallery.map((image) => ({ src: image.src, alt: image.alt[locale] ?? image.alt.en }));
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-ink/60">
        <Link href="/">{ui.crumbsHome}</Link> · {copy.nav.gallery}
      </p>
      <h1 className="mt-3 font-display text-5xl text-olive-deep">{copy.gallery.title}</h1>
      <p className="mt-3 max-w-2xl text-ink/75">{copy.gallery.intro} {ui.enlarge}.</p>
      <div className="mt-8">
        <PhotoGrid images={shots} chrome={ui} />
      </div>
    </div>
  );
}
