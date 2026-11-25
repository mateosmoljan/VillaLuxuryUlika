import {
  AirVent,
  AlarmSmoke,
  Armchair,
  Baby,
  Ban,
  Bath,
  BedDouble,
  Blinds,
  BookOpen,
  CalendarRange,
  CarFront,
  Circle,
  Coffee,
  CookingPot,
  Cross,
  CupSoda,
  Disc,
  DoorOpen,
  Droplets,
  Fence,
  FireExtinguisher,
  Flame,
  Handshake,
  Heater,
  Layers,
  Lock,
  Microwave,
  Plug,
  PlugZap,
  Puzzle,
  Refrigerator,
  Sandwich,
  Shield,
  Shirt,
  ShowerHead,
  Snowflake,
  Sofa,
  Sparkles,
  SprayCan,
  Sun,
  Table2,
  Thermometer,
  Trash2,
  Tv,
  Umbrella,
  Utensils,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  Wind,
  type LucideIcon,
} from "lucide-react";

/** Same order as Villa_Features.card.title in every locale. */
const ICONS: LucideIcon[] = [
  BedDouble, // posteljina
  Layers, // jastuci i deke
  Shirt, // vješalice
  Blinds, // zavjese
  Wind, // sušilo
  Droplets, // topla voda
  Sparkles, // osnovna oprema
  CookingPot, // kuhinja
  Refrigerator, // hladnjak
  Snowflake, // zamrzivač
  Microwave, // mikrovalna
  Utensils, // pribor za kuhanje
  UtensilsCrossed, // posuđe
  WashingMachine, // perilica posuđa
  Flame, // štednjak
  Heater, // pećnica
  Coffee, // kava
  CupSoda, // kuhalo za vodu
  Sandwich, // toster
  Flame, // roštilj pribor
  Trash2, // kompaktor
  SprayCan, // sredstva za čišćenje
  Wind, // stalak za sušenje
  WashingMachine, // perilica rublja
  Shirt, // glačalo
  Tv, // smart tv
  Table2, // stolni tenis
  BookOpen, // knjige
  Disc, // gramofon
  Wifi, // wifi
  Baby, // krevetić
  Puzzle, // igračke
  Armchair, // stolica za hranjenje
  Utensils, // dječje posuđe
  Bath, // kadica
  Plug, // utičnice
  AirVent, // klima
  Flame, // kamin
  Thermometer, // grijanje
  Fence, // dvorište
  Flame, // roštilj
  Waves, // bazen
  Sun, // ležaljke
  Umbrella, // suncobrani
  CookingPot, // ljetna kuhinja
  ShowerHead, // vanjski tuš
  Sofa, // vanjski namještaj
  UtensilsCrossed, // vanjski prostor za jelo
  Bath, // masažna kada
  Thermometer, // sauna
  CarFront, // parkiranje
  PlugZap, // punjač
  DoorOpen, // privatni ulaz
  Handshake, // domaćin
  CalendarRange, // dugi boravci
  Ban, // zabranjeno pušenje
  FireExtinguisher, // aparat
  Cross, // prva pomoć
  Lock, // sef
  AlarmSmoke, // detektor dima
  Shield, // detektor CO
];

export const AMENITY_ICON_NAMES = [
  "bed-double",
  "layers",
  "shirt",
  "blinds",
  "wind",
  "droplets",
  "sparkles",
  "cooking-pot",
  "refrigerator",
  "snowflake",
  "microwave",
  "utensils",
  "utensils-crossed",
  "washing-machine",
  "flame",
  "heater",
  "coffee",
  "cup-soda",
  "sandwich",
  "flame",
  "trash-2",
  "spray-can",
  "wind",
  "washing-machine",
  "shirt",
  "tv",
  "table-2",
  "book-open",
  "disc",
  "wifi",
  "baby",
  "puzzle",
  "armchair",
  "utensils",
  "bath",
  "plug",
  "air-vent",
  "flame",
  "thermometer",
  "fence",
  "flame",
  "waves",
  "sun",
  "umbrella",
  "cooking-pot",
  "shower-head",
  "sofa",
  "utensils-crossed",
  "bath",
  "thermometer",
  "car-front",
  "plug-zap",
  "door-open",
  "handshake",
  "calendar-range",
  "ban",
  "fire-extinguisher",
  "cross",
  "lock",
  "alarm-smoke",
  "shield",
] as const;

export function AmenityIcon({ index, className = "amenity-ico" }: { index: number; className?: string }) {
  const Icon = ICONS[index] ?? Circle;
  return <Icon className={className} size={22} strokeWidth={1.8} aria-hidden />;
}
