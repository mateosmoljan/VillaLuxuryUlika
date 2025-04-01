type ListType = {
  des: string;
  items: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
  des2: string;
};

type TitleData = {
  title?: string;
  subtitle?: string;
  list?: ListType;
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
  subtitle: string,
  list: ListType
): TitleData => {
  return {
    title,
    subtitle,
    list,
  };
};

// Define the data object
export const TitleDataEn: DataObject = {
  data: [
    createTitle(enData.Pricelist.title, enData.Pricelist.subtitle, {
      des: enData.Pricelist.list.des,
      items: enData.Pricelist.list.inner_list,
      des2: enData.Pricelist.list.des2,
    }),
  ],
};

export const TitleDataDE: DataObject = {
  data: [
    createTitle(deData.Pricelist.title, deData.Pricelist.subtitle, {
      des: deData.Pricelist.list.des,
      items: deData.Pricelist.list.inner_list,
      des2: deData.Pricelist.list.des2,
    }),
  ],
};

export const TitleDataHR: DataObject = {
  data: [
    createTitle(hrData.Pricelist.title, hrData.Pricelist.subtitle, {
      des: hrData.Pricelist.list.des,
      items: hrData.Pricelist.list.inner_list,
      des2: hrData.Pricelist.list.des2,
    }),
  ],
};

export const TitleDataIT: DataObject = {
  data: [
    createTitle(itData.Pricelist.title, itData.Pricelist.subtitle, {
      des: itData.Pricelist.list.des,
      items: itData.Pricelist.list.inner_list,
      des2: itData.Pricelist.list.des2,
    }),
  ],
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
