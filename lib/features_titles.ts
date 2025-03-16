type TitleData = {
  title?: string;
  title2?: string;
  title3?: string;
  title4?: string;
  title5?: string;
  title6?: string;
  title7?: string;
  title8?: string;
  title9?: string;
  title10?: string;
  title11?: string;
  title12?: string;
  title13?: string;
  title14?: string;
  button?: string;
};

type DataObject = {
  data: TitleData[];
};

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

const createFeaturesTitle = (
  title?: string,
  title2?: string,
  title3?: string,
  title4?: string,
  title5?: string,
  title6?: string,
  title7?: string,
  title8?: string,
  title9?: string,
  title10?: string,
  title11?: string,
  title12?: string,
  title13?: string,
  title14?: string,
  button?: string
): TitleData => {
  return {
    title,
    title2,
    title3,
    title4,
    title5,
    title6,
    title7,
    title8,
    title9,
    title10,
    title11,
    title12,
    title13,
    title14,
    button,
  };
};

// Define the data object
export const FeaturesDataEn: DataObject = {
  data: [
    createFeaturesTitle(
      enData.Villa_Features.title,
      enData.Villa_Features.title2,
      enData.Villa_Features.title3,
      enData.Villa_Features.title4,
      enData.Villa_Features.title5,
      enData.Villa_Features.title6,
      enData.Villa_Features.title7,
      enData.Villa_Features.title8,
      enData.Villa_Features.title9,
      enData.Villa_Features.title10,
      enData.Villa_Features.title11,
      enData.Villa_Features.title12,
      enData.Villa_Features.title13,
      enData.Villa_Features.title14,
      enData.Villa_Features.button
    ),
  ],
};

// You can also define a separate object for German translations if needed
export const FeaturesDataDE: DataObject = {
  data: [
    createFeaturesTitle(
      deData.Villa_Features.title,
      deData.Villa_Features.title2,
      deData.Villa_Features.title3,
      deData.Villa_Features.title4,
      deData.Villa_Features.title5,
      deData.Villa_Features.title6,
      deData.Villa_Features.title7,
      deData.Villa_Features.title8,
      deData.Villa_Features.title9,
      deData.Villa_Features.title10,
      deData.Villa_Features.title11,
      deData.Villa_Features.title12,
      deData.Villa_Features.title13,
      deData.Villa_Features.title14,
      deData.Villa_Features.button
    ),
  ],
};

export const FeaturesDataHR: DataObject = {
  data: [
    createFeaturesTitle(
      hrData.Villa_Features.title,
      hrData.Villa_Features.title2,
      hrData.Villa_Features.title3,
      hrData.Villa_Features.title4,
      hrData.Villa_Features.title5,
      hrData.Villa_Features.title6,
      hrData.Villa_Features.title7,
      hrData.Villa_Features.title8,
      hrData.Villa_Features.title9,
      hrData.Villa_Features.title10,
      hrData.Villa_Features.title11,
      hrData.Villa_Features.title12,
      hrData.Villa_Features.title13,
      hrData.Villa_Features.title14,
      hrData.Villa_Features.button
    ),
  ],
};

export const FeaturesDataIT: DataObject = {
  data: [
    createFeaturesTitle(
      itData.Villa_Features.title,
      itData.Villa_Features.title2,
      itData.Villa_Features.title3,
      itData.Villa_Features.title4,
      itData.Villa_Features.title5,
      itData.Villa_Features.title6,
      itData.Villa_Features.title7,
      itData.Villa_Features.title8,
      itData.Villa_Features.title9,
      itData.Villa_Features.title10,
      itData.Villa_Features.title11,
      itData.Villa_Features.title12,
      itData.Villa_Features.title13,
      itData.Villa_Features.title14,
      itData.Villa_Features.button
    ),
  ],
};

export const getFeaturesTitleData = (language: string): DataObject => {
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
      // Return default language if specified language is not found
      return FeaturesDataEn;
  }
};
