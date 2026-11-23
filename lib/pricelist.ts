
type TitleData = {
  title?: string;
  subtitle?: string;
  };

  type DataObject = {
    data: TitleData[];
  };

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

const createTitle = (
  title: string, 
  subtitle: string
): TitleData => {
  return {
    title,
    subtitle
  };
};

// Define the data object
export const TitleDataEn: DataObject = {
  data: [createTitle(
    enData.Pricelist.title, 
    enData.Pricelist.subtitle
    )],
};

// You can also define a separate object for German translations if needed
export const TitleDataDE: DataObject = {
  data: [createTitle(
    deData.Pricelist.title, 
    deData.Pricelist.subtitle
  )],
};

export const TitleDataHR: DataObject = {
  data: [createTitle(
    hrData.Pricelist.title, 
    hrData.Pricelist.subtitle
  )],
};

export const TitleDataIT: DataObject = {
  data: [createTitle(
    itData.Pricelist.title, 
    itData.Pricelist.subtitle
    )],
};

export const getPricelistData = (language: string): DataObject => {
  switch (language) {
    case "en":
      return TitleDataEn;
    case "de":
      return TitleDataDE;
    case "hr":
      return TitleDataHR;
    case "it":
      return TitleDataIT;
    default:
      // Return default language if specified language is not found
      return TitleDataEn;
  }
};
