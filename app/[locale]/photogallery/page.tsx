import Photo from "@/components/site/Photo";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/photogallery", copy.gallery.title, copy.gallery.intro);
}

export default async function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy, gallery } = await getPublished(locale);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.gallery.kicker}</p>
      <h1 className="mt-2 font-display text-5xl text-ink">{copy.gallery.title}</h1>
      <p className="mt-4 max-w-2xl text-ink/80">{copy.gallery.intro}</p>
      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((image) => (
          <li key={image.src}>
            <a href={image.src} className="block">
              <Photo
                src={image.src}
                alt={image.alt[locale] ?? image.alt.en}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-[3/2] rounded-2xl"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
