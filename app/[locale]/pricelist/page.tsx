import Crumbs from "@/components/site/Crumbs";
import FaqList from "@/components/site/FaqList";
import InquiryBand from "@/components/site/InquiryBand";
import OwnerDescription from "@/components/site/OwnerDescription";
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
  const steps = [messages.How_Reserve.steps.title, messages.How_Reserve.steps.title2, messages.How_Reserve.steps.title3];
  const stepText = [messages.How_Reserve.steps.des, messages.How_Reserve.steps.des2, messages.How_Reserve.steps.des3];
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Crumbs locale={locale} home={ui.crumbsHome} items={[{ label: messages.Navigation.navlinks[1] }]} />
      <h1 className="mt-4 font-display text-5xl text-olive-deep">{messages.Titles.Price_list}</h1>
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
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{messages.How_Reserve.title}</h2>
      <ol className="mt-4 grid gap-3">
        {steps.map((title, index) => (
          <li key={title} className="rounded-2xl bg-paper p-4">
            <h3 className="font-display text-2xl">{index + 1}. {title}</h3>
            <OwnerDescription id={`price-step-${index}`} text={stepText[index]} moreLabel={messages.Buttons.Show_more} lessLabel={messages.Buttons.Show_less} />
          </li>
        ))}
      </ol>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{ui.faqTitle}</h2>
      <div className="mt-4"><FaqList items={ui.faqs} /></div>
    </div>
    <InquiryBand title={ui.bandTitle} text={ui.bandText} cta={ui.inquiry} />
    </>
  );
}
