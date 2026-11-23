import PriceMonth from "@/components/brochure/PriceBoard";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const packs = { hr, en, de, it };

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMetadata(params.locale, "pricelist");
}

export default function Prices({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  const pay = messages.Payment_conditions;
  return (
    <main id="main" className="sec wrap">
      <h1>{messages.Titles.Price_list}</h1>
      <p>{messages.Pricelist.subtitle}</p>
      <PriceMonth locale={locale} />
      <h2>{pay.title}</h2>
      {[pay.des2, pay.des3, pay.des4, pay.des5, pay.des6].map((item) => (
        <p key={item.slice(0, 24)}>{item.replace(/\*\*/g, "")}</p>
      ))}
      <ul>{pay.methods.map((method) => <li key={method}>{method}</li>)}</ul>
    </main>
  );
}
