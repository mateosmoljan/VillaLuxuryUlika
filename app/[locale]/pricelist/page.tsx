import PriceCalendar from "@/components/site/PriceCalendar";
import { getChrome } from "@/lib/site/chrome";
import { getCopy } from "@/lib/site/copy";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import { getPublished } from "@/lib/store/publish";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";
import Markdown from "react-markdown";

const packs = { hr, en, de, it };

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "pricelist");
}

export default async function PricePage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const ui = getChrome(locale);
  const { prices } = await getPublished(locale);
  const pay = messages.Payment_conditions;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl text-olive-deep">{messages.Titles.Price_list}</h1>
      <p className="mt-3 max-w-3xl text-ink/75">{messages.Pricelist.subtitle}</p>
      <div className="mt-8 rounded-3xl border border-sand p-3 sm:p-5">
        <PriceCalendar copy={getCopy(locale)} locale={locale} days={prices} chrome={ui} />
      </div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{pay.title}</h2>
      <div className="mt-4 max-w-3xl space-y-3">
        <Markdown>{pay.des2}</Markdown>
        <Markdown>{pay.des3}</Markdown>
        <Markdown>{pay.des4}</Markdown>
        <Markdown>{pay.des5}</Markdown>
        <Markdown>{pay.des6}</Markdown>
        <p className="font-semibold">{pay.title2}</p>
        <ul className="flex flex-wrap gap-2">
          {pay.methods.map((method) => (
            <li key={method} className="rounded-full border border-sand px-3 py-1 text-sm">{method}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
