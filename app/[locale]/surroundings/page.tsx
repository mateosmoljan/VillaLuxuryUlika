import Photo from "@/components/site/Photo";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/surroundings", copy.place.title, copy.place.paragraphs[0]);
}

export default async function PlacePage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.place.kicker}</p>
        <h1 className="mt-2 font-display text-5xl text-ink">{copy.place.title}</h1>
        {copy.place.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mt-4 leading-relaxed text-ink/80">
            {paragraph}
          </p>
        ))}
      </div>
      <Photo
        src="/assets/images/i/116.jpg"
        alt={copy.meta.ogAlt}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="aspect-[4/3] rounded-2xl"
      />
    </div>
  );
}
