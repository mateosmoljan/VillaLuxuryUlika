import IFrameMaps from "@/components/About/iFrameMaps";
import { Distances } from "@/lib/LocationDistance";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const packs = { hr, en, de, it };

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMetadata(params.locale, "surroundings");
}

export default function Area({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  return (
    <main id="main" className="sec wrap">
      <h1>{messages.Environs.title}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{messages.Environs.des}</p>
      <h2>{messages.Environs.title2}</h2>
      <p>{messages.Environs.des2}</p>
      <h2>{messages.Distances.title}</h2>
      <ul className="cards">
        {Distances.map((item, index) => (
          <li className="card" key={messages.Distances.place[index] ?? index}>
            <h3>{messages.Distances.place[index]}</h3>
            <p>{item.distance} km</p>
          </li>
        ))}
      </ul>
      <h2>{messages.Environs.subtitle}</h2>
      <ul>
        {messages.About.locations.des.map((item) => (
          <li key={item}>{item.replace(/^[-\s]+/, "")}</li>
        ))}
      </ul>
      <h2>{messages.Map_Location.title}</h2>
      <div style={{ height: 420 }}><IFrameMaps className="h-full" /></div>
    </main>
  );
}
