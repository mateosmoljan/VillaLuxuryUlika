import type { Locale } from "./gallery";

export type Chrome = {
  menu: string;
  close: string;
  inquiry: string;
  allPhotos: string;
  enlarge: string;
  closePhoto: string;
  previousPhoto: string;
  nextPhoto: string;
  whyTitle: string;
  photosTitle: string;
  priceKicker: string;
  lowestLabel: string;
  perNight: string;
  seePrices: string;
  guidesTitle: string;
  guidesLead: string;
  poolGuideTitle: string;
  poolGuideText: string;
  familyGuideTitle: string;
  familyGuideText: string;
  stepsTitle: string;
  faqTitle: string;
  locationTitle: string;
  mapButton: string;
  mapHint: string;
  mapTown: string;
  bandTitle: string;
  bandText: string;
  stickyCall: string;
  stickyEmail: string;
  crumbsHome: string;
  heroSearchTitle: string;
  arrival: string;
  departure: string;
  checkDates: string;
  trust: string[];
  facts: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
  estimateTitle: string;
  estimateHint: string;
  estimateNights: string;
  estimateTotal: string;
  estimateBlocked: string;
  estimateEmpty: string;
  closedLegend: string;
  blankLegend: string;
  openLegend: string;
  rulesTitle: string;
  surroundingsLead: string;
  noDistances: string;
};

const sharedFacts = {
  hr: [
    { value: "4", label: "spavaće sobe" },
    { value: "8×4 m", label: "privatni bazen" },
    { value: "10", label: "mjesta za stolom" },
  ],
  en: [
    { value: "4", label: "bedrooms" },
    { value: "8×4 m", label: "private pool" },
    { value: "10", label: "seats at the table" },
  ],
  de: [
    { value: "4", label: "Schlafzimmer" },
    { value: "8×4 m", label: "privater Pool" },
    { value: "10", label: "Plätze am Tisch" },
  ],
  it: [
    { value: "4", label: "camere" },
    { value: "8×4 m", label: "piscina privata" },
    { value: "10", label: "posti a tavola" },
  ],
};

export const chrome: Record<Locale, Chrome> = {
  hr: {
    menu: "Izbornik",
    close: "Zatvori",
    inquiry: "Pošalji upit",
    allPhotos: "Sve fotografije",
    enlarge: "Povećaj fotografiju",
    closePhoto: "Zatvori fotografiju",
    previousPhoto: "Prethodna",
    nextPhoto: "Sljedeća",
    whyTitle: "Zašto ova vila",
    photosTitle: "Fotografije",
    priceKicker: "Cjenik",
    lowestLabel: "Najniži navedeni dnevni iznos",
    perNight: "u cjeniku, u eurima",
    seePrices: "Otvori cjenik",
    guidesTitle: "Iz dokumenata",
    guidesLead: "Dva kratka vodiča iz onoga što je opisano za vilu.",
    poolGuideTitle: "Grijani bazen 8 × 4 m",
    poolGuideText: "Datumi grijanja, navlaka i ograđeno dvorište.",
    familyGuideTitle: "Kutak za djecu",
    familyGuideText: "Igraonica i oprema za bebe, dio na upit.",
    stepsTitle: "Kako rezervirati",
    faqTitle: "Česta pitanja",
    locationTitle: "Lokacija",
    mapButton: "Prikaži kartu Vodnjana",
    mapHint: "Karta se učitava tek na klik. To je grad, ne kućni broj.",
    mapTown: "Otvori Vodnjan na karti",
    bandTitle: "Slobodan termin?",
    bandText: "Upit ide na e-poštu koja je već navedena za ovu vilu.",
    stickyCall: "Nazovi",
    stickyEmail: "E-pošta",
    crumbsHome: "Početna",
    heroSearchTitle: "Upit za termin",
    arrival: "Dolazak",
    departure: "Odlazak",
    checkDates: "Nastavi na upit",
    trust: [
      "Upit ide izravno na e-poštu vlasnika smještaja.",
      "Domaćin dočekuje goste.",
      "Dvorište je privatno i u potpunosti ograđeno.",
    ],
    facts: sharedFacts.hr,
    faqs: [
      {
        q: "Koliko je spavaćih soba?",
        a: "Četiri klimatizirane sobe, svaka s televizorom. Na katu su dvije sobe s bračnim krevetima i zasebnom garderobom te velika zajednička kupaonica. U prizemlju su jedna soba s bračnim krevetom i jedna s dva odvojena kreveta, obje s vlastitom kupaonicom.",
      },
      {
        q: "Kakav je bazen?",
        a: "Privatni bazen 8 × 4 m u ograđenom dvorištu, s postupnim prijelazom do približno 1,5 m. U popisu pogodnosti naveden je kao dostupan od svibnja do rujna. Grijanje je od 1. svibnja do 18. lipnja i od 11. rujna do 9. listopada. Temperatura može odstupati ±5 °C. Bazen treba prekriti kada nije u upotrebi.",
      },
      {
        q: "Što je u wellness zoni?",
        a: "Finska sauna, jacuzzi, dvije ležaljke i tuš-kabina, samo za goste. Tu su ručnici i eterična ulja za saunu.",
      },
      {
        q: "Kako se rezervira i plaća?",
        a: "Za osiguranje rezervacije plaća se 30% pune cijene unaprijed izravno vlasniku, a 70% pri dolasku. Načini koji su već navedeni na stranici: gotovina po dolasku, bankovni prijenos, Revolut i PayPal.",
      },
      {
        q: "Ima li depozita i kako se otkazuje?",
        a: "Povratni depozit ako je sve u redu: 500 eura. Besplatno otkazivanje moguće je u roku od tjedan dana od rezervacije. Za rezervaciju u zadnji trenutak, dva tjedna prije dolaska, rok je 48 sati.",
      },
      {
        q: "Kada su dolazak i odlazak?",
        a: "Zadnjeg dana smještaj se napušta do 9 sati. Sljedeći gosti mogu ući od 16 sati.",
      },
      {
        q: "Jesu li dopušteni kućni ljubimci i pušenje?",
        a: "Kućni ljubimci nisu dopušteni. Pušenje je zabranjeno.",
      },
      {
        q: "Ima li parkiranja i punjača?",
        a: "Parkiranje na posjedu je besplatno. Punjač je razina 2, Tesla Wall Connector.",
      },
    ],
    estimateTitle: "Vaš termin",
    estimateHint: "Kliknite dolazak, zatim odlazak. Zbroj su dnevni iznosi iz cjenika za noći između ta dva datuma.",
    estimateNights: "noći",
    estimateTotal: "Zbroj navedenih iznosa",
    estimateBlocked: "U tom rasponu ima zatvoren dan ili dan bez iznosa, pa se zbroj ne može izračunati.",
    estimateEmpty: "Datum odlaska je prije noći u tom rasponu.",
    closedLegend: "Zatvoreno",
    blankLegend: "Bez iznosa",
    openLegend: "Naveden iznos",
    rulesTitle: "Uvjeti koji su već objavljeni",
    surroundingsLead: "Vila je na rubu Vodnjana, u Istri, među maslinama i mediteranskim biljem.",
    noDistances: "Udaljenosti, restorani i program događanja nisu navedeni u dokumentima vile, pa ih ovdje nema.",
  },
  en: {
    menu: "Menu",
    close: "Close",
    inquiry: "Send inquiry",
    allPhotos: "All photos",
    enlarge: "Enlarge photo",
    closePhoto: "Close photo",
    previousPhoto: "Previous",
    nextPhoto: "Next",
    whyTitle: "Why this villa",
    photosTitle: "Photographs",
    priceKicker: "Prices",
    lowestLabel: "Lowest listed daily amount",
    perNight: "in the price list, in euros",
    seePrices: "Open the price list",
    guidesTitle: "From the documents",
    guidesLead: "Two short guides taken from what is described for the villa.",
    poolGuideTitle: "Heated pool, 8 × 4 m",
    poolGuideText: "Heating dates, the cover, and the fenced garden.",
    familyGuideTitle: "A corner for children",
    familyGuideText: "Play corner and baby equipment, some of it on request.",
    stepsTitle: "How to book",
    faqTitle: "Questions",
    locationTitle: "Location",
    mapButton: "Show a map of Vodnjan",
    mapHint: "The map loads only after a click. It is the town, not a house number.",
    mapTown: "Open Vodnjan on the map",
    bandTitle: "Dates free?",
    bandText: "The inquiry goes to the email already published for this villa.",
    stickyCall: "Call",
    stickyEmail: "Email",
    crumbsHome: "Home",
    heroSearchTitle: "Ask about dates",
    arrival: "Arrival",
    departure: "Departure",
    checkDates: "Continue to the inquiry",
    trust: [
      "The inquiry goes straight to the owner’s published email.",
      "The host greets guests.",
      "The garden is private and fully fenced.",
    ],
    facts: sharedFacts.en,
    faqs: [
      {
        q: "How many bedrooms are there?",
        a: "Four air-conditioned bedrooms, each with a television. Upstairs: two rooms with double beds and their own walk-in wardrobes, plus a large shared bathroom. Downstairs: one room with a double bed and one with two separate beds, each with its own bathroom.",
      },
      {
        q: "What is the pool like?",
        a: "A private 8 × 4 m pool in a fenced garden, sloping to about 1.5 m. The amenity list says it is available from May to September. It is heated from 1 May to 18 June and from 11 September to 9 October. The temperature may vary by ±5 °C. Cover the pool when it is not in use.",
      },
      {
        q: "What is in the wellness area?",
        a: "A Finnish sauna, a hot tub, two loungers and a shower, for guests only, with towels and essential oils for the sauna.",
      },
      {
        q: "How do booking and payment work?",
        a: "To secure a reservation, 30% of the full price is paid in advance directly to the owner, and 70% on arrival. Methods already listed on the site: cash on arrival, bank transfer, Revolut and PayPal.",
      },
      {
        q: "Is there a deposit, and how does cancellation work?",
        a: "Refundable deposit if everything is in order: 500 euros. Free cancellation is possible within one week of booking. For a last-minute booking made two weeks before arrival, the deadline is 48 hours.",
      },
      {
        q: "When are arrival and departure?",
        a: "On the last day the house is vacated by 9:00. The next guests can enter from 16:00.",
      },
      {
        q: "Are pets and smoking allowed?",
        a: "Pets are not allowed. Smoking is not allowed.",
      },
      {
        q: "Is there parking and a charger?",
        a: "Parking on the property is free. The charger is Level 2, a Tesla Wall Connector.",
      },
    ],
    estimateTitle: "Your dates",
    estimateHint: "Click arrival, then departure. The total is the sum of listed daily amounts for the nights between those dates.",
    estimateNights: "nights",
    estimateTotal: "Sum of listed amounts",
    estimateBlocked: "That range includes a closed day or a day with no amount, so the sum cannot be calculated.",
    estimateEmpty: "The departure date does not leave a night in the range.",
    closedLegend: "Closed",
    blankLegend: "No amount",
    openLegend: "Amount listed",
    rulesTitle: "Rules already published",
    surroundingsLead: "The villa is on the edge of Vodnjan, in Istria, among olive trees and Mediterranean plants.",
    noDistances: "Distances, restaurants and event programmes are not in the villa documents, so they are not listed here.",
  },
  de: {
    menu: "Menü",
    close: "Schließen",
    inquiry: "Anfrage senden",
    allPhotos: "Alle Fotos",
    enlarge: "Foto vergrößern",
    closePhoto: "Foto schließen",
    previousPhoto: "Zurück",
    nextPhoto: "Weiter",
    whyTitle: "Warum diese Villa",
    photosTitle: "Fotografien",
    priceKicker: "Preise",
    lowestLabel: "Niedrigster genannter Tagesbetrag",
    perNight: "in der Preisliste, in Euro",
    seePrices: "Preisliste öffnen",
    guidesTitle: "Aus den Unterlagen",
    guidesLead: "Zwei kurze Hinweise aus dem, was für die Villa beschrieben ist.",
    poolGuideTitle: "Beheizter Pool, 8 × 4 m",
    poolGuideText: "Heiztage, Abdeckung und der eingezäunte Garten.",
    familyGuideTitle: "Ecke für Kinder",
    familyGuideText: "Spielecke und Babyausstattung, ein Teil auf Anfrage.",
    stepsTitle: "So wird reserviert",
    faqTitle: "Fragen",
    locationTitle: "Lage",
    mapButton: "Karte von Vodnjan zeigen",
    mapHint: "Die Karte lädt erst nach einem Klick. Sie zeigt den Ort, keine Hausnummer.",
    mapTown: "Vodnjan auf der Karte öffnen",
    bandTitle: "Termin frei?",
    bandText: "Die Anfrage geht an die E-Mail, die für diese Villa bereits genannt ist.",
    stickyCall: "Anrufen",
    stickyEmail: "E-Mail",
    crumbsHome: "Start",
    heroSearchTitle: "Nach einem Termin fragen",
    arrival: "Anreise",
    departure: "Abreise",
    checkDates: "Weiter zur Anfrage",
    trust: [
      "Die Anfrage geht direkt an die veröffentlichte E-Mail des Eigentümers.",
      "Der Gastgeber empfängt die Gäste.",
      "Der Garten ist privat und vollständig eingezäunt.",
    ],
    facts: sharedFacts.de,
    faqs: [
      {
        q: "Wie viele Schlafzimmer gibt es?",
        a: "Vier klimatisierte Zimmer, jedes mit Fernseher. Oben: zwei Zimmer mit Doppelbett und eigenem begehbarem Schrank sowie ein großes gemeinsames Bad. Unten: ein Zimmer mit Doppelbett und eines mit zwei getrennten Betten, beide mit eigenem Bad.",
      },
      {
        q: "Wie ist der Pool?",
        a: "Privater Pool, 8 × 4 m, im eingezäunten Garten, mit Übergang bis etwa 1,5 m. In der Liste: verfügbar von Mai bis September. Beheizt vom 1. Mai bis 18. Juni und vom 11. September bis 9. Oktober. Die Temperatur kann um ±5 °C abweichen. Den Pool abdecken, wenn er nicht benutzt wird.",
      },
      {
        q: "Was ist im Wellnessbereich?",
        a: "Finnische Sauna, Whirlpool, zwei Liegen und eine Dusche, nur für Gäste, mit Handtüchern und ätherischen Ölen für die Sauna.",
      },
      {
        q: "Wie funktionieren Reservierung und Zahlung?",
        a: "Zur Sicherung werden 30 % des vollen Preises im Voraus direkt an den Eigentümer gezahlt und 70 % bei der Ankunft. Bereits genannte Wege: bar bei Ankunft, Banküberweisung, Revolut und PayPal.",
      },
      {
        q: "Gibt es eine Kaution, und wie ist die Stornierung?",
        a: "Rückzahlbare Kaution, wenn alles in Ordnung ist: 500 Euro. Kostenlose Stornierung innerhalb einer Woche nach der Buchung. Bei einer Last-Minute-Buchung zwei Wochen vor der Anreise beträgt die Frist 48 Stunden.",
      },
      {
        q: "Wann sind Anreise und Abreise?",
        a: "Am letzten Tag wird das Haus bis 9 Uhr verlassen. Die nächsten Gäste können ab 16 Uhr hineingehen.",
      },
      {
        q: "Sind Haustiere und Rauchen erlaubt?",
        a: "Haustiere sind nicht erlaubt. Rauchen ist nicht erlaubt.",
      },
      {
        q: "Gibt es Parkplätze und eine Ladestation?",
        a: "Parken auf dem Grundstück ist kostenlos. Die Ladestation ist Level 2, ein Tesla Wall Connector.",
      },
    ],
    estimateTitle: "Ihr Termin",
    estimateHint: "Klicken Sie die Anreise, dann die Abreise. Die Summe sind die genannten Tagesbeträge der Nächte dazwischen.",
    estimateNights: "Nächte",
    estimateTotal: "Summe der genannten Beträge",
    estimateBlocked: "In dem Zeitraum liegt ein geschlossener Tag oder ein Tag ohne Betrag, daher gibt es keine Summe.",
    estimateEmpty: "Das Abreisedatum lässt keine Nacht in dem Zeitraum.",
    closedLegend: "Geschlossen",
    blankLegend: "Kein Betrag",
    openLegend: "Betrag genannt",
    rulesTitle: "Bereits veröffentlichte Bedingungen",
    surroundingsLead: "Die Villa liegt am Rand von Vodnjan in Istrien, zwischen Olivenbäumen und mediterranen Pflanzen.",
    noDistances: "Entfernungen, Restaurants und Veranstaltungen stehen nicht in den Unterlagen der Villa und fehlen deshalb hier.",
  },
  it: {
    menu: "Menu",
    close: "Chiudi",
    inquiry: "Invia una richiesta",
    allPhotos: "Tutte le foto",
    enlarge: "Ingrandisci la foto",
    closePhoto: "Chiudi la foto",
    previousPhoto: "Precedente",
    nextPhoto: "Successiva",
    whyTitle: "Perché questa villa",
    photosTitle: "Fotografie",
    priceKicker: "Prezzi",
    lowestLabel: "Importo giornaliero più basso indicato",
    perNight: "nel listino, in euro",
    seePrices: "Apri il listino",
    guidesTitle: "Dai documenti",
    guidesLead: "Due guide brevi prese da ciò che è descritto per la villa.",
    poolGuideTitle: "Piscina riscaldata, 8 × 4 m",
    poolGuideText: "Date di riscaldamento, telo e giardino recintato.",
    familyGuideTitle: "Angolo per i bambini",
    familyGuideText: "Angolo giochi e attrezzatura per bebè, in parte su richiesta.",
    stepsTitle: "Come prenotare",
    faqTitle: "Domande",
    locationTitle: "Luogo",
    mapButton: "Mostra la mappa di Vodnjan",
    mapHint: "La mappa si carica solo al clic. È il paese, non un numero civico.",
    mapTown: "Apri Vodnjan sulla mappa",
    bandTitle: "Date libere?",
    bandText: "La richiesta va all’e-mail già indicata per questa villa.",
    stickyCall: "Chiama",
    stickyEmail: "E-mail",
    crumbsHome: "Home",
    heroSearchTitle: "Chiedi delle date",
    arrival: "Arrivo",
    departure: "Partenza",
    checkDates: "Continua con la richiesta",
    trust: [
      "La richiesta va direttamente all’e-mail pubblicata del proprietario.",
      "L’host accoglie gli ospiti.",
      "Il giardino è privato e completamente recintato.",
    ],
    facts: sharedFacts.it,
    faqs: [
      {
        q: "Quante camere ci sono?",
        a: "Quattro camere climatizzate, ciascuna con televisore. Al piano superiore: due camere con letto matrimoniale e cabina armadio, più un bagno grande in comune. Al piano terra: una camera con letto matrimoniale e una con due letti separati, entrambe con bagno proprio.",
      },
      {
        q: "Com’è la piscina?",
        a: "Piscina privata 8 × 4 m nel giardino recintato, con passaggio fino a circa 1,5 m. Nell’elenco è disponibile da maggio a settembre. È riscaldata dal 1° maggio al 18 giugno e dall’11 settembre al 9 ottobre. La temperatura può variare di ±5 °C. Va coperta quando non è in uso.",
      },
      {
        q: "Che cosa c’è nella zona wellness?",
        a: "Sauna finlandese, idromassaggio, due lettini e una doccia, solo per gli ospiti, con asciugamani e oli essenziali per la sauna.",
      },
      {
        q: "Come funzionano prenotazione e pagamento?",
        a: "Per confermare si paga il 30% del prezzo intero in anticipo direttamente al proprietario e il 70% all’arrivo. Modi già indicati: contanti all’arrivo, bonifico, Revolut e PayPal.",
      },
      {
        q: "C’è un deposito e come si annulla?",
        a: "Deposito rimborsabile se tutto è in ordine: 500 euro. Annullamento gratuito entro una settimana dalla prenotazione. Per una prenotazione all’ultimo momento, due settimane prima dell’arrivo, il termine è di 48 ore.",
      },
      {
        q: "Quando sono arrivo e partenza?",
        a: "L’ultimo giorno la casa si lascia entro le 9. Gli ospiti successivi possono entrare dalle 16.",
      },
      {
        q: "Sono ammessi animali e fumo?",
        a: "Gli animali non sono ammessi. È vietato fumare.",
      },
      {
        q: "Ci sono parcheggio e ricarica?",
        a: "Il parcheggio nella proprietà è gratuito. La ricarica è di livello 2, Tesla Wall Connector.",
      },
    ],
    estimateTitle: "Le vostre date",
    estimateHint: "Cliccate l’arrivo, poi la partenza. Il totale è la somma degli importi giornalieri indicati per le notti in mezzo.",
    estimateNights: "notti",
    estimateTotal: "Somma degli importi indicati",
    estimateBlocked: "In quel periodo c’è un giorno chiuso o un giorno senza importo, quindi la somma non si può calcolare.",
    estimateEmpty: "La data di partenza non lascia una notte nel periodo.",
    closedLegend: "Chiuso",
    blankLegend: "Senza importo",
    openLegend: "Importo indicato",
    rulesTitle: "Condizioni già pubblicate",
    surroundingsLead: "La villa è ai margini di Vodnjan, in Istria, tra olivi e piante mediterranee.",
    noDistances: "Distanze, ristoranti e eventi non sono nei documenti della villa e quindi non compaiono qui.",
  },
};

export function getChrome(locale: string): Chrome {
  if (locale === "hr" || locale === "en" || locale === "de" || locale === "it") return chrome[locale];
  return chrome.en;
}
