import TownMap from "@/components/site/TownMap";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";
import { Link } from "@/navigation";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/surroundings", copy.place.title, copy.place.paragraphs[0]);
}

export default async function PlacePage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  const ui = getChrome(locale);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-ink/60">
        <Link href="/">{ui.crumbsHome}</Link> · {copy.nav.place}
      </p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl text-olive-deep">{copy.place.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{ui.surroundingsLead}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {copy.place.paragraphs.map((paragraph) => (
          <p key={paragraph} className="rounded-2xl bg-paper p-5 leading-relaxed text-ink/80">{paragraph}</p>
        ))}
        <p className="rounded-2xl border border-sand p-5 text-sm leading-relaxed text-ink/70">{ui.noDistances}</p>
      </div>
      <div className="mt-8">
        <TownMap chrome={ui} />
      </div>
    </div>
  );
}
