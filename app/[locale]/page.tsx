import { Link } from "@/navigation";
import Image from "next/image";
import FaqList from "@/components/site/FaqList";
import PhotoGrid from "@/components/site/PhotoGrid";
import TownMap from "@/components/site/TownMap";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { getPublished } from "@/lib/store/publish";

export default async function Home({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy, hero, gallery, prices } = await getPublished(locale);
  const ui = getChrome(locale);
  const shots = gallery.slice(0, 5).map((image) => ({ src: image.src, alt: image.alt[locale] ?? image.alt.en }));
  const lowest = prices.reduce<number | null>((min, day) => {
    if (day.price == null) return min;
    return min == null || day.price < min ? day.price : min;
  }, null);

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-4rem)] items-end bg-olive-deep">
        <Image src={hero} alt={copy.meta.ogAlt} fill priority sizes="100vw" className="object-cover" quality={70} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/15" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-16 sm:px-6">
          <p className="inline-flex rounded-full border border-white/50 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
            {copy.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-[16ch] font-display text-5xl leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            {copy.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/90">{copy.hero.lead}</p>
          <div className="mt-6 grid max-w-3xl gap-4 rounded-3xl bg-white p-4 text-ink shadow-lg sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <p className="sm:col-span-3 text-xs font-semibold uppercase tracking-[0.14em] text-olive">{ui.heroSearchTitle}</p>
            <form action={`/${locale}/contact`} className="contents">
              <label className="text-sm font-semibold text-ink/70">
                {ui.arrival}
                <input name="arrival" type="date" className="mt-1 w-full rounded-xl border border-sand px-3 py-3" />
              </label>
              <label className="text-sm font-semibold text-ink/70">
                {ui.departure}
                <input name="departure" type="date" className="mt-1 w-full rounded-xl border border-sand px-3 py-3" />
              </label>
              <button className="rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white" type="submit">
                {ui.checkDates}
              </button>
            </form>
          </div>
          <ul className="mt-4 grid max-w-3xl gap-2 text-sm text-white/90">
            {ui.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <ul className="grid grid-cols-3 gap-2 sm:gap-3">
          {ui.facts.map((fact) => (
            <li key={fact.label} className="rounded-2xl bg-paper px-2 py-4 text-center">
              <b className="block font-display text-3xl text-olive sm:text-4xl">{fact.value}</b>
              <span className="mt-1 block text-xs text-ink/65 sm:text-sm">{fact.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{ui.whyTitle}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {copy.cards.slice(0, 6).map((card) => (
            <li key={card.title}>
              <Link href={card.href} className="block h-full rounded-2xl bg-paper p-5 hover:bg-stone">
                <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-olive text-white" aria-hidden />
                <span className="block font-display text-2xl">{card.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink/70">{card.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-4xl text-olive-deep">{ui.photosTitle}</h2>
          <Link href="/photogallery" className="text-sm font-semibold text-olive">{ui.allPhotos}</Link>
        </div>
        <PhotoGrid images={shots} chrome={ui} />
      </section>

      <section className="mt-8 bg-olive-deep text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-white/70">{ui.priceKicker}</p>
            <h2 className="mt-2 font-display text-4xl">{ui.lowestLabel}</h2>
            <p className="mt-3 max-w-md text-white/80">{copy.prices.intro}</p>
            <Link href="/pricelist" className="mt-6 inline-flex rounded-full border border-white px-5 py-3 text-sm font-semibold">{ui.seePrices}</Link>
          </div>
          <p className="rounded-3xl border border-white/30 bg-white/10 p-6 text-center">
            <b className="block font-display text-6xl">{lowest ?? "—"}</b>
            <span className="mt-2 block text-sm text-white/80">{copy.prices.currency} · {ui.perNight}</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{ui.guidesTitle}</h2>
        <p className="mt-2 max-w-2xl text-ink/70">{ui.guidesLead}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/guides/heated-pool" className="overflow-hidden rounded-3xl border border-sand bg-white">
            <div className="relative aspect-[3/2]">
              <Image src="/assets/images/i/76.jpg" alt={copy.spaces.items.find((item) => item.id === "pool")?.imageAlt || copy.meta.ogAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <span className="block p-5">
              <span className="block font-display text-2xl">{ui.poolGuideTitle}</span>
              <span className="mt-1 block text-sm text-ink/70">{ui.poolGuideText}</span>
            </span>
          </Link>
          <Link href="/guides/for-families" className="overflow-hidden rounded-3xl border border-sand bg-white">
            <div className="relative aspect-[3/2]">
              <Image src="/assets/images/i/16.jpg" alt={copy.spaces.items.find((item) => item.id === "library")?.imageAlt || copy.meta.ogAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
            <span className="block p-5">
              <span className="block font-display text-2xl">{ui.familyGuideTitle}</span>
              <span className="mt-1 block text-sm text-ink/70">{ui.familyGuideText}</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{ui.stepsTitle}</h2>
        <ol className="mt-6 grid gap-3">
          {copy.booking.steps.slice(0, 3).map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl bg-paper p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-olive text-white">{index + 1}</span>
              <span>
                <span className="block font-display text-2xl">{step.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink/75">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{ui.faqTitle}</h2>
        <div className="mt-6">
          <FaqList items={ui.faqs} />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-6 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-display text-4xl text-olive-deep">{ui.locationTitle}</h2>
          {copy.place.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 leading-relaxed text-ink/80">{paragraph}</p>
          ))}
          <Link href="/surroundings" className="mt-4 inline-block text-sm font-semibold text-olive">{copy.nav.place}</Link>
        </div>
        <TownMap chrome={ui} />
      </section>

      <section className="mt-10 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-4xl text-olive-deep">{ui.bandTitle}</h2>
            <p className="mt-2 text-ink/75">{ui.bandText}</p>
          </div>
          <Link href="/contact" className="rounded-full bg-olive px-6 py-3 text-sm font-semibold text-white">{ui.inquiry}</Link>
        </div>
      </section>
    </>
  );
}
