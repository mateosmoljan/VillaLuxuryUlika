type LocationData = {
  distance: number;
  place?: string;
  button?: string;
  title?: string;
};

type DataObject = {
  locations: LocationData[];
  // You can add more arrays or properties if needed
};

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

export const Distances: LocationData[] = [
  { distance: 7 },
  { distance: 7 },
  { distance: 0.5 },
  { distance: 1 },
  { distance: 1.2 },
  { distance: 2.1 },
  { distance: 2.1 },
  { distance: 1.5 },
  { distance: 2.6 },
  { distance: 1.5 },
  { distance: 0.7 },
  { distance: 17.9 },
];

const replaceDistances = (
  data: LocationData[],
  place: string[],
  button: string,
  title: string
) => {
  return data.map((location, index) => ({
    ...location,
    place: place[index],
    button: button,
    title: title,
  }));
};

// Define the data object
export const DistancesDataEn: DataObject = {
  locations: replaceDistances(
    Distances,
    enData.Distances.place,
    enData.Distances.button,
    enData.Distances.title
  ),
};

// You can also define a separate object for German translations if needed
export const DistancesDataDE: DataObject = {
  locations: replaceDistances(
    Distances,
    deData.Distances.place,
    deData.Distances.button,
    deData.Distances.title
  ),
};

export const DistancesDataHR: DataObject = {
  locations: replaceDistances(
    Distances,
    hrData.Distances.place,
    hrData.Distances.button,
    hrData.Distances.title
  ),
};

export const DistancesDataIT: DataObject = {
  locations: replaceDistances(
    Distances,
    itData.Distances.place,
    itData.Distances.button,
    itData.Distances.title
  ),
};

export const getDistancesData = (language: string): DataObject => {
  switch (language) {
    case "en":
      return DistancesDataEn;
    case "de":
      return DistancesDataDE;
    case "hr":
      return DistancesDataHR;
    case "it":
      return DistancesDataIT;
    default:
      // Return default language if specified language is not found
      return DistancesDataEn;
  }
};
