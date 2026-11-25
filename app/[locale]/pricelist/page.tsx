import StayPlanner from "@/components/brochure/StayPlanner";
import { seedPrices } from "@/lib/store";
import { getPublished } from "@/lib/store/publish";
import { isLocale } from "@/lib/site/copy";
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

export default async function Prices({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  const pay = messages.Payment_conditions;
  let days = seedPrices();
  if (isLocale(locale)) {
    try {
      days = (await getPublished(locale)).prices;
    } catch {
      days = seedPrices();
    }
  }
  return (
    <main id="main" className="sec wrap">
      <h1>{messages.Titles.Price_list}</h1>
      <p>{messages.Pricelist.subtitle}</p>
      <StayPlanner
        locale={locale}
        days={days}
        adultsLabel={messages.Contact.Contact_Form.adults}
        childrenLabel={messages.Contact.Contact_Form.children}
        notes={{ advance: pay.des2, deposit: pay.des3, times: pay.des5, pets: pay.des6 }}
      />
    </main>
  );
}
