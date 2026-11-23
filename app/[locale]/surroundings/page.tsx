import IFrameMaps from "@/components/About/iFrameMaps";
import OwnerDescription from "@/components/site/OwnerDescription";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import { Distances } from "@/lib/LocationDistance";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";

const packs = { hr, en, de, it };

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "surroundings");
}

export default function SurroundingsPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const places = messages.Distances.place;
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl text-olive-deep">{messages.Environs.title}</h1>
      <div className="mt-6 max-w-3xl">
        <OwnerDescription id="environs" text={messages.Environs.des} moreLabel={messages.Buttons.Show_more} lessLabel={messages.Buttons.Show_less} />
      </div>
      <h2 className="mt-10 font-display text-3xl">{messages.Environs.title2}</h2>
      <p className="mt-2 max-w-3xl">{messages.Environs.des2}</p>
      <h2 className="mt-10 font-display text-3xl">{messages.Distances.title}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {Distances.map((item, index) => (
          <li key={places[index] ?? index} className="flex justify-between rounded-xl border border-sand px-4 py-3 text-sm">
            <span>{places[index]}</span>
            <b>{item.distance} km</b>
          </li>
        ))}
      </ul>
      <h2 className="mt-10 font-display text-3xl">{messages.Environs.subtitle}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        {messages.About.locations.des.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <h2 className="mt-10 font-display text-3xl">{messages.Map_Location.title}</h2>
      <div className="mt-4 h-[420px] overflow-hidden rounded-3xl"><IFrameMaps className="h-full" /></div>
    </article>
  );
}
