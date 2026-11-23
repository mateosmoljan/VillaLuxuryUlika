type TitleData = {
  des: string;
};

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

// Define the data object
export const TitleDataEn: TitleData = {
  des: enData.About.des,
};

// You can also define a separate object for German translations if needed
export const TitleDataDE: TitleData = {
  des: deData.About.des,
};

export const TitleDataHR: TitleData = {
  des: hrData.About.des,
};

export const TitleDataIT: TitleData = {
  des: itData.About.des,
};

export const getAboutData = (language: string): TitleData => {
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
