import { Link } from "@/navigation";
import Dates from "@/components/brochure/Dates";
import { villaPhotoAlt } from "@/lib/photoAlt";
import { dailyPrices } from "@/lib/dailyPrices";
import { Distances } from "@/lib/LocationDistance";
import IFrameMaps from "@/components/About/iFrameMaps";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const packs = { hr, en, de, it };
const sizes = [4, 3, 14, 4, 4, 1, 6, 3, 9, 2, 3, 3, 3, 2];

function localeOf(value: string) {
  return value === "hr" || value === "de" || value === "it" ? value : "en";
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return pageMetadata(params.locale, "home");
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale = localeOf(params.locale);
  const messages = packs[locale];
  const features = messages.Villa_Features;
  const titles = [
    features.title3, features.title4, features.title5, features.title6, features.title7,
    features.title8, features.title9, features.title10, features.title11, features.title12,
    features.title13, features.title14, features.title15, features.title16,
  ];
  let cursor = 0;
  const groups = sizes.map((size, index) => {
    const items = features.card.title.slice(cursor, cursor + size);
    cursor += size;
    return { title: titles[index], items };
  });
  const cards = [0, 1, 2, 8, 9, 10].map((index) => groups[index]);
  const shots = [105, 76, 42, 16, 88];
  const lowest = Math.min(...Object.values(dailyPrices).filter((value): value is number => value != null));
  const pool = messages.Villa_Description.des2.split("\n\n").find((part) => part.includes("8 × 4")) ?? "";

  return (
    <main id="main">
      <link rel="preload" as="image" imageSrcSet="/hero/ulika-640.avif 640w, /hero/ulika-828.avif 828w" imageSizes="100vw" type="image/avif" media="(max-width: 767px)" fetchPriority="high" />
      <section className="hero">
        <picture>
          <source media="(max-width: 767px)" srcSet="/hero/ulika-640.avif 640w, /hero/ulika-828.avif 828w" sizes="100vw" type="image/avif" />
          <source media="(max-width: 767px)" srcSet="/hero/ulika-640.webp 640w, /hero/ulika-828.webp 828w" sizes="100vw" type="image/webp" />
          <source srcSet="/hero/ulika-1280.avif" type="image/avif" />
          <img className="hero-img" src="/hero/ulika-1280.webp" alt={villaPhotoAlt(locale, 1)} width={1280} height={853} fetchPriority="high" />
        </picture>
        <div className="hero-ov" />
        <div className="wrap hero-in">
          <p className="badge">Vodnjan · Istra</p>
          <h1>Villa Luxury Ulika</h1>
          <p className="lead">{messages.About.des}</p>
          <ul className="hf">
            <li>{messages.Acommodation.card_des}</li>
            <li>4 · {features.title3}</li>
            <li>8 × 4 m</li>
            <li aria-label={messages.Categorization.title[0]}>⭐⭐⭐⭐⭐</li>
          </ul>
          <form className="hs" action={`/${locale}/contact`} method="get">
            <p className="hs-h">{messages.Contact.Contact_Form.arrival}</p>
            <Dates locale={locale} arrivalLabel={messages.Contact.Contact_Form.arrival} departureLabel={messages.Contact.Contact_Form.departure} />
            <button className="btn btn-cta btn-lg" type="submit">{messages.Navigation.navLinksButton}</button>
          </form>
        </div>
      </section>
      <div className="wrap">
        <ul className="facts">
          <li><b>8</b><span>{messages.Acommodation.card_des}</span></li>
          <li><b>4</b><span>{features.title3}</span></li>
          <li><b>8 × 4 m</b><span>{features.card.title[41]}</span></li>
          <li><b>⭐⭐⭐⭐⭐</b><span>{messages.Categorization.title[0]}</span></li>
        </ul>
      </div>
      <section className="sec wrap">
        <h2>{features.title2}</h2>
        <div className="cards">
          {cards.map((group) => (
            <article className="card" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.slice(0, 3).join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="sec wrap">
        <div className="sec-h">
          <h2>{messages.Titles.Photogallery}</h2>
          <Link className="more" href="/photogallery">{messages.Buttons.Show_Gallery}</Link>
        </div>
        <div className="bento">
          {shots.map((id, index) => (
            <a key={id} className="gi" href={`/assets/images/i/${id}.jpg`}>
              <img src={`/assets/images/i/${id}.jpg`} alt={villaPhotoAlt(locale, index + 1)} width={800} height={533} loading={index === 0 ? "eager" : "lazy"} />
            </a>
          ))}
        </div>
      </section>
      <section className="sec band2">
        <div className="wrap price-t">
          <div>
            <h2>{messages.Titles.Price_list}</h2>
            <p>{messages.Pricelist.subtitle}</p>
            <Link className="btn btn-ghost-w" href="/pricelist">{messages.Titles.Price_list}</Link>
          </div>
          <p className="pbig"><b>{lowest}</b><span>EUR</span></p>
        </div>
      </section>
      <section className="sec wrap">
        <h2>{messages.How_Reserve.title}</h2>
        <div className="cards">
          {[0, 1, 2].map((index) => (
            <article className="card" key={index}>
              <h3>{index + 1}. {[messages.How_Reserve.steps.title, messages.How_Reserve.steps.title2, messages.How_Reserve.steps.title3][index]}</h3>
              <p>{[messages.How_Reserve.steps.des, messages.How_Reserve.steps.des2, messages.How_Reserve.steps.des3][index]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="sec wrap">
        <div className="cards">
          <article className="card">
            <h3>{features.card.title[41]}</h3>
            <p>{pool}</p>
            <Link className="more" href="/guides/pool">{messages.Buttons.Show_more}</Link>
          </article>
          <article className="card">
            <h3>{features.title9}</h3>
            <p>{groups[6].items.join(" · ")}</p>
            <Link className="more" href="/guides/family">{messages.Buttons.Show_more}</Link>
          </article>
        </div>
      </section>
      <section className="sec wrap faq">
        <h2>{messages.Payment_conditions.title}</h2>
        <div className="faqlist">
          {[messages.Payment_conditions.des2, messages.Payment_conditions.des3, messages.Payment_conditions.des4, messages.Payment_conditions.des5, messages.Payment_conditions.des6].map((text) => (
            <details key={text.slice(0, 40)}>
              <summary>{text.replace(/[*#]/g, "").slice(0, 80)}</summary>
              <p>{text.replace(/\*\*/g, "")}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="sec wrap">
        <h2>{messages.Distances.title}</h2>
        <ul className="cards">
          {Distances.map((item, index) => (
            <li className="card" key={messages.Distances.place[index] ?? index}>
              <h3>{messages.Distances.place[index]}</h3>
              <p>{item.distance} km</p>
            </li>
          ))}
        </ul>
        <h2>{messages.Map_Location.title}</h2>
        <div style={{ height: 420 }}>
          <IFrameMaps className="h-full" />
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <h2>{messages.Navigation.navLinksButton}</h2>
          <Link className="btn btn-cta btn-lg" href="/contact">{messages.Navigation.navLinksButton}</Link>
        </div>
      </section>
    </main>
  );
}
