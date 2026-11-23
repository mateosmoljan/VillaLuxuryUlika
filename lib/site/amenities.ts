import type { Locale } from "./gallery";

type Tr = Record<Locale, string>;

export type AmenityGroup = {
  id: string;
  title: string;
  notIncluded?: boolean;
  items: { name: string; note?: string }[];
};

const item = (name: Tr, note?: Tr) => ({ name, note });

const groups: {
  id: string;
  title: Tr;
  notIncluded?: boolean;
  items: { name: Tr; note?: Tr }[];
}[] = [
  {
    id: "bedroom",
    title: {
      hr: "Spavaća soba",
      en: "Bedroom",
      de: "Schlafzimmer",
      it: "Camera da letto",
    },
    items: [
      item({
        hr: "Posteljina",
        en: "Bed linen",
        de: "Bettwäsche",
        it: "Biancheria da letto",
      }),
      item({
        hr: "Dodatni jastuci i deke",
        en: "Extra pillows and blankets",
        de: "Zusätzliche Kissen und Decken",
        it: "Cuscini e coperte aggiuntivi",
      }),
      item({
        hr: "Vješalice",
        en: "Hangers",
        de: "Kleiderbügel",
        it: "Grucce",
      }),
      item({
        hr: "Zavjese za zamračivanje",
        en: "Blackout curtains",
        de: "Verdunkelungsvorhänge",
        it: "Tende oscuranti",
      }),
    ],
  },
  {
    id: "bathroom",
    title: { hr: "Kupaonica", en: "Bathroom", de: "Badezimmer", it: "Bagno" },
    items: [
      item({
        hr: "Sušilo za kosu",
        en: "Hair dryer",
        de: "Haartrockner",
        it: "Asciugacapelli",
      }),
      item({ hr: "Topla voda", en: "Hot water", de: "Warmwasser", it: "Acqua calda" }),
      item(
        {
          hr: "Osnovna oprema",
          en: "Essentials",
          de: "Grundausstattung",
          it: "Dotazione di base",
        },
        {
          hr: "Ručnici, sapun za ruke i toaletni papir",
          en: "Towels, hand soap and toilet paper",
          de: "Handtücher, Handseife und Toilettenpapier",
          it: "Asciugamani, sapone per le mani e carta igienica",
        }
      ),
    ],
  },
  {
    id: "kitchen",
    title: {
      hr: "Kuhinja i blagovaonica",
      en: "Kitchen and dining",
      de: "Küche und Essbereich",
      it: "Cucina e sala da pranzo",
    },
    items: [
      item({ hr: "Kuhinja", en: "Kitchen", de: "Küche", it: "Cucina" }),
      item({ hr: "Hladnjak", en: "Refrigerator", de: "Kühlschrank", it: "Frigorifero" }),
      item({ hr: "Zamrzivač", en: "Freezer", de: "Gefrierschrank", it: "Congelatore" }),
      item({
        hr: "Mikrovalna pećnica",
        en: "Microwave",
        de: "Mikrowelle",
        it: "Forno a microonde",
      }),
      item(
        {
          hr: "Osnovni pribor za kuhanje",
          en: "Basic cooking utensils",
          de: "Grundausstattung zum Kochen",
          it: "Utensili base per cucinare",
        },
        {
          hr: "Lonci i tave, ulje, sol i papar",
          en: "Pots and pans, oil, salt and pepper",
          de: "Töpfe und Pfannen, Öl, Salz und Pfeffer",
          it: "Pentole e padelle, olio, sale e pepe",
        }
      ),
      item(
        {
          hr: "Posuđe i pribor za jelo",
          en: "Tableware and cutlery",
          de: "Geschirr und Besteck",
          it: "Stoviglie e posate",
        },
        {
          hr: "Tanjuri, zdjele, šalice, pribor za jelo i drugi pribor",
          en: "Plates, bowls, cups, cutlery and other utensils",
          de: "Teller, Schüsseln, Tassen, Besteck und weiteres Geschirr",
          it: "Piatti, ciotole, tazze, posate e altri utensili",
        }
      ),
      item({
        hr: "Perilica posuđa",
        en: "Dishwasher",
        de: "Geschirrspüler",
        it: "Lavastoviglie",
      }),
      item(
        { hr: "Štednjak", en: "Stove", de: "Herd", it: "Piano cottura" },
        { hr: "Na plin.", en: "Gas.", de: "Gas.", it: "A gas." }
      ),
      item({ hr: "Pećnica", en: "Oven", de: "Backofen", it: "Forno" }),
      item(
        {
          hr: "Aparat za kavu",
          en: "Coffee maker",
          de: "Kaffeemaschine",
          it: "Macchina per il caffè",
        },
        {
          hr: "Aparat za espresso, aparat za filter kavu",
          en: "Espresso machine, filter coffee machine",
          de: "Espressomaschine, Filterkaffeemaschine",
          it: "Macchina per espresso, macchina per caffè filtro",
        }
      ),
      item({
        hr: "Kuhalo za vodu",
        en: "Kettle",
        de: "Wasserkocher",
        it: "Bollitore",
      }),
      item({ hr: "Toster", en: "Toaster", de: "Toaster", it: "Tostapane" }),
      item(
        {
          hr: "Pribor za roštilj",
          en: "Barbecue utensils",
          de: "Grillzubehör",
          it: "Utensili per il barbecue",
        },
        {
          hr: "Gorivo i pribor za pripremu hrane na roštilju",
          en: "Fuel and utensils for cooking on the barbecue",
          de: "Brennstoff und Zubehör für die Zubereitung auf dem Grill",
          it: "Combustibile e utensili per cucinare sul barbecue",
        }
      ),
      item({
        hr: "Kompaktor otpada za kućanstvo",
        en: "Household waste compactor",
        de: "Haushalts-Abfallpresse",
        it: "Compattatore di rifiuti domestico",
      }),
    ],
  },
  {
    id: "laundry",
    title: { hr: "Praonica", en: "Laundry", de: "Waschraum", it: "Lavanderia" },
    items: [
      item({
        hr: "Sredstva za čišćenje",
        en: "Cleaning products",
        de: "Reinigungsmittel",
        it: "Prodotti per la pulizia",
      }),
      item({
        hr: "Stalak za sušenje odjeće",
        en: "Clothes drying rack",
        de: "Wäscheständer",
        it: "Stendibiancheria",
      }),
      item({
        hr: "Perilica rublja",
        en: "Washing machine",
        de: "Waschmaschine",
        it: "Lavatrice",
      }),
      item({ hr: "Glačalo", en: "Iron", de: "Bügeleisen", it: "Ferro da stiro" }),
    ],
  },
  {
    id: "entertainment",
    title: { hr: "Zabava", en: "Entertainment", de: "Unterhaltung", it: "Svago" },
    items: [
      item({ hr: "Smart TV", en: "Smart TV", de: "Smart-TV", it: "Smart TV" }),
      item({
        hr: "Stol za stolni tenis",
        en: "Table tennis table",
        de: "Tischtennistisch",
        it: "Tavolo da ping pong",
      }),
      item({ hr: "Knjige", en: "Books", de: "Bücher", it: "Libri" }),
      item({
        hr: "Gramofon",
        en: "Record player",
        de: "Plattenspieler",
        it: "Giradischi",
      }),
    ],
  },
  {
    id: "internet",
    title: {
      hr: "Internet i ured",
      en: "Internet and office",
      de: "Internet und Arbeitsbereich",
      it: "Internet e spazio di lavoro",
    },
    items: [item({ hr: "Wifi", en: "Wi-Fi", de: "WLAN", it: "Wi-Fi" })],
  },
  {
    id: "family",
    title: { hr: "Obitelj", en: "Family", de: "Familie", it: "Famiglia" },
    items: [
      item(
        { hr: "Dječji krevetić", en: "Cot", de: "Kinderbett", it: "Lettino" },
        {
          hr: "Gosti moraju to zatražiti. Osigurane su plahte. Uključeno u rezervaciju.",
          en: "Guests must request it. Sheets are provided. Included in the reservation.",
          de: "Gäste müssen es anfragen. Bettlaken werden gestellt. In der Buchung enthalten.",
          it: "Gli ospiti devono richiederlo. Sono fornite le lenzuola. Incluso nella prenotazione.",
        }
      ),
      item({
        hr: "Dječje knjige i igračke",
        en: "Children's books and toys",
        de: "Kinderbücher und Spielzeug",
        it: "Libri e giocattoli per bambini",
      }),
      item(
        {
          hr: "Stolica za hranjenje",
          en: "Feeding chair",
          de: "Kinderessstuhl",
          it: "Sedia per la pappa",
        },
        {
          hr: "Samostojeća. Gosti moraju to zatražiti. Pladanj za hranu, sigurnosni pojasevi. Uključeno u rezervaciju.",
          en: "Freestanding. Guests must request it. Food tray and safety straps. Included in the reservation.",
          de: "Freistehend. Gäste müssen ihn anfragen. Tablett und Sicherheitsgurte. In der Buchung enthalten.",
          it: "Autoportante. Gli ospiti devono richiederla. Vassoio e cinture di sicurezza. Inclusa nella prenotazione.",
        }
      ),
      item({
        hr: "Dječje posuđe",
        en: "Children's tableware",
        de: "Kindergeschirr",
        it: "Stoviglie per bambini",
      }),
      item(
        {
          hr: "Kadica za bebe",
          en: "Baby bath",
          de: "Babybadewanne",
          it: "Vaschetta per il bagnetto",
        },
        {
          hr: "Gosti moraju to zatražiti. Osigurane su plahte. Uključeno u rezervaciju.",
          en: "Guests must request it. Sheets are provided. Included in the reservation.",
          de: "Gäste müssen sie anfragen. Bettlaken werden gestellt. In der Buchung enthalten.",
          it: "Gli ospiti devono richiederla. Sono fornite le lenzuola. Inclusa nella prenotazione.",
        }
      ),
      item({
        hr: "Poklopci utičnica",
        en: "Outlet covers",
        de: "Steckdosensicherungen",
        it: "Copriprese",
      }),
    ],
  },
  {
    id: "climate",
    title: {
      hr: "Grijanje i hlađenje",
      en: "Heating and cooling",
      de: "Heizung und Kühlung",
      it: "Riscaldamento e raffrescamento",
    },
    items: [
      item(
        {
          hr: "Klima uređaj",
          en: "Air conditioning",
          de: "Klimaanlage",
          it: "Climatizzatore",
        },
        {
          hr: "Sustav za rashlađivanje i kontrolu koncentracije vlage u unutarnjem prostoru",
          en: "System for cooling and for controlling humidity indoors",
          de: "System zum Kühlen und zur Regelung der Luftfeuchtigkeit im Innenraum",
          it: "Sistema per raffrescare e controllare l'umidità negli interni",
        }
      ),
      item({
        hr: "Unutarnji kamin",
        en: "Indoor fireplace",
        de: "Innenkamin",
        it: "Caminetto interno",
      }),
      item({
        hr: "Centralno grijanje",
        en: "Central heating",
        de: "Zentralheizung",
        it: "Riscaldamento centralizzato",
      }),
    ],
  },
  {
    id: "outdoor",
    title: {
      hr: "Vanjski prostor",
      en: "Outdoor space",
      de: "Außenbereich",
      it: "Spazio esterno",
    },
    items: [
      item(
        {
          hr: "Stražnje dvorište",
          en: "Back garden",
          de: "Hintergarten",
          it: "Giardino sul retro",
        },
        {
          hr: "Privatno. U potpunosti ograđeno.",
          en: "Private. Fully fenced.",
          de: "Privat. Vollständig eingezäunt.",
          it: "Privato. Completamente recintato.",
        }
      ),
      item(
        { hr: "Roštilj", en: "Barbecue", de: "Grill", it: "Barbecue" },
        { hr: "Na plin.", en: "Gas.", de: "Gas.", it: "A gas." }
      ),
      item(
        { hr: "Bazen", en: "Pool", de: "Pool", it: "Piscina" },
        {
          hr: "Privatno. Dostupno svibnja – rujna. Otvoreno 24 sata. Vanjski. Grijani. Navlaka za prekrivanje bazena.",
          en: "Private. Available May–September. Open 24 hours. Outdoor. Heated. Pool cover.",
          de: "Privat. Verfügbar von Mai bis September. 24 Stunden geöffnet. Draußen. Beheizt. Poolabdeckung.",
          it: "Privata. Disponibile da maggio a settembre. Aperta 24 ore. Esterna. Riscaldata. Telo di copertura.",
        }
      ),
      item({
        hr: "Ležaljke za sunčanje",
        en: "Sun loungers",
        de: "Sonnenliegen",
        it: "Lettini prendisole",
      }),
      item({
        hr: "Suncobrani",
        en: "Parasols",
        de: "Sonnenschirme",
        it: "Ombrelloni",
      }),
      item({
        hr: "Ljetna kuhinja",
        en: "Summer kitchen",
        de: "Sommerküche",
        it: "Cucina estiva",
      }),
      item({
        hr: "Vanjski tuš",
        en: "Outdoor shower",
        de: "Außendusche",
        it: "Doccia esterna",
      }),
      item({
        hr: "Vanjski namještaj",
        en: "Outdoor furniture",
        de: "Gartenmöbel",
        it: "Arredi da esterno",
      }),
      item({
        hr: "Vanjski prostor gdje gosti mogu jesti",
        en: "Outdoor space where guests can eat",
        de: "Außenbereich, in dem Gäste essen können",
        it: "Spazio esterno dove gli ospiti possono mangiare",
      }),
    ],
  },
  {
    id: "wellness",
    title: {
      hr: "Wellness zona",
      en: "Wellness area",
      de: "Wellnessbereich",
      it: "Zona wellness",
    },
    items: [
      item(
        {
          hr: "Masažna kada",
          en: "Hot tub",
          de: "Whirlpool",
          it: "Vasca idromassaggio",
        },
        {
          hr: "Privatno. Otvoreno 24 sata. Dostupno cijele godine.",
          en: "Private. Open 24 hours. Available all year.",
          de: "Privat. 24 Stunden geöffnet. Ganzjährig verfügbar.",
          it: "Privata. Aperta 24 ore. Disponibile tutto l'anno.",
        }
      ),
      item(
        { hr: "Sauna", en: "Sauna", de: "Sauna", it: "Sauna" },
        {
          hr: "Privatno. Finska sauna.",
          en: "Private. Finnish sauna.",
          de: "Privat. Finnische Sauna.",
          it: "Privata. Sauna finlandese.",
        }
      ),
    ],
  },
  {
    id: "parking",
    title: {
      hr: "Parkiranje i sadržaji",
      en: "Parking and facilities",
      de: "Parken und Einrichtungen",
      it: "Parcheggio e servizi",
    },
    items: [
      item({
        hr: "Besplatno parkiranje na posjedu",
        en: "Free parking on the property",
        de: "Kostenloses Parken auf dem Grundstück",
        it: "Parcheggio gratuito nella proprietà",
      }),
      item(
        {
          hr: "Punjač za električna vozila",
          en: "Electric vehicle charger",
          de: "Ladestation für Elektrofahrzeuge",
          it: "Ricarica per veicoli elettrici",
        },
        {
          hr: "Razina 2, Tesla Wall Connector",
          en: "Level 2, Tesla Wall Connector",
          de: "Level 2, Tesla Wall Connector",
          it: "Livello 2, Tesla Wall Connector",
        }
      ),
      item(
        {
          hr: "Privatni ulaz",
          en: "Private entrance",
          de: "Privater Eingang",
          it: "Ingresso privato",
        },
        {
          hr: "Ulaz koji je dostupan isključivo gostima",
          en: "An entrance available only to guests",
          de: "Ein Eingang, der ausschließlich Gästen zur Verfügung steht",
          it: "Un ingresso disponibile esclusivamente agli ospiti",
        }
      ),
    ],
  },
  {
    id: "services",
    title: { hr: "Usluge", en: "Services", de: "Leistungen", it: "Servizi" },
    items: [
      item({
        hr: "Domaćin vas dočekuje",
        en: "The host greets you",
        de: "Der Gastgeber empfängt Sie",
        it: "L'host vi accoglie",
      }),
      item(
        {
          hr: "Dopušteni dugoročni boravci",
          en: "Long stays allowed",
          de: "Langzeitaufenthalte erlaubt",
          it: "Soggiorni lunghi consentiti",
        },
        {
          hr: "Dopušten boravak od 28 dana ili duže",
          en: "Stays of 28 days or longer are allowed",
          de: "Aufenthalte von 28 Tagen oder länger sind erlaubt",
          it: "È consentito un soggiorno di 28 giorni o più",
        }
      ),
      item({
        hr: "Zabranjeno pušenje",
        en: "No smoking",
        de: "Rauchen verboten",
        it: "Vietato fumare",
      }),
    ],
  },
  {
    id: "safety",
    title: {
      hr: "Sigurnost doma",
      en: "Home safety",
      de: "Sicherheit im Haus",
      it: "Sicurezza della casa",
    },
    items: [
      item({
        hr: "Aparat za gašenje požara",
        en: "Fire extinguisher",
        de: "Feuerlöscher",
        it: "Estintore",
      }),
      item({
        hr: "Prva pomoć",
        en: "First aid",
        de: "Erste Hilfe",
        it: "Kit di pronto soccorso",
      }),
      item({ hr: "Sef", en: "Safe", de: "Safe", it: "Cassaforte" }),
    ],
  },
  {
    id: "excluded",
    notIncluded: true,
    title: {
      hr: "Nisu uključeni",
      en: "Not included",
      de: "Nicht enthalten",
      it: "Non inclusi",
    },
    items: [
      item({
        hr: "Detektor dima",
        en: "Smoke detector",
        de: "Rauchmelder",
        it: "Rilevatore di fumo",
      }),
      item({
        hr: "Detektor ugljikovog monoksida",
        en: "Carbon monoxide detector",
        de: "Kohlenmonoxidmelder",
        it: "Rilevatore di monossido di carbonio",
      }),
    ],
  },
];

export function amenitiesFor(locale: Locale): AmenityGroup[] {
  return groups.map((group) => ({
    id: group.id,
    title: group.title[locale],
    notIncluded: group.notIncluded,
    items: group.items.map((entry) => ({
      name: entry.name[locale],
      note: entry.note?.[locale],
    })),
  }));
}
