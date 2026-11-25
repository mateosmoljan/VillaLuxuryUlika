import { Link } from "@/navigation";
import { AmenityIcon } from "@/components/brochure/AmenityIcon";
import IFrameMaps from "@/components/About/iFrameMaps";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const packs = { hr, en, de, it };
const sizes = [4, 3, 14, 4, 4, 1, 6, 3, 9, 2, 3, 3, 3, 2];
function localeOf(value: string) { return value === "hr" || value === "de" || value === "it" ? value : "en"; }
export function generateMetadata({ params }: { params: { locale: string } }): Metadata { return pageMetadata(params.locale, "villa"); }
export default function Villa({ params }: { params: { locale: string } }) {
  const locale = localeOf(params.locale);
  const messages = packs[locale];
  const features = messages.Villa_Features;
  const titles = [features.title3, features.title4, features.title5, features.title6, features.title7, features.title8, features.title9, features.title10, features.title11, features.title12, features.title13, features.title14, features.title15, features.title16];
  let cursor = 0;
  const groups = sizes.map((size, index) => {
    const start = cursor;
    const items = features.card.title.slice(cursor, cursor + size).map((name, offset) => ({ name, note: features.card.des[cursor + offset], index: start + offset }));
    cursor += size;
    return { title: titles[index], items };
  });
  const pay = messages.Payment_conditions;
  const text = `${messages.Villa_Description.des}\n\n${messages.Villa_Description.des2}`;
  return (
    <main id="main" className="sec wrap">
      <p aria-label={messages.Categorization.title[0]}>⭐⭐⭐⭐⭐</p>
      <h1>{messages.Titles.Villa_Panorama}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{text}</p>
      <h2>{features.title}</h2>
      <div className="cards">{groups.map((group) => (
        <article className="card" key={group.title}><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item.name} className="amenity-row"><AmenityIcon index={item.index} /><span>{item.name}{item.note ? <span className="muted"> — {item.note}</span> : null}</span></li>)}</ul></article>
      ))}</div>
      <h2>{pay.title}</h2>
      {[pay.des2, pay.des3, pay.des4, pay.des5, pay.des6].map((item) => <p key={item.slice(0, 24)}>{item.replace(/\*\*/g, "")}</p>)}
      <ul>{pay.methods.map((method) => <li key={method}>{method}</li>)}</ul>
      <h2>{messages.Map_Location.title}</h2>
      <div style={{ height: 420 }}><IFrameMaps className="h-full" /></div>
      <p><Link className="more" href="/guides/pool">{features.card.title[41]}</Link></p>
    </main>
  );
}
