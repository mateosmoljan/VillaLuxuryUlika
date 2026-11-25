import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
const packs = { hr, en, de, it };
export function generateMetadata({ params }: { params: { locale: string } }): Metadata { return pageMetadata(params.locale, "villa"); }
export default function PoolGuide({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  const parts = messages.Villa_Description.des2.split("\n\n");
  const index = parts.findIndex((part) => part.includes("8 × 4"));
  const text = index >= 0 ? [parts[index - 1], parts[index]].filter(Boolean).join("\n\n") : messages.Villa_Description.des2;
  return <main id="main" className="sec wrap"><h1>{messages.Villa_Features.card.title[41]} 8 × 4 m</h1><p style={{ whiteSpace: "pre-wrap" }}>{text}</p></main>;
}
