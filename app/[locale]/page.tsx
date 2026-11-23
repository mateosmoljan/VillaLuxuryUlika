import Image from "next/image";
import { Link } from "@/navigation";
import IFrameMaps from "@/components/About/iFrameMaps";
import OwnerDescription from "@/components/site/OwnerDescription";
import PhotoGrid from "@/components/site/PhotoGrid";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import { villaPhotoAlt } from "@/lib/photoAlt";
import { dailyPrices } from "@/lib/dailyPrices";
import { Distances } from "@/lib/LocationDistance";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";

const packs = { hr, en, de, it };
const groupSizes = [4, 3, 14, 4, 4, 1, 6, 3, 9, 2, 3, 3, 3, 2];

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "home");
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const ui = getChrome(locale);
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
  const shots = [105, 76, 42, 16, 88].map((id, index) => ({
    src: `/assets/images/i/${id}.jpg`,
    alt: villaPhotoAlt(locale, index + 1),
  }));
  const amounts = Object.values(dailyPrices).filter((value): value is number => value != null);
  const lowest = Math.min(...amounts);
  const places = messages.Distances.place;

  return (
    <>
      <section className="relative flex min-h-[calc(100svh-4rem)] items-end bg-olive-deep">
        <Image src="/assets/images/i/105.jpg" alt={villaPhotoAlt(locale, 1)} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/10" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-8 pt-16 sm:px-6">
          <p className="text-2xl tracking-widest text-white" aria-label={messages.Categorization.title[0]}>⭐⭐⭐⭐⭐</p>
          <h1 className="mt-3 max-w-[18ch] font-display text-5xl leading-none text-white sm:text-7xl">Villa Luxury Ulika</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{messages.About.des}</p>
          <form action={`/${locale}/contact`} className="mt-6 grid max-w-3xl gap-3 rounded-3xl bg-white p-4 text-ink shadow-lg sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-olive sm:col-span-3">{ui.heroSearchTitle}</p>
            <label className="text-sm font-semibold text-ink/70">
              {messages.Contact.Contact_Form.arrival}
              <input name="arrival" type="date" className="mt-1 w-full rounded-xl border border-sand px-3 py-3" />
            </label>
            <label className="text-sm font-semibold text-ink/70">
              {messages.Contact.Contact_Form.departure}
              <input name="departure" type="date" className="mt-1 w-full rounded-xl border border-sand px-3 py-3" />
            </label>
            <button className="rounded-full bg-olive px-5 py-3 text-sm font-semibold text-white" type="submit">{ui.checkDates}</button>
          </form>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-3 gap-2 px-4 py-8 sm:px-6">
        <div className="rounded-2xl bg-paper px-2 py-4 text-center">
          <b className="block font-display text-3xl text-olive">⭐⭐⭐⭐⭐</b>
          <span className="text-sm text-ink/70">{messages.Categorization.title[0]}</span>
        </div>
        <div className="rounded-2xl bg-paper px-2 py-4 text-center">
          <b className="block font-display text-3xl text-olive">8</b>
          <span className="text-sm text-ink/70">{messages.Acommodation.card_des}</span>
        </div>
        <div className="rounded-2xl bg-paper px-2 py-4 text-center">
          <b className="block font-display text-3xl text-olive">{lowest}</b>
          <span className="text-sm text-ink/70">{messages.Pricelist.subtitle}</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{features.title2}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <li key={group.title} className="rounded-2xl bg-paper p-5">
              <h3 className="font-display text-2xl">{group.title}</h3>
              <ul className="mt-2 space-y-1 text-sm text-ink/80">
                {group.items.slice(0, 2).map((item) => (
                  <li key={item.name}>{item.name}</li>
                ))}
              </ul>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-semibold text-olive">{messages.Buttons.Show_more}</summary>
                <ul className="mt-2 space-y-2 text-sm">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.name}`}>
                      <span className="font-medium">{item.name}</span>
                      {item.note ? <span className="block text-ink/65">{item.note}</span> : null}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="font-display text-4xl text-olive-deep">{messages.Titles.Photogallery}</h2>
          <Link href="/photogallery" className="text-sm font-semibold text-olive">{messages.Buttons.Show_Gallery}</Link>
        </div>
        <PhotoGrid images={shots} chrome={ui} />
      </section>

      <section className="bg-olive-deep text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-6 px-4 py-12 sm:px-6 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl">{messages.Titles.Price_list}</h2>
            <p className="mt-3 text-white/80">{messages.Pricelist.subtitle}</p>
            <Link href="/pricelist" className="mt-5 inline-flex rounded-full border border-white px-5 py-3 text-sm font-semibold">{ui.seePrices}</Link>
          </div>
          <p className="rounded-3xl border border-white/30 p-6 text-center">
            <b className="block font-display text-6xl">{lowest}</b>
            <span className="text-sm text-white/80">EUR</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{messages.How_Reserve.title}</h2>
        <ol className="mt-6 grid gap-3">
          {[0, 1, 2].map((index) => (
            <li key={index} className="rounded-2xl bg-paper p-4 text-ink">
              <h3 className="font-display text-2xl">
                {index + 1}. {[messages.How_Reserve.steps.title, messages.How_Reserve.steps.title2, messages.How_Reserve.steps.title3][index]}
              </h3>
              <OwnerDescription
                id={`home-step-${index}`}
                text={[messages.How_Reserve.steps.des, messages.How_Reserve.steps.des2, messages.How_Reserve.steps.des3][index]}
                moreLabel={messages.Buttons.Show_more}
                lessLabel={messages.Buttons.Show_less}
              />
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{messages.Distances.title}</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {Distances.map((item, index) => (
            <li key={places[index]} className="flex justify-between rounded-xl border border-sand px-4 py-3 text-sm">
              <span>{places[index]}</span>
              <b>{item.distance} km</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="font-display text-4xl text-olive-deep">{messages.Map_Location.title}</h2>
        <div className="mt-4 h-[420px] overflow-hidden rounded-3xl">
          <IFrameMaps className="h-full" />
        </div>
      </section>
    </>
  );
}
