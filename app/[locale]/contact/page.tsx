import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import IFrameMaps from "@/components/About/iFrameMaps";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
const packs = { hr, en, de, it };
export function generateMetadata({ params }: { params: { locale: string } }): Metadata { return pageMetadata(params.locale, "contact"); }
export default function Inquiry({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  return (
    <main id="main" className="sec wrap">
      <h1>{messages.Contact.title}</h1>
      <div className="cards">
        <article className="card"><ContactForm /></article>
        <article className="card"><ContactInfo /></article>
      </div>
      <h2>{messages.How_Reserve.title}</h2>
      <div style={{ height: 420 }}><IFrameMaps className="h-full" /></div>
    </main>
  );
}
