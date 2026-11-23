type TitleData = {
  title?: string;
  name?: string;
  email_form?: string;
  phone?: string;
  home?: string;
  adults?: string;
  children?: string;
  arrival?: string;
  departure?: string;
  message?: string;
  des?: string;
  button?: string;
  sent?: string;
  contact_person?: string;
  mobile?: string;
  email_info?: string;
  address?: string;
  we_speak?: string;
};

type DataObject = {
  data: TitleData[];
};

import enData from "@/messages/en.json";
import deData from "@/messages/de.json";
import hrData from "@/messages/hr.json";
import itData from "@/messages/it.json";

const createTitle = (
  title?: string,
  name?: string,
  email_form?: string,
  phone?: string,
  home?: string,
  adults?: string,
  children?: string,
  arrival?: string,
  departure?: string,
  message?: string,
  des?: string,
  button?: string,
  sent?: string,
  contact_person?: string,
  mobile?: string,
  email_info?: string,
  address?: string,
  we_speak?: string
): TitleData => {
  return {
    title,
    name,
    email_form,
    phone,
    home,
    adults,
    children,
    arrival,
    departure,
    message,
    des,
    button,
    sent,
    contact_person,
    mobile,
    email_info,
    address,
    we_speak,
  };
};

// Define the data object
export const TitleDataEn: DataObject = {
  data: [
    createTitle(
      enData.Contact.title,
      enData.Contact.Contact_Form.name,
      enData.Contact.Contact_Form.email,
      enData.Contact.Contact_Form.phone,
      enData.Contact.Contact_Form.home,
      enData.Contact.Contact_Form.adults,
      enData.Contact.Contact_Form.children,
      enData.Contact.Contact_Form.arrival,
      enData.Contact.Contact_Form.departure,
      enData.Contact.Contact_Form.message,
      enData.Contact.Contact_Form.des,
      enData.Contact.Contact_Form.button,
      enData.Contact.Contact_Form.sent,
      enData.Contact.Contact_Info.contact_person,
      enData.Contact.Contact_Info.mobile,
      enData.Contact.Contact_Info.email,
      enData.Contact.Contact_Info.address,
      enData.Contact.Contact_Info.we_speak
    ),
  ],
};

// You can also define a separate object for German translations if needed
export const TitleDataDE: DataObject = {
  data: [
    createTitle(
      deData.Contact.title,
      deData.Contact.Contact_Form.name,
      deData.Contact.Contact_Form.email,
      deData.Contact.Contact_Form.phone,
      deData.Contact.Contact_Form.message,
      deData.Contact.Contact_Form.des,
      deData.Contact.Contact_Form.button,
      deData.Contact.Contact_Form.sent,
      deData.Contact.Contact_Info.contact_person,
      deData.Contact.Contact_Info.mobile,
      deData.Contact.Contact_Info.email,
      deData.Contact.Contact_Info.address,
      deData.Contact.Contact_Info.we_speak
    ),
  ],
};

export const TitleDataHR: DataObject = {
  data: [
    createTitle(
      hrData.Contact.title,
      hrData.Contact.Contact_Form.name,
      hrData.Contact.Contact_Form.email,
      hrData.Contact.Contact_Form.phone,
      hrData.Contact.Contact_Form.message,
      hrData.Contact.Contact_Form.des,
      hrData.Contact.Contact_Form.button,
      hrData.Contact.Contact_Form.sent,
      hrData.Contact.Contact_Info.contact_person,
      hrData.Contact.Contact_Info.mobile,
      hrData.Contact.Contact_Info.email,
      hrData.Contact.Contact_Info.address,
      hrData.Contact.Contact_Info.we_speak
    ),
  ],
};

export const TitleDataIT: DataObject = {
  data: [
    createTitle(
      itData.Contact.title,
      itData.Contact.Contact_Form.name,
      itData.Contact.Contact_Form.email,
      itData.Contact.Contact_Form.phone,
      itData.Contact.Contact_Form.message,
      itData.Contact.Contact_Form.des,
      itData.Contact.Contact_Form.button,
      itData.Contact.Contact_Form.sent,
      itData.Contact.Contact_Info.contact_person,
      itData.Contact.Contact_Info.mobile,
      itData.Contact.Contact_Info.email,
      itData.Contact.Contact_Info.address,
      itData.Contact.Contact_Info.we_speak
    ),
  ],
};

export const getContactData = (language: string): DataObject => {
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
