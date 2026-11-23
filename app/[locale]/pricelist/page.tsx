import PriceCalendar from "@/components/site/PriceCalendar";
import FaqList from "@/components/site/FaqList";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/pricelist", copy.prices.title, copy.prices.description);
}

export default async function PricePage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const { copy, prices } = await getPublished(locale);
  const ui = getChrome(locale);
  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.prices.kicker}</p>
      <h1 className="mt-2 font-display text-5xl text-ink">{copy.prices.title}</h1>
      <p className="mt-4 max-w-3xl leading-relaxed text-ink/80">{copy.prices.intro}</p>
      <div className="mt-8 rounded-3xl border border-sand bg-white/40 p-4 sm:p-6">
        <PriceCalendar copy={copy} locale={locale} days={prices} chrome={ui} />
      </div>
      <section className="mt-14">
        <h2 className="font-display text-3xl text-ink">{ui.rulesTitle}</h2>
        <dl className="mt-6 grid gap-4 md:grid-cols-2">
          {copy.booking.steps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-sand bg-paper p-5">
              <dt className="font-display text-2xl text-ink">{step.title}</dt>
              <dd className="mt-2 leading-relaxed text-ink/80">{step.text}</dd>
            </div>
          ))}
        </dl>
        <h3 className="mt-8 font-display text-2xl text-ink">{copy.booking.methodsTitle}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {copy.booking.methods.map((method) => (
            <li key={method} className="rounded-full border border-sand px-3 py-1 text-sm">
              {method}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="font-display text-3xl">{ui.faqTitle}</h2>
        <div className="mt-4">
          <FaqList items={ui.faqs} />
        </div>
      </section>
    </div>
  );
}
