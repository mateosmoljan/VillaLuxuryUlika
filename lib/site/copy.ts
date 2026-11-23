import { amenitiesFor, type AmenityGroup } from "./amenities";
import type { Locale } from "./gallery";

export type { Locale };

export type Space = {
  id: string;
  title: string;
  image?: string;
  imageAlt?: string;
  points: string[];
};

export type Copy = {
  meta: { title: string; description: string; ogAlt: string };
  skip: string;
  nav: {
    home: string;
    villa: string;
    prices: string;
    gallery: string;
    place: string;
    contact: string;
    book: string;
    open: string;
    close: string;
  };
  hero: { eyebrow: string; title: string; lead: string; primary: string; secondary: string };
  intro: { kicker: string; title: string; paragraphs: string[] };
  cards: { href: string; title: string; text: string }[];
  spaces: { kicker: string; title: string; items: Space[] };
  amenities: { kicker: string; title: string; excludedNote: string; groups: AmenityGroup[] };
  prices: {
    kicker: string;
    title: string;
    description: string;
    intro: string;
    currency: string;
    unavailable: string;
    previous: string;
    next: string;
    month: string;
    weekdays: string[];
  };
  booking: {
    title: string;
    steps: { title: string; text: string }[];
    methodsTitle: string;
    methods: string[];
  };
  gallery: { kicker: string; title: string; intro: string };
  place: { kicker: string; title: string; paragraphs: string[] };
  contact: {
    kicker: string;
    title: string;
    intro: string;
    personLabel: string;
    person: string;
    phoneLabel: string;
    phones: { display: string; href: string }[];
    emailLabel: string;
    email: string;
    languagesLabel: string;
    languages: string;
    form: {
      name: string;
      email: string;
      phone: string;
      arrival: string;
      departure: string;
      message: string;
      submit: string;
      sending: string;
      sent: string;
      error: string;
      privacy: string;
    };
  };
  footer: { rights: string; place: string };
};

const phones = [
  { display: "+(385) 95 582 4729", href: "tel:+385955824729" },
  { display: "+(385) 99 873 4770", href: "tel:+385998734770" },
];

const email = "villa-ulika-fivestars@gmail.com";

const images = {
  bedroom: "/assets/images/i/7.jpg",
  living: "/assets/images/i/42.jpg",
  kitchen: "/assets/images/i/50.jpg",
  library: "/assets/images/i/16.jpg",
  wellness: "/assets/images/i/64.jpg",
  pool: "/assets/images/i/76.jpg",
  garden: "/assets/images/i/136.jpg",
};

const bundles: Record<Locale, Omit<Copy, "amenities"> & { amenities: Omit<Copy["amenities"], "groups"> }> = {
  hr: {
    meta: {
      title: "Villa Luxury Ulika, Vodnjan",
      description:
        "Villa Luxury Ulika na rubu Vodnjana u Istri: četiri spavaće sobe, knjižnica, finska sauna, jacuzzi i grijani bazen 8 × 4 m u ograđenom vrtu.",
      ogAlt: "Zračni pogled na vilu, bazen i okolna polja kraj Vodnjana u Istri",
    },
    skip: "Na sadržaj",
    nav: {
      home: "Početna",
      villa: "Vila",
      prices: "Cjenik",
      gallery: "Fotogalerija",
      place: "Okolica",
      contact: "Kontakt",
      book: "Upit",
      open: "Izbornik",
      close: "Zatvori izbornik",
    },
    hero: {
      eyebrow: "Vodnjan · Istra",
      title: "Villa Luxury Ulika",
      lead: "Mirna vila na rubu Vodnjana, među maslinama. Četiri spavaće sobe, knjižnica, privatna sauna i jacuzzi te grijani bazen u ograđenom vrtu.",
      primary: "Prostor",
      secondary: "Cjenik",
    },
    intro: {
      kicker: "Vila",
      title: "Kamen, masline i tišina dvorišta",
      paragraphs: [
        "Na rubu Vodnjana, među maslinama i mediteranskim biljem, vila je skrivena od gradske vreve. U kamenu i tonovima zidova spajaju se suvremena udobnost i istarski duh.",
        "Prostrani interijer, privatna wellness zona i ograđeni vanjski prostor namijenjeni su obiteljima i prijateljima koji žele mirniji boravak.",
      ],
    },
    cards: [
      { href: "/villa-luxury-ulika#bedrooms", title: "Spavaće sobe", text: "Četiri klimatizirane sobe, svaka s televizorom." },
      { href: "/villa-luxury-ulika#kitchen", title: "Kuhinja", text: "Opremljena kuhinja i stol za deset osoba." },
      { href: "/villa-luxury-ulika#library", title: "Knjižnica", text: "Dvije fotelje i police s knjigama, na katu." },
      { href: "/villa-luxury-ulika#wellness", title: "Wellness", text: "Finska sauna, jacuzzi, ležaljke i tuš." },
      { href: "/villa-luxury-ulika#pool", title: "Bazen", text: "Grijani bazen 8 × 4 m u ograđenom dvorištu." },
      { href: "/villa-luxury-ulika#pool", title: "Vrt", text: "Masline, travnjak, terasa i ljetna kuhinja." },
      { href: "/villa-luxury-ulika#children", title: "Djeca", text: "Kutak za igru i oprema za bebe na upit." },
      { href: "/villa-luxury-ulika#pool", title: "Dolazak", text: "Privatno parkiranje i Tesla Wall Connector." },
    ],
    spaces: {
      kicker: "Prostor",
      title: "Kako je vila složena",
      items: [
        {
          id: "bedrooms",
          title: "Spavaće sobe i kupaonice",
          image: images.bedroom,
          imageAlt: "Spavaća soba s bračnim krevetom, plavim uzglavljem i zavjesama",
          points: [
            "Četiri klimatizirane spavaće sobe, svaka s vlastitim televizorom.",
            "Na katu su dvije sobe s bračnim krevetima. Svaka ima zasebnu garderobu (walk-in ormar).",
            "Na istom katu je velika zajednička kupaonica.",
            "U prizemlju su još dvije sobe: jedna s bračnim krevetom i jedna s dva odvojena kreveta.",
            "Obje sobe u prizemlju imaju vlastitu kupaonicu.",
          ],
        },
        {
          id: "living",
          title: "Dnevni boravak",
          image: images.living,
          imageAlt: "Dnevni boravak s tirkiznim sofama, kaminom i visokim prozorima",
          points: [
            "Prostor za zajedničko druženje.",
            "Udoban trosjed, dvosjed i fotelja.",
            "Veliki Smart TV i zvučnici.",
          ],
        },
        {
          id: "kitchen",
          title: "Kuhinja i blagovaonica",
          image: images.kitchen,
          imageAlt: "Blagovaonica s mramornim stolom i tirkiznim stolicama",
          points: [
            "Veliki dvokrilni hladnjak sa zamrzivačem, plinski štednjak, pećnica, mikrovalna pećnica, perilica posuđa i perilica rublja.",
            "Aparati za filter kavu i espresso, posuđe, pribor za kuhanje i jelo te čaše za vino i šampanjac.",
            "Osnovne potrepštine za kućanstvo, pribor za sušenje rublja i komplet prve pomoći.",
            "Blagovaonica sa stolom za deset osoba.",
            "U ovom dijelu vile je i manji WC za goste.",
          ],
        },
        {
          id: "library",
          title: "Knjižnica",
          image: images.library,
          imageAlt: "Knjižnica s policama knjiga i zelenim foteljama",
          points: [
            "Na katu, s dvije udobne fotelje i policama s knjigama.",
            "Iz ovog prostora vidi se dnevni boravak i visoki prozori kroz koje ulazi danje svjetlo.",
          ],
        },
        {
          id: "wellness",
          title: "Privatna wellness zona",
          image: images.wellness,
          imageAlt: "Wellness zona s ležaljkama i jacuzzijem",
          points: [
            "Unutar vile, samo za goste.",
            "Finska sauna, jacuzzi, dvije ležaljke i tuš-kabina.",
            "Ručnici i eterična ulja za saunu.",
          ],
        },
        {
          id: "pool",
          title: "Grijani bazen i vanjski prostor",
          image: images.pool,
          imageAlt: "Vanjski bazen, ležaljke i vila u ograđenom dvorištu",
          points: [
            "Privatni bazen 8 × 4 m u potpuno ograđenom dvorištu, s postupnim prijelazom do približno 1,5 m.",
            "U popisu pogodnosti naveden je kao dostupan od svibnja do rujna, otvoren 24 sata, vanjski i grijani, s navlakom.",
            "Grije se od 1. svibnja do 18. lipnja i od 11. rujna do 9. listopada.",
            "Temperatura vode može odstupati za ±5 °C, ovisno o vremenskim uvjetima i pravilnom korištenju prekrivača.",
            "Bazen treba prekriti kada nije u upotrebi.",
            "Uz bazen su ležaljke, dva suncobrana, pomoćni stolić i vanjski tuš.",
            "Natkrivena terasa i ljetna kuhinja s plinskim roštiljem i sudoperom.",
            "Dio dvorišta je travnjak. Imanje je okruženo zelenilom i maslinama.",
            "Privatno parkiralište i Tesla Wall Connector punjač za električna vozila.",
          ],
        },
        {
          id: "children",
          title: "Kutak za najmlađe",
          points: [
            "Dječji kutak za igru: drvena kuhinjica s priborom, stalak s rolom papira za crtanje i bojice, plišane igračke, interaktivne podloge te drvene staze za autiće i vlakiće.",
            "Uz navedeno, u kutku su i druge igračke i aktivnosti, bez posebnog popisa.",
            "Za bebe su dostupni dječji krevetić, kadica za kupanje, hranilica i dječji pribor za jelo.",
            "Krevetić, stolicu za hranjenje i kadicu gosti trebaju zatražiti. Osigurane su plahte i uključeni su u rezervaciju. Stolica je samostojeća, s pladnjem i sigurnosnim pojasevima.",
          ],
        },
      ],
    },
    amenities: {
      kicker: "Popis",
      title: "Što je u vili",
      excludedNote: "Ove stavke nisu dio opreme.",
    },
    prices: {
      kicker: "Cjenik",
      title: "Dnevni iznosi",
      description: "Dnevni iznosi za Villa Luxury Ulika od studenoga 2026. do prosinca 2027., u eurima.",
      intro:
        "Svaki broj je dnevni iznos za taj datum, u eurima. Dani bez broja u cjeniku ovdje su prazni: kosa crta u tablici nije cijena 0. Cjenik ne navodi što je u iznos uključeno.",
      currency: "EUR",
      unavailable: "Nije navedeno",
      previous: "Prethodni mjesec",
      next: "Sljedeći mjesec",
      month: "Mjesec",
      weekdays: ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"],
    },
    booking: {
      title: "Rezervacija i plaćanje",
      steps: [
        {
          title: "Akontacija",
          text: "Za osiguranje rezervacije plaća se 30% pune cijene unaprijed izravno vlasniku, a 70% pri dolasku.",
        },
        {
          title: "Depozit",
          text: "Povratni depozit ako je sve u redu: 500 eura.",
        },
        {
          title: "Otkazivanje",
          text: "Besplatno otkazivanje moguće je u roku od tjedan dana od rezervacije. Iznimka su rezervacije u zadnji trenutak, dva tjedna prije dolaska: tada je rok 48 sati.",
        },
        {
          title: "Dolazak i odlazak",
          text: "Zadnjeg dana boravka smještaj se napušta do 9 sati. Sljedeći gosti mogu ući od 16 sati.",
        },
        {
          title: "Kućni ljubimci",
          text: "Nisu dopušteni na prostoru objekta.",
        },
        {
          title: "Nakon uplate",
          text: "Upit možete poslati obrascem, e-poštom ili telefonom. Nakon uplate javite nam se kako bismo potvrdili uplatu i rezervaciju.",
        },
      ],
      methodsTitle: "Načini plaćanja",
      methods: ["Gotovina po dolasku", "Bankovni prijenos", "Revolut", "PayPal"],
    },
    gallery: {
      kicker: "Fotogalerija",
      title: "Vila i dvorište",
      intro: "Fotografije iz postojeće galerije vile.",
    },
    place: {
      kicker: "Mjesto",
      title: "Rub Vodnjana, Istra",
      paragraphs: [
        "Vila je na rubu mirnog Vodnjana, u Istri. Okružena je maslinama i mediteranskim biljem i odmaknuta je od gradske vreve.",
        "Dvorište je ograđeno, s travnjakom, zelenilom i maslinama. Parkiranje na posjedu je besplatno.",
      ],
    },
    contact: {
      kicker: "Kontakt",
      title: "Upit za boravak",
      intro: "Poruka ide na e-poštu vlasnika smještaja i služi samo za upit o rezervaciji ove vile.",
      personLabel: "Kontakt osoba",
      person: "Mihovil Smoljan",
      phoneLabel: "Telefon",
      phones,
      emailLabel: "E-pošta",
      email,
      languagesLabel: "Jezici",
      languages: "Hrvatski, engleski, njemački i talijanski",
      form: {
        name: "Ime i prezime",
        email: "E-pošta",
        phone: "Telefon",
        arrival: "Dolazak",
        departure: "Odlazak",
        message: "Upit",
        submit: "Pošalji upit",
        sending: "Šaljem…",
        sent: "Upit je poslan.",
        error: "Upit nije poslan. Javite se telefonom ili e-poštom.",
        privacy:
          "Sadržaj obrasca šalje se izravno na e-poštu vlasnika smještaja i koristi se samo za upit o rezervaciji ove vile.",
      },
    },
    footer: { rights: "Sva prava pridržana", place: "Vodnjan, Istra" },
  },
  en: {
    meta: {
      title: "Villa Luxury Ulika, Vodnjan",
      description:
        "Villa Luxury Ulika on the edge of Vodnjan, Istria: four bedrooms, a library, a Finnish sauna, a hot tub and a heated 8 × 4 m pool in a fenced garden.",
      ogAlt: "Aerial view of the villa, pool and surrounding fields near Vodnjan, Istria",
    },
    skip: "Skip to content",
    nav: {
      home: "Home",
      villa: "Villa",
      prices: "Prices",
      gallery: "Gallery",
      place: "Place",
      contact: "Contact",
      book: "Enquiry",
      open: "Menu",
      close: "Close menu",
    },
    hero: {
      eyebrow: "Vodnjan · Istria",
      title: "Villa Luxury Ulika",
      lead: "A quiet villa on the edge of Vodnjan, among olive trees. Four bedrooms, a library, a private sauna and hot tub, and a heated pool in a fenced garden.",
      primary: "The house",
      secondary: "Prices",
    },
    intro: {
      kicker: "The villa",
      title: "Stone, olive trees and a quiet garden",
      paragraphs: [
        "On the edge of Vodnjan, among olive trees and Mediterranean plants, the villa is set away from the bustle of town. Stone and the tone of the walls hold modern comfort and an Istrian character together.",
        "The generous interior, the private wellness area and the fenced outdoor space are meant for families and friends who want a quieter stay.",
      ],
    },
    cards: [
      { href: "/villa-luxury-ulika#bedrooms", title: "Bedrooms", text: "Four air-conditioned rooms, each with a television." },
      { href: "/villa-luxury-ulika#kitchen", title: "Kitchen", text: "A fitted kitchen and a table for ten." },
      { href: "/villa-luxury-ulika#library", title: "Library", text: "Two armchairs and bookshelves, upstairs." },
      { href: "/villa-luxury-ulika#wellness", title: "Wellness", text: "Finnish sauna, hot tub, loungers and a shower." },
      { href: "/villa-luxury-ulika#pool", title: "Pool", text: "A heated 8 × 4 m pool in a fenced garden." },
      { href: "/villa-luxury-ulika#pool", title: "Garden", text: "Olives, lawn, terrace and a summer kitchen." },
      { href: "/villa-luxury-ulika#children", title: "Children", text: "A play corner, and baby equipment on request." },
      { href: "/villa-luxury-ulika#pool", title: "Arrival", text: "Private parking and a Tesla Wall Connector." },
    ],
    spaces: {
      kicker: "The house",
      title: "How the villa is arranged",
      items: [
        {
          id: "bedrooms",
          title: "Bedrooms and bathrooms",
          image: images.bedroom,
          imageAlt: "Bedroom with a double bed, blue headboard and curtains",
          points: [
            "Four air-conditioned bedrooms, each with its own television.",
            "Upstairs there are two rooms with double beds. Each has its own walk-in wardrobe.",
            "On the same floor there is a large shared bathroom.",
            "Downstairs there are two more rooms: one with a double bed and one with two separate beds.",
            "Both downstairs rooms have their own bathroom.",
          ],
        },
        {
          id: "living",
          title: "Living room",
          image: images.living,
          imageAlt: "Living room with teal sofas, a fireplace and tall windows",
          points: [
            "A room for spending time together.",
            "A comfortable three-seat sofa, a two-seat sofa and an armchair.",
            "A large Smart TV and speakers.",
          ],
        },
        {
          id: "kitchen",
          title: "Kitchen and dining",
          image: images.kitchen,
          imageAlt: "Dining area with a marble table and teal chairs",
          points: [
            "A large double-door fridge with a freezer, a gas stove, an oven, a microwave, a dishwasher and a washing machine.",
            "Filter coffee and espresso machines, crockery, cooking and eating utensils, and wine and champagne glasses.",
            "Basic household supplies, equipment for drying laundry, and a first-aid kit.",
            "A dining area with a table for ten.",
            "A smaller guest WC is in this part of the villa.",
          ],
        },
        {
          id: "library",
          title: "Library",
          image: images.library,
          imageAlt: "Library with bookshelves and green armchairs",
          points: [
            "Upstairs, with two comfortable armchairs and bookshelves.",
            "From here you look onto the living room and the tall windows that bring in daylight.",
          ],
        },
        {
          id: "wellness",
          title: "Private wellness area",
          image: images.wellness,
          imageAlt: "Wellness area with loungers and a hot tub",
          points: [
            "Inside the villa, for guests only.",
            "A Finnish sauna, a hot tub, two loungers and a shower cabin.",
            "Towels and essential oils for the sauna.",
          ],
        },
        {
          id: "pool",
          title: "Heated pool and outdoors",
          image: images.pool,
          imageAlt: "Outdoor pool, loungers and the villa in the fenced garden",
          points: [
            "A private 8 × 4 m pool in a fully fenced garden, sloping gradually to about 1.5 m.",
            "The amenity list states that it is available from May to September, open 24 hours, outdoor and heated, with a cover.",
            "It is heated from 1 May to 18 June and from 11 September to 9 October.",
            "The water temperature may vary by ±5 °C, depending on the weather and on using the cover properly.",
            "The pool must be covered when it is not in use.",
            "By the pool: loungers, two parasols, a side table and an outdoor shower.",
            "A covered terrace and a summer kitchen with a gas barbecue and a sink.",
            "Part of the garden is lawn. The property is surrounded by greenery and olive trees.",
            "Private parking and a Tesla Wall Connector charger for electric vehicles.",
          ],
        },
        {
          id: "children",
          title: "A corner for children",
          points: [
            "A play corner: a wooden kitchen with utensils, a stand with a roll of drawing paper and crayons, soft toys, activity mats, and wooden tracks for cars and trains.",
            "There are further toys and activities as well, which are not listed one by one.",
            "For babies: a cot, a baby bath, a feeding chair and children's tableware.",
            "Guests need to request the cot, the feeding chair and the baby bath. Sheets are provided and they are included in the reservation. The chair is freestanding, with a tray and safety straps.",
          ],
        },
      ],
    },
    amenities: {
      kicker: "List",
      title: "What is in the villa",
      excludedNote: "These items are not part of the equipment.",
    },
    prices: {
      kicker: "Prices",
      title: "Daily amounts",
      description: "Daily amounts for Villa Luxury Ulika from November 2026 through December 2027, in euros.",
      intro:
        "Each number is the daily amount for that date, in euros. Days with no number in the price file are left blank here: a slash in the table is not a price of 0. The price file does not say what the amount includes.",
      currency: "EUR",
      unavailable: "Not listed",
      previous: "Previous month",
      next: "Next month",
      month: "Month",
      weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    booking: {
      title: "Reservation and payment",
      steps: [
        {
          title: "Advance payment",
          text: "To secure a reservation, 30% of the full price is paid in advance directly to the owner, and 70% on arrival.",
        },
        {
          title: "Deposit",
          text: "Refundable deposit if everything is in order: 500 euros.",
        },
        {
          title: "Cancellation",
          text: "Free cancellation is possible within one week of booking. The exception is a last-minute booking, made two weeks before arrival: then the deadline is 48 hours.",
        },
        {
          title: "Arrival and departure",
          text: "On the last day, the house is vacated by 9:00. The next guests can enter from 16:00.",
        },
        {
          title: "Pets",
          text: "Pets are not allowed on the property.",
        },
        {
          title: "After payment",
          text: "You can send an enquiry by the form, by email or by phone. After paying, let us know so we can confirm the payment and the reservation.",
        },
      ],
      methodsTitle: "Ways to pay",
      methods: ["Cash on arrival", "Bank transfer", "Revolut", "PayPal"],
    },
    gallery: {
      kicker: "Gallery",
      title: "The villa and the garden",
      intro: "Photographs from the villa's existing gallery.",
    },
    place: {
      kicker: "Place",
      title: "The edge of Vodnjan, Istria",
      paragraphs: [
        "The villa is on the edge of quiet Vodnjan, in Istria. It is surrounded by olive trees and Mediterranean plants and set away from the bustle of town.",
        "The garden is fenced, with lawn, greenery and olive trees. Parking on the property is free.",
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Enquiry",
      intro: "The message goes to the owner's email and is used only for an enquiry about booking this villa.",
      personLabel: "Contact",
      person: "Mihovil Smoljan",
      phoneLabel: "Phone",
      phones,
      emailLabel: "Email",
      email,
      languagesLabel: "Languages",
      languages: "Croatian, English, German and Italian",
      form: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        arrival: "Arrival",
        departure: "Departure",
        message: "Enquiry",
        submit: "Send enquiry",
        sending: "Sending…",
        sent: "The enquiry has been sent.",
        error: "The enquiry was not sent. Please call or email.",
        privacy:
          "The form is sent directly to the owner's email and is used only for an enquiry about booking this villa.",
      },
    },
    footer: { rights: "All rights reserved", place: "Vodnjan, Istria" },
  },
  de: {
    meta: {
      title: "Villa Luxury Ulika, Vodnjan",
      description:
        "Villa Luxury Ulika am Rand von Vodnjan in Istrien: vier Schlafzimmer, Bibliothek, finnische Sauna, Whirlpool und ein beheizter Pool von 8 × 4 m im eingezäunten Garten.",
      ogAlt: "Luftaufnahme der Villa, des Pools und der Felder bei Vodnjan in Istrien",
    },
    skip: "Zum Inhalt",
    nav: {
      home: "Start",
      villa: "Villa",
      prices: "Preise",
      gallery: "Galerie",
      place: "Lage",
      contact: "Kontakt",
      book: "Anfrage",
      open: "Menü",
      close: "Menü schließen",
    },
    hero: {
      eyebrow: "Vodnjan · Istrien",
      title: "Villa Luxury Ulika",
      lead: "Eine ruhige Villa am Rand von Vodnjan, zwischen Olivenbäumen. Vier Schlafzimmer, eine Bibliothek, eine private Sauna und ein Whirlpool sowie ein beheizter Pool im eingezäunten Garten.",
      primary: "Die Räume",
      secondary: "Preise",
    },
    intro: {
      kicker: "Die Villa",
      title: "Stein, Olivenbäume und ein stiller Hof",
      paragraphs: [
        "Am Rand von Vodnjan, zwischen Olivenbäumen und mediterranen Pflanzen, liegt die Villa abseits vom Trubel der Stadt. Stein und die Töne der Wände verbinden zeitgemäßen Komfort mit istrischem Charakter.",
        "Der großzügige Innenraum, der private Wellnessbereich und der eingezäunte Außenbereich sind für Familien und Freunde gedacht, die einen ruhigeren Aufenthalt suchen.",
      ],
    },
    cards: [
      { href: "/villa-luxury-ulika#bedrooms", title: "Schlafzimmer", text: "Vier klimatisierte Zimmer, jedes mit Fernseher." },
      { href: "/villa-luxury-ulika#kitchen", title: "Küche", text: "Ausgestattete Küche und ein Tisch für zehn." },
      { href: "/villa-luxury-ulika#library", title: "Bibliothek", text: "Zwei Sessel und Bücherregale, im Obergeschoss." },
      { href: "/villa-luxury-ulika#wellness", title: "Wellness", text: "Finnische Sauna, Whirlpool, Liegen und Dusche." },
      { href: "/villa-luxury-ulika#pool", title: "Pool", text: "Beheizter Pool, 8 × 4 m, im eingezäunten Garten." },
      { href: "/villa-luxury-ulika#pool", title: "Garten", text: "Oliven, Rasen, Terrasse und Sommerküche." },
      { href: "/villa-luxury-ulika#children", title: "Kinder", text: "Spielecke und Babyausstattung auf Anfrage." },
      { href: "/villa-luxury-ulika#pool", title: "Anreise", text: "Privater Parkplatz und Tesla Wall Connector." },
    ],
    spaces: {
      kicker: "Räume",
      title: "So ist die Villa angeordnet",
      items: [
        {
          id: "bedrooms",
          title: "Schlafzimmer und Bäder",
          image: images.bedroom,
          imageAlt: "Schlafzimmer mit Doppelbett, blauem Kopfteil und Vorhängen",
          points: [
            "Vier klimatisierte Schlafzimmer, jedes mit eigenem Fernseher.",
            "Im Obergeschoss liegen zwei Zimmer mit Doppelbetten. Jedes hat einen eigenen begehbaren Kleiderschrank.",
            "Auf derselben Etage gibt es ein großes gemeinsames Bad.",
            "Im Erdgeschoss liegen zwei weitere Zimmer: eines mit Doppelbett und eines mit zwei getrennten Betten.",
            "Beide Zimmer im Erdgeschoss haben ein eigenes Bad.",
          ],
        },
        {
          id: "living",
          title: "Wohnzimmer",
          image: images.living,
          imageAlt: "Wohnzimmer mit petrolfarbenen Sofas, Kamin und hohen Fenstern",
          points: [
            "Ein Raum für die gemeinsame Zeit.",
            "Ein bequemes Dreisitzer-Sofa, ein Zweisitzer und ein Sessel.",
            "Ein großer Smart-TV und Lautsprecher.",
          ],
        },
        {
          id: "kitchen",
          title: "Küche und Essbereich",
          image: images.kitchen,
          imageAlt: "Essbereich mit Marmortisch und petrolfarbenen Stühlen",
          points: [
            "Großer zweiflügeliger Kühlschrank mit Gefrierfach, Gasherd, Backofen, Mikrowelle, Geschirrspüler und Waschmaschine.",
            "Maschinen für Filterkaffee und Espresso, Geschirr, Koch- und Essutensilien sowie Gläser für Wein und Champagner.",
            "Grundlegende Haushaltsmittel, Ausstattung zum Trocknen der Wäsche und ein Erste-Hilfe-Set.",
            "Ein Essbereich mit einem Tisch für zehn Personen.",
            "In diesem Teil der Villa gibt es auch ein kleineres Gäste-WC.",
          ],
        },
        {
          id: "library",
          title: "Bibliothek",
          image: images.library,
          imageAlt: "Bibliothek mit Bücherregalen und grünen Sesseln",
          points: [
            "Im Obergeschoss, mit zwei bequemen Sesseln und Bücherregalen.",
            "Von hier sieht man das Wohnzimmer und die hohen Fenster, durch die Tageslicht hereinkommt.",
          ],
        },
        {
          id: "wellness",
          title: "Privater Wellnessbereich",
          image: images.wellness,
          imageAlt: "Wellnessbereich mit Liegen und Whirlpool",
          points: [
            "In der Villa, nur für Gäste.",
            "Finnische Sauna, Whirlpool, zwei Liegen und eine Duschkabine.",
            "Handtücher und ätherische Öle für die Sauna.",
          ],
        },
        {
          id: "pool",
          title: "Beheizter Pool und Außenbereich",
          image: images.pool,
          imageAlt: "Außenpool, Liegen und die Villa im eingezäunten Garten",
          points: [
            "Privater Pool, 8 × 4 m, in einem vollständig eingezäunten Garten, mit allmählichem Übergang bis etwa 1,5 m.",
            "In der Ausstattungsliste steht: verfügbar von Mai bis September, 24 Stunden geöffnet, draußen und beheizt, mit Abdeckung.",
            "Beheizt vom 1. Mai bis 18. Juni und vom 11. September bis 9. Oktober.",
            "Die Wassertemperatur kann um ±5 °C abweichen, je nach Wetter und richtiger Nutzung der Abdeckung.",
            "Der Pool ist abzudecken, wenn er nicht benutzt wird.",
            "Am Pool: Liegen, zwei Sonnenschirme, ein Beistelltisch und eine Außendusche.",
            "Überdachte Terrasse und Sommerküche mit Gasgrill und Spüle.",
            "Ein Teil des Hofes ist Rasen. Das Anwesen ist von Grün und Olivenbäumen umgeben.",
            "Privater Parkplatz und ein Tesla Wall Connector zum Laden von Elektrofahrzeugen.",
          ],
        },
        {
          id: "children",
          title: "Ecke für die Jüngsten",
          points: [
            "Eine Spielecke: eine Holzküche mit Zubehör, ein Ständer mit Papierrolle zum Zeichnen und Buntstifte, Plüschtiere, Spielmatten sowie Holzbahn für Autos und Züge.",
            "Darüber hinaus gibt es weiteres Spielzeug und weitere Beschäftigungen, die nicht einzeln aufgeführt sind.",
            "Für Babys: Kinderbett, Babybadewanne, Kinderessstuhl und Kindergeschirr.",
            "Kinderbett, Essstuhl und Babywanne müssen Gäste anfragen. Bettlaken werden gestellt, und sie sind in der Buchung enthalten. Der Stuhl steht frei, mit Tablett und Sicherheitsgurten.",
          ],
        },
      ],
    },
    amenities: {
      kicker: "Liste",
      title: "Was in der Villa ist",
      excludedNote: "Diese Punkte gehören nicht zur Ausstattung.",
    },
    prices: {
      kicker: "Preise",
      title: "Tagesbeträge",
      description: "Tagesbeträge für die Villa Luxury Ulika von November 2026 bis Dezember 2027, in Euro.",
      intro:
        "Jede Zahl ist der Tagesbetrag für dieses Datum, in Euro. Tage ohne Zahl in der Preisliste bleiben hier leer: ein Schrägstrich in der Tabelle ist nicht der Preis 0. Die Preisliste sagt nicht, was im Betrag enthalten ist.",
      currency: "EUR",
      unavailable: "Nicht angegeben",
      previous: "Vorheriger Monat",
      next: "Nächster Monat",
      month: "Monat",
      weekdays: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    },
    booking: {
      title: "Reservierung und Zahlung",
      steps: [
        {
          title: "Anzahlung",
          text: "Zur Sicherung der Reservierung werden 30 % des vollen Preises im Voraus direkt an den Eigentümer gezahlt und 70 % bei der Ankunft.",
        },
        {
          title: "Kaution",
          text: "Rückzahlbare Kaution, wenn alles in Ordnung ist: 500 Euro.",
        },
        {
          title: "Stornierung",
          text: "Kostenlose Stornierung ist innerhalb einer Woche nach der Buchung möglich. Ausnahme sind Last-Minute-Buchungen, zwei Wochen vor der Anreise: dann beträgt die Frist 48 Stunden.",
        },
        {
          title: "Anreise und Abreise",
          text: "Am letzten Tag wird das Haus bis 9 Uhr verlassen. Die nächsten Gäste können ab 16 Uhr hineingehen.",
        },
        {
          title: "Haustiere",
          text: "Haustiere sind auf dem Grundstück nicht erlaubt.",
        },
        {
          title: "Nach der Zahlung",
          text: "Eine Anfrage können Sie über das Formular, per E-Mail oder telefonisch senden. Nach der Zahlung geben Sie uns Bescheid, damit wir Zahlung und Reservierung bestätigen.",
        },
      ],
      methodsTitle: "Zahlungsarten",
      methods: ["Bar bei Ankunft", "Banküberweisung", "Revolut", "PayPal"],
    },
    gallery: {
      kicker: "Galerie",
      title: "Villa und Hof",
      intro: "Fotografien aus der bestehenden Galerie der Villa.",
    },
    place: {
      kicker: "Lage",
      title: "Am Rand von Vodnjan, Istrien",
      paragraphs: [
        "Die Villa liegt am Rand des ruhigen Vodnjan, in Istrien. Sie ist von Olivenbäumen und mediterranen Pflanzen umgeben und abseits vom Trubel der Stadt.",
        "Der Hof ist eingezäunt, mit Rasen, Grün und Olivenbäumen. Das Parken auf dem Grundstück ist kostenlos.",
      ],
    },
    contact: {
      kicker: "Kontakt",
      title: "Anfrage",
      intro: "Die Nachricht geht an die E-Mail des Eigentümers und dient nur der Anfrage zur Buchung dieser Villa.",
      personLabel: "Ansprechpartner",
      person: "Mihovil Smoljan",
      phoneLabel: "Telefon",
      phones,
      emailLabel: "E-Mail",
      email,
      languagesLabel: "Sprachen",
      languages: "Kroatisch, Englisch, Deutsch und Italienisch",
      form: {
        name: "Name",
        email: "E-Mail",
        phone: "Telefon",
        arrival: "Anreise",
        departure: "Abreise",
        message: "Anfrage",
        submit: "Anfrage senden",
        sending: "Wird gesendet…",
        sent: "Die Anfrage wurde gesendet.",
        error: "Die Anfrage wurde nicht gesendet. Bitte rufen Sie an oder schreiben Sie eine E-Mail.",
        privacy:
          "Das Formular wird direkt an die E-Mail des Eigentümers gesendet und nur für eine Buchungsanfrage zu dieser Villa verwendet.",
      },
    },
    footer: { rights: "Alle Rechte vorbehalten", place: "Vodnjan, Istrien" },
  },
  it: {
    meta: {
      title: "Villa Luxury Ulika, Vodnjan",
      description:
        "Villa Luxury Ulika ai margini di Vodnjan, in Istria: quattro camere, biblioteca, sauna finlandese, idromassaggio e piscina riscaldata 8 × 4 m in un giardino recintato.",
      ogAlt: "Veduta aerea della villa, della piscina e dei campi presso Vodnjan, in Istria",
    },
    skip: "Vai al contenuto",
    nav: {
      home: "Home",
      villa: "Villa",
      prices: "Prezzi",
      gallery: "Galleria",
      place: "Luogo",
      contact: "Contatto",
      book: "Richiesta",
      open: "Menu",
      close: "Chiudi menu",
    },
    hero: {
      eyebrow: "Vodnjan · Istria",
      title: "Villa Luxury Ulika",
      lead: "Una villa tranquilla ai margini di Vodnjan, tra gli olivi. Quattro camere, una biblioteca, sauna e idromassaggio privati e una piscina riscaldata nel giardino recintato.",
      primary: "Gli spazi",
      secondary: "Prezzi",
    },
    intro: {
      kicker: "La villa",
      title: "Pietra, olivi e un cortile quieto",
      paragraphs: [
        "Ai margini di Vodnjan, tra olivi e piante mediterranee, la villa è appartata dal movimento della città. Nella pietra e nei toni delle pareti stanno insieme il comfort contemporaneo e il carattere istriano.",
        "L'interno ampio, la zona wellness privata e lo spazio esterno recintato sono pensati per famiglie e amici che cercano un soggiorno più quieto.",
      ],
    },
    cards: [
      { href: "/villa-luxury-ulika#bedrooms", title: "Camere", text: "Quattro camere climatizzate, ciascuna con televisore." },
      { href: "/villa-luxury-ulika#kitchen", title: "Cucina", text: "Cucina attrezzata e tavolo per dieci." },
      { href: "/villa-luxury-ulika#library", title: "Biblioteca", text: "Due poltrone e scaffali, al piano superiore." },
      { href: "/villa-luxury-ulika#wellness", title: "Wellness", text: "Sauna finlandese, idromassaggio, lettini e doccia." },
      { href: "/villa-luxury-ulika#pool", title: "Piscina", text: "Piscina riscaldata 8 × 4 m nel giardino recintato." },
      { href: "/villa-luxury-ulika#pool", title: "Giardino", text: "Olivi, prato, terrazza e cucina estiva." },
      { href: "/villa-luxury-ulika#children", title: "Bambini", text: "Angolo giochi e attrezzatura per bebè su richiesta." },
      { href: "/villa-luxury-ulika#pool", title: "Arrivo", text: "Parcheggio privato e Tesla Wall Connector." },
    ],
    spaces: {
      kicker: "Spazi",
      title: "Com'è organizzata la villa",
      items: [
        {
          id: "bedrooms",
          title: "Camere e bagni",
          image: images.bedroom,
          imageAlt: "Camera con letto matrimoniale, testiera blu e tende",
          points: [
            "Quattro camere climatizzate, ciascuna con il proprio televisore.",
            "Al piano superiore ci sono due camere con letto matrimoniale. Ognuna ha una cabina armadio.",
            "Allo stesso piano c'è un bagno grande in comune.",
            "Al piano terra ci sono altre due camere: una con letto matrimoniale e una con due letti separati.",
            "Entrambe le camere al piano terra hanno il bagno privato.",
          ],
        },
        {
          id: "living",
          title: "Soggiorno",
          image: images.living,
          imageAlt: "Soggiorno con divani color petrolio, camino e finestre alte",
          points: [
            "Uno spazio per stare insieme.",
            "Un divano a tre posti, un divano a due posti e una poltrona.",
            "Un grande Smart TV e diffusori.",
          ],
        },
        {
          id: "kitchen",
          title: "Cucina e sala da pranzo",
          image: images.kitchen,
          imageAlt: "Sala da pranzo con tavolo in marmo e sedie color petrolio",
          points: [
            "Grande frigorifero a due ante con congelatore, piano cottura a gas, forno, microonde, lavastoviglie e lavatrice.",
            "Macchine per caffè filtro ed espresso, stoviglie, utensili per cucinare e per mangiare, bicchieri da vino e da champagne.",
            "Prodotti di base per la casa, attrezzatura per asciugare il bucato e un kit di pronto soccorso.",
            "Sala da pranzo con tavolo per dieci persone.",
            "In questa parte della villa c'è anche un bagno più piccolo per gli ospiti.",
          ],
        },
        {
          id: "library",
          title: "Biblioteca",
          image: images.library,
          imageAlt: "Biblioteca con scaffali e poltrone verdi",
          points: [
            "Al piano superiore, con due poltrone comode e scaffali di libri.",
            "Da qui si vedono il soggiorno e le finestre alte da cui entra la luce del giorno.",
          ],
        },
        {
          id: "wellness",
          title: "Zona wellness privata",
          image: images.wellness,
          imageAlt: "Zona wellness con lettini e vasca idromassaggio",
          points: [
            "Dentro la villa, solo per gli ospiti.",
            "Sauna finlandese, vasca idromassaggio, due lettini e una cabina doccia.",
            "Asciugamani e oli essenziali per la sauna.",
          ],
        },
        {
          id: "pool",
          title: "Piscina riscaldata e spazio esterno",
          image: images.pool,
          imageAlt: "Piscina esterna, lettini e la villa nel giardino recintato",
          points: [
            "Piscina privata 8 × 4 m in un cortile completamente recintato, con passaggio graduale fino a circa 1,5 m.",
            "Nell'elenco dei servizi è indicata come disponibile da maggio a settembre, aperta 24 ore, esterna e riscaldata, con telo di copertura.",
            "È riscaldata dal 1° maggio al 18 giugno e dall'11 settembre al 9 ottobre.",
            "La temperatura dell'acqua può variare di ±5 °C, secondo il tempo e l'uso corretto del telo.",
            "La piscina va coperta quando non è in uso.",
            "Accanto alla piscina: lettini, due ombrelloni, un tavolino e una doccia esterna.",
            "Terrazza coperta e cucina estiva con barbecue a gas e lavello.",
            "Una parte del cortile è prato. La proprietà è circondata da verde e olivi.",
            "Parcheggio privato e un Tesla Wall Connector per i veicoli elettrici.",
          ],
        },
        {
          id: "children",
          title: "Angolo per i più piccoli",
          points: [
            "Un angolo giochi: una cucina di legno con utensili, un supporto con rotolo di carta da disegno e pastelli, peluche, tappeti interattivi e piste di legno per macchinine e trenini.",
            "Ci sono anche altri giochi e attività, non elencati uno per uno.",
            "Per i bebè: lettino, vaschetta, sedia per la pappa e stoviglie per bambini.",
            "Lettino, sedia e vaschetta vanno richiesti. Sono fornite le lenzuola e sono inclusi nella prenotazione. La sedia è autoportante, con vassoio e cinture di sicurezza.",
          ],
        },
      ],
    },
    amenities: {
      kicker: "Elenco",
      title: "Che cosa c'è in villa",
      excludedNote: "Queste voci non fanno parte della dotazione.",
    },
    prices: {
      kicker: "Prezzi",
      title: "Importi giornalieri",
      description: "Importi giornalieri per Villa Luxury Ulika da novembre 2026 a dicembre 2027, in euro.",
      intro:
        "Ogni numero è l'importo giornaliero di quella data, in euro. I giorni senza numero nel listino restano vuoti: una barra nella tabella non è un prezzo 0. Il listino non dice che cosa è compreso nell'importo.",
      currency: "EUR",
      unavailable: "Non indicato",
      previous: "Mese precedente",
      next: "Mese successivo",
      month: "Mese",
      weekdays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    },
    booking: {
      title: "Prenotazione e pagamento",
      steps: [
        {
          title: "Acconto",
          text: "Per confermare la prenotazione si paga il 30% del prezzo intero in anticipo direttamente al proprietario e il 70% all'arrivo.",
        },
        {
          title: "Deposito",
          text: "Deposito rimborsabile se tutto è in ordine: 500 euro.",
        },
        {
          title: "Annullamento",
          text: "L'annullamento gratuito è possibile entro una settimana dalla prenotazione. L'eccezione è una prenotazione all'ultimo momento, due settimane prima dell'arrivo: allora il termine è di 48 ore.",
        },
        {
          title: "Arrivo e partenza",
          text: "L'ultimo giorno la casa si lascia entro le 9. Gli ospiti successivi possono entrare dalle 16.",
        },
        {
          title: "Animali",
          text: "Gli animali non sono ammessi nella proprietà.",
        },
        {
          title: "Dopo il pagamento",
          text: "Potete inviare una richiesta con il modulo, per e-mail o per telefono. Dopo il pagamento avvisateci, così confermiamo il pagamento e la prenotazione.",
        },
      ],
      methodsTitle: "Modi di pagamento",
      methods: ["Contanti all'arrivo", "Bonifico bancario", "Revolut", "PayPal"],
    },
    gallery: {
      kicker: "Galleria",
      title: "La villa e il cortile",
      intro: "Fotografie dalla galleria già esistente della villa.",
    },
    place: {
      kicker: "Luogo",
      title: "Ai margini di Vodnjan, in Istria",
      paragraphs: [
        "La villa è ai margini della quieta Vodnjan, in Istria. È circondata da olivi e piante mediterranee ed è appartata dal movimento della città.",
        "Il cortile è recintato, con prato, verde e olivi. Il parcheggio nella proprietà è gratuito.",
      ],
    },
    contact: {
      kicker: "Contatto",
      title: "Richiesta di soggiorno",
      intro: "Il messaggio arriva all'e-mail del proprietario e serve solo per una richiesta di prenotazione di questa villa.",
      personLabel: "Referente",
      person: "Mihovil Smoljan",
      phoneLabel: "Telefono",
      phones,
      emailLabel: "E-mail",
      email,
      languagesLabel: "Lingue",
      languages: "Croato, inglese, tedesco e italiano",
      form: {
        name: "Nome e cognome",
        email: "E-mail",
        phone: "Telefono",
        arrival: "Arrivo",
        departure: "Partenza",
        message: "Richiesta",
        submit: "Invia la richiesta",
        sending: "Invio…",
        sent: "La richiesta è stata inviata.",
        error: "La richiesta non è stata inviata. Chiamate o scrivete un'e-mail.",
        privacy:
          "Il modulo viene inviato direttamente all'e-mail del proprietario e si usa solo per una richiesta di prenotazione di questa villa.",
      },
    },
    footer: { rights: "Tutti i diritti riservati", place: "Vodnjan, Istria" },
  },
};

export function isLocale(value: string): value is Locale {
  return value === "hr" || value === "en" || value === "de" || value === "it";
}

export function getCopy(locale: string): Copy {
  const key: Locale = isLocale(locale) ? locale : "en";
  const bundle = bundles[key];
  return {
    ...bundle,
    amenities: {
      ...bundle.amenities,
      groups: amenitiesFor(key),
    },
  };
}
