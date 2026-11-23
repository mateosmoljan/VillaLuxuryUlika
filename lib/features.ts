import { StaticImageData } from "next/image";
import hairdryer from "@/public/assets/icons/hairdryer.png";
import hot_water from "@/public/assets/icons/hot-water.png";
import washer from "@/public/assets/icons/washer.png";
import essentials from "@/public/assets/icons/essentials.png";
import hangers from "@/public/assets/icons/hangers.png";
import bed_linens from "@/public/assets/icons/bed_linens.png";
import pillows_blankets from "@/public/assets/icons/pillows_blankets.png";
import darkening_shades from "@/public/assets/icons/darkening_shades.png";
import iron from "@/public/assets/icons/iron.png";
import television from "@/public/assets/icons/television.png";
import crib from "@/public/assets/icons/crib.png";
import books_toys from "@/public/assets/icons/books_toys.png";
import high_chair from "@/public/assets/icons/high-chair.png";
import outlet_covers from "@/public/assets/icons/outlet_cover.png";
import air_conditioner from "@/public/assets/icons/air_conditioner.png";
import indoor_fireplace from "@/public/assets/icons/indoor_fireplace.png";
import heating from "@/public/assets/icons/heating.png";
import fire_extinguisher from "@/public/assets/icons/fire-extinguisher.png";
import aid_kit from "@/public/assets/icons/aid_kit.png";
import wifi from "@/public/assets/icons/wifi.png";
import dishes from "@/public/assets/icons/dishes.png";
import kitchen from "@/public/assets/icons/kitchen.png";
import microwave from "@/public/assets/icons/microwave.png";
import refrigerator from "@/public/assets/icons/refrigerator.png";
import cooking_basics from "@/public/assets/icons/cooking_basics.png";
import dishwasher from "@/public/assets/icons/dishwasher.png";
import stove from "@/public/assets/icons/stove.png";
import oven from "@/public/assets/icons/oven.png";
import coffee_maker from "@/public/assets/icons/coffee_maker.png";
import grill from "@/public/assets/icons/grill.png";
import backyard from "@/public/assets/icons/backyard.png";
import parking from "@/public/assets/icons/parking.png";
import pool from "@/public/assets/icons/pool.png";
import smoking from "@/public/assets/icons/smoking.png";
import long_term_stays from "@/public/assets/icons/long_term_stays.png";
import key from "@/public/assets/icons/key.png";
import smoke_detektor from "@/public/assets/icons/smoke-detector.png";
import carbon from "@/public/assets/icons/carbon.png";

type features = {
  icon?: StaticImageData;
  icon_alt: string;
  titles?: string;
  des?: string;
};

type DataObject = {
  data: features[];
};

// Same order as Villa_Features.card.title in the locale files.
const featureIcons: (StaticImageData | undefined)[] = [
  // Spavaća soba
  bed_linens,
  pillows_blankets,
  hangers,
  darkening_shades,
  // Kupaonica
  hairdryer,
  hot_water,
  essentials,
  // Kuhinja i blagovaonica
  kitchen,
  refrigerator,
  undefined,
  microwave,
  cooking_basics,
  dishes,
  dishwasher,
  stove,
  oven,
  coffee_maker,
  undefined,
  undefined,
  grill,
  undefined,
  // Praonica
  undefined,
  undefined,
  washer,
  iron,
  // Zabava
  television,
  undefined,
  books_toys,
  undefined,
  // Internet i ured
  wifi,
  // Obitelj
  crib,
  books_toys,
  high_chair,
  dishes,
  undefined,
  outlet_covers,
  // Grijanje i hlađenje
  air_conditioner,
  indoor_fireplace,
  heating,
  // Vanjski prostor
  backyard,
  grill,
  pool,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  undefined,
  // Wellness zona
  undefined,
  undefined,
  // Parkiranje i sadržaji
  parking,
  undefined,
  key,
  // Usluge
  key,
  long_term_stays,
  smoking,
  // Sigurnost doma
  fire_extinguisher,
  aid_kit,
  undefined,
  // Nisu uključeni
  smoke_detektor,
  carbon,
];

export const Features: features[] = featureIcons.map((icon) => ({
  icon,
  icon_alt: "",
}));

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

const replaceFeaturesData = (
  data: features[],
  titles: string[],
  des: string[]
) => {
  return data.map((items, index) => ({
    ...items,
    icon_alt: titles[index],
    titles: titles[index],
    des: des[index],
  }));
};

export const FeaturesDataEn: DataObject = {
  data: replaceFeaturesData(
    Features,
    enData.Villa_Features.card.title,
    enData.Villa_Features.card.des
  ),
};

export const FeaturesDataDE: DataObject = {
  data: replaceFeaturesData(
    Features,
    deData.Villa_Features.card.title,
    deData.Villa_Features.card.des
  ),
};

export const FeaturesDataHR: DataObject = {
  data: replaceFeaturesData(
    Features,
    hrData.Villa_Features.card.title,
    hrData.Villa_Features.card.des
  ),
};

export const FeaturesDataIT: DataObject = {
  data: replaceFeaturesData(
    Features,
    itData.Villa_Features.card.title,
    itData.Villa_Features.card.des
  ),
};

export const getFeaturesData = (language: string): DataObject => {
  switch (language) {
    case "en":
      return FeaturesDataEn;
    case "de":
      return FeaturesDataDE;
    case "hr":
      return FeaturesDataHR;
    case "it":
      return FeaturesDataIT;
    default:
      return FeaturesDataEn;
  }
};
