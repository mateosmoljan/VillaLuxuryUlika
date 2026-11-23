import Spaces from "@/components/site/Spaces";
import Amenities from "@/components/site/Amenities";
import FaqList from "@/components/site/FaqList";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/villa-luxury-ulika", copy.spaces.title, copy.meta.description);
}

export default async function VillaPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  const ui = getChrome(locale);
  return (
    <>
      <header className="mx-auto max-w-6xl px-5 pb-4 pt-12">
        <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.hero.eyebrow}</p>
        <h1 className="mt-2 font-display text-5xl text-ink">{copy.hero.title}</h1>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink/80">{copy.intro.paragraphs[1]}</p>
      </header>
      <Spaces copy={copy} />
      <Amenities copy={copy} />
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-display text-4xl text-olive-deep">{ui.faqTitle}</h2>
        <div className="mt-6">
          <FaqList items={ui.faqs} />
        </div>
      </section>
    </>
  );
}
