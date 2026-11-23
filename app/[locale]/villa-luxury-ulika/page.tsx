import IFrameMaps from "@/components/About/iFrameMaps";
import Crumbs from "@/components/site/Crumbs";
import FaqList from "@/components/site/FaqList";
import InquiryBand from "@/components/site/InquiryBand";
import OwnerDescription from "@/components/site/OwnerDescription";
import { Link } from "@/navigation";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";
import Markdown from "react-markdown";

const packs = { hr, en, de, it };
const groupSizes = [4, 3, 14, 4, 4, 1, 6, 3, 9, 2, 3, 3, 3, 2];

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "villa");
}

export default function VillaPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const features = messages.Villa_Features;
  const titles = [
    features.title3, features.title4, features.title5, features.title6, features.title7,
    features.title8, features.title9, features.title10, features.title11, features.title12,
    features.title13, features.title14, features.title15, features.title16,
  ];
  let cursor = 0;
  const groups = groupSizes.map((size, index) => {
    const items = features.card.title.slice(cursor, cursor + size).map((name, offset) => ({
      name,
      note: features.card.des[cursor + offset],
    }));
    cursor += size;
    return { title: titles[index], items };
  });
  const ui = getChrome(locale);
  const pay = messages.Payment_conditions;
  const description = `${messages.Villa_Description.des}\n\n${messages.Villa_Description.des2}\n\n**${messages.Villa_Description.subtitle2}**\n\n${messages.Villa_Description.des3}`;
  return (
    <>
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Crumbs locale={locale} home={ui.crumbsHome} items={[{ label: messages.Navigation.navlinks[0] }]} />
      <p className="mt-4 text-2xl" aria-label={messages.Categorization.title[0]}>⭐⭐⭐⭐⭐</p>
      <h1 className="mt-2 font-display text-5xl text-olive-deep">{messages.Titles.Villa_Panorama}</h1>
      <div className="mt-6 max-w-3xl">
        <OwnerDescription id="villa-description" text={description} moreLabel={messages.Buttons.Show_more} lessLabel={messages.Buttons.Show_less} />
      </div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{features.title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.title} className="rounded-2xl border border-sand p-5">
            <h3 className="font-display text-2xl">{group.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {group.items.slice(0, 3).map((item) => (
                <li key={item.name}><span className="font-medium">{item.name}</span>{item.note ? <span className="block text-ink/65">{item.note}</span> : null}</li>
              ))}
            </ul>
            <details className="mt-2">
              <summary className="cursor-pointer text-sm font-semibold text-olive">{messages.Buttons.Show_more}</summary>
              <ul className="mt-2 space-y-2 text-sm">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.name}`}>{item.name}{item.note ? <span className="block text-ink/65">{item.note}</span> : null}</li>
                ))}
              </ul>
            </details>
          </section>
        ))}
      </div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{pay.title}</h2>
      <div className="mt-4 max-w-3xl space-y-3 text-ink/85">
        <Markdown>{pay.des2}</Markdown>
        <Markdown>{pay.des3}</Markdown>
        <Markdown>{pay.des4}</Markdown>
        <Markdown>{pay.des5}</Markdown>
        <Markdown>{pay.des6}</Markdown>
        <p className="font-semibold">{pay.title2}</p>
        <ul className="list-disc pl-5">{pay.methods.map((method) => <li key={method}>{method}</li>)}</ul>
      </div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{messages.Map_Location.title}</h2>
      <div className="mt-4 h-[420px] overflow-hidden rounded-3xl"><IFrameMaps className="h-full" /></div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{ui.faqTitle}</h2>
      <div className="mt-4"><FaqList items={ui.faqs} /></div>
      <p className="mt-8 flex flex-wrap gap-4 text-sm font-semibold text-olive">
        <Link href="/guides/pool">{ui.poolGuideTitle}</Link>
        <Link href="/guides/family">{features.title9}</Link>
      </p>
    </article>
    <InquiryBand title={ui.bandTitle} text={ui.bandText} cta={ui.inquiry} />
    </>
  );
}
