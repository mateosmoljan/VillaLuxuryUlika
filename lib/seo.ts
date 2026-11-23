import type { Metadata } from "next";

export const siteUrl = "https://www.villaluxulika.com";
export const locales = ["hr", "en", "de", "it"] as const;
export type Locale = (typeof locales)[number];
export type SeoPage =
  | "home"
  | "villa"
  | "pricelist"
  | "contact"
  | "photogallery"
  | "surroundings"
  | "events";

const paths: Record<SeoPage, string> = {
  home: "",
  villa: "/villa-luxury-ulika",
  pricelist: "/pricelist",
  contact: "/contact",
  photogallery: "/photogallery",
  surroundings: "/surroundings",
  events: "/events",
};

const ogImage = `${siteUrl}/assets/images/i/105.jpg`;

const copy: Record<Locale, Record<SeoPage, { title: string; description: string }>> = {
  hr: {
    home: {
      title: "Villa Luxury Ulika – Istra",
      description:
        "Kuća za odmor Villa Luxury Ulika u Vodnjanu u Istri. Četiri spavaće sobe, privatni bazen, finska sauna i jacuzzi.",
    },
    villa: {
      title: "Kuća za odmor Villa Luxury Ulika",
      description:
        "Opis vile Luxury Ulika u Vodnjanu: spavaće sobe, kuhinja, knjižnica, wellness zona i grijani bazen.",
    },
    pricelist: {
      title: "Cjenik – Villa Luxury Ulika",
      description:
        "Cjenik noćenja u vili Luxury Ulika u Vodnjanu, od studenog 2026. do prosinca 2027.",
    },
    contact: {
      title: "Kontakt – Villa Luxury Ulika",
      description:
        "Pošaljite upit za rezervaciju vile Luxury Ulika u Vodnjanu.",
    },
    photogallery: {
      title: "Fotogalerija – Villa Luxury Ulika",
      description:
        "Fotografije vile Luxury Ulika u Vodnjanu: interijer, bazen i vrt.",
    },
    surroundings: {
      title: "Vodnjan i okolica – Villa Luxury Ulika",
      description:
        "Vodnjan i okolica Istre u blizini vile Luxury Ulika.",
    },
    events: {
      title: "Proslave – Villa Luxury Ulika",
      description:
        "Paketi za proslave u vili Luxury Ulika u Vodnjanu.",
    },
  },
  en: {
    home: {
      title: "Villa Luxury Ulika – Istria",
      description:
        "Holiday home Villa Luxury Ulika in Vodnjan, Istria. Four bedrooms, a private pool, a Finnish sauna and a jacuzzi.",
    },
    villa: {
      title: "Holiday home Villa Luxury Ulika",
      description:
        "Description of Villa Luxury Ulika in Vodnjan: bedrooms, kitchen, library, wellness area and a heated pool.",
    },
    pricelist: {
      title: "Price list – Villa Luxury Ulika",
      description:
        "Nightly prices for Villa Luxury Ulika in Vodnjan, from November 2026 to December 2027.",
    },
    contact: {
      title: "Contact – Villa Luxury Ulika",
      description: "Send a booking inquiry for Villa Luxury Ulika in Vodnjan.",
    },
    photogallery: {
      title: "Photo gallery – Villa Luxury Ulika",
      description:
        "Photographs of Villa Luxury Ulika in Vodnjan: interior, pool and garden.",
    },
    surroundings: {
      title: "Vodnjan and the surroundings – Villa Luxury Ulika",
      description: "Vodnjan and the Istrian surroundings near Villa Luxury Ulika.",
    },
    events: {
      title: "Celebrations – Villa Luxury Ulika",
      description: "Celebration packages at Villa Luxury Ulika in Vodnjan.",
    },
  },
  de: {
    home: {
      title: "Villa Luxury Ulika – Istrien",
      description:
        "Ferienhaus Villa Luxury Ulika in Vodnjan, Istrien. Vier Schlafzimmer, privater Pool, finnische Sauna und Jacuzzi.",
    },
    villa: {
      title: "Ferienhaus Villa Luxury Ulika",
      description:
        "Beschreibung der Villa Luxury Ulika in Vodnjan: Schlafzimmer, Küche, Bibliothek, Wellnessbereich und beheizter Pool.",
    },
    pricelist: {
      title: "Preisliste – Villa Luxury Ulika",
      description:
        "Übernachtungspreise der Villa Luxury Ulika in Vodnjan, von November 2026 bis Dezember 2027.",
    },
    contact: {
      title: "Kontakt – Villa Luxury Ulika",
      description: "Senden Sie eine Buchungsanfrage für die Villa Luxury Ulika in Vodnjan.",
    },
    photogallery: {
      title: "Fotogalerie – Villa Luxury Ulika",
      description:
        "Fotos der Villa Luxury Ulika in Vodnjan: Innenräume, Pool und Garten.",
    },
    surroundings: {
      title: "Vodnjan und Umgebung – Villa Luxury Ulika",
      description: "Vodnjan und die istrische Umgebung in der Nähe der Villa Luxury Ulika.",
    },
    events: {
      title: "Feiern – Villa Luxury Ulika",
      description: "Feierpakete in der Villa Luxury Ulika in Vodnjan.",
    },
  },
  it: {
    home: {
      title: "Villa Luxury Ulika – Istria",
      description:
        "Casa vacanze Villa Luxury Ulika a Vodnjan, in Istria. Quattro camere, piscina privata, sauna finlandese e jacuzzi.",
    },
    villa: {
      title: "Casa vacanze Villa Luxury Ulika",
      description:
        "Descrizione di Villa Luxury Ulika a Vodnjan: camere, cucina, biblioteca, zona benessere e piscina riscaldata.",
    },
    pricelist: {
      title: "Listino prezzi – Villa Luxury Ulika",
      description:
        "Prezzi a notte di Villa Luxury Ulika a Vodnjan, da novembre 2026 a dicembre 2027.",
    },
    contact: {
      title: "Contatto – Villa Luxury Ulika",
      description: "Invia una richiesta di prenotazione per Villa Luxury Ulika a Vodnjan.",
    },
    photogallery: {
      title: "Galleria fotografica – Villa Luxury Ulika",
      description:
        "Fotografie di Villa Luxury Ulika a Vodnjan: interni, piscina e giardino.",
    },
    surroundings: {
      title: "Vodnjan e dintorni – Villa Luxury Ulika",
      description: "Vodnjan e i dintorni dell'Istria vicino a Villa Luxury Ulika.",
    },
    events: {
      title: "Feste – Villa Luxury Ulika",
      description: "Pacchetti per feste a Villa Luxury Ulika a Vodnjan.",
    },
  },
};

export function pageUrl(locale: string, page: SeoPage) {
  return `${siteUrl}/${locale}${paths[page]}`;
}

export function pageMetadata(locale: string, page: SeoPage): Metadata {
  const lang = (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : "en";
  const { title, description } = copy[lang][page];
  const canonical = pageUrl(lang, page);
  const languages: Record<string, string> = {};
  for (const item of locales) languages[item] = pageUrl(item, page);
  languages["x-default"] = pageUrl("en", page);

  return {
    title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [{ url: ogImage, alt: "Villa Luxury Ulika" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export const publicPages: SeoPage[] = [
  "home",
  "villa",
  "pricelist",
  "contact",
  "photogallery",
  "surroundings",
  "events",
];
