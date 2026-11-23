type categorization = {
  value: string;
  title?: string;
};

type DataObject = {
  data: categorization[];
};

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

const capacity: Record<string, string> = {
  en: "8 persons",
  hr: "8 osoba",
  de: "8 Personen",
  it: "8 persone",
};

export const Categorization: categorization[] = [
  { value: "⭐⭐⭐⭐⭐" },
  { value: "8 persons" },
  // { value: "520 m²" },
  // { value: "2500 m²" },
];

const replaceCategorization = (data: categorization[], title: string[]) => {
  return data.map((location, index) => ({
    ...location,
    title: title[index],
  }));
};

// Define the data object
export const CategorizationDataEn: DataObject = {
  data: replaceCategorization(Categorization, enData.Categorization.title),
};

// You can also define a separate object for German translations if needed
export const CategorizationDataDE: DataObject = {
  data: replaceCategorization(Categorization, deData.Categorization.title),
};

export const CategorizationDataHR: DataObject = {
  data: replaceCategorization(Categorization, hrData.Categorization.title),
};

export const CategorizationDataIT: DataObject = {
  data: replaceCategorization(Categorization, itData.Categorization.title),
};

export const getCategorizationData = (language: string): DataObject => {
  const source =
    language === "de"
      ? CategorizationDataDE
      : language === "hr"
        ? CategorizationDataHR
        : language === "it"
          ? CategorizationDataIT
          : CategorizationDataEn;
  return {
    data: source.data.map((item, index) =>
      index === 1 ? { ...item, value: capacity[language] ?? capacity.en } : item
    ),
  };
};
