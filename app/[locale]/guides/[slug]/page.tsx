import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Link } from "@/navigation";
import { gallery } from "@/lib/site/gallery";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";

const slugs = ["heated-pool", "for-families"] as const;
type GuideSlug = (typeof slugs)[number];

export function generateStaticParams() {
  return ["hr", "en", "de", "it"].flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const ui = getChrome(locale);
  const title = params.slug === "heated-pool" ? ui.poolGuideTitle : ui.familyGuideTitle;
  const description = params.slug === "heated-pool" ? ui.poolGuideText : ui.familyGuideText;
  if (!slugs.includes(params.slug as GuideSlug)) return {};
  return pageMetadata(locale, `/guides/${params.slug}`, title, description);
}

export default async function GuidePage({ params }: { params: { locale: string; slug: string } }) {
  if (!slugs.includes(params.slug as GuideSlug)) notFound();
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  const ui = getChrome(locale);
  const pool = params.slug === "heated-pool";
  const space = copy.spaces.items.find((item) => item.id === (pool ? "pool" : "children"));
  const photo = gallery.find((image) => image.src.endsWith(pool ? "76.jpg" : "109.jpeg"));
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm text-ink/60">
        <Link href="/">{ui.crumbsHome}</Link> · {ui.guidesTitle}
      </p>
      <h1 className="mt-3 font-display text-5xl text-olive-deep">{pool ? ui.poolGuideTitle : ui.familyGuideTitle}</h1>
      <p className="mt-4 text-lg text-ink/80">{pool ? ui.poolGuideText : ui.familyGuideText}</p>
      <div className="relative mt-6 aspect-[3/2] overflow-hidden rounded-3xl">
        <Image
          src={pool ? "/assets/images/i/76.jpg" : "/assets/images/i/109.jpeg"}
          alt={photo?.alt[locale] || copy.meta.ogAlt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <ul className="mt-8 space-y-3">
        {(space?.points ?? []).map((point) => (
          <li key={point} className="rounded-2xl bg-paper px-4 py-3 leading-relaxed">{point}</li>
        ))}
      </ul>
      <Link href="/contact" className="mt-8 inline-flex rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white">
        {ui.inquiry}
      </Link>
    </article>
  );
}
