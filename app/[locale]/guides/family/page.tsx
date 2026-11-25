import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
const packs = { hr, en, de, it };
export function generateMetadata({ params }: { params: { locale: string } }): Metadata { return pageMetadata(params.locale, "villa"); }
export default function FamilyGuide({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  const start = [4, 3, 14, 4, 4, 1].reduce((sum, size) => sum + size, 0);
  const items = messages.Villa_Features.card.title.slice(start, start + 6);
  return <main id="main" className="sec wrap"><h1>{messages.Villa_Features.title9}</h1><p>{messages.Acommodation.card_des}</p><ul className="cards">{items.map((item) => <li className="card" key={item}><h3>{item}</h3></li>)}</ul></main>;
}
