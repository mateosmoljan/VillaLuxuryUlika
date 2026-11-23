import IFrameMaps from "@/components/About/iFrameMaps";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import Crumbs from "@/components/site/Crumbs";
import FaqList from "@/components/site/FaqList";
import InquiryBand from "@/components/site/InquiryBand";
import OwnerDescription from "@/components/site/OwnerDescription";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";

const packs = { hr, en, de, it };

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "contact");
}

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const ui = getChrome(locale);
  const steps = [messages.How_Reserve.steps.title, messages.How_Reserve.steps.title2, messages.How_Reserve.steps.title3];
  const stepText = [messages.How_Reserve.steps.des, messages.How_Reserve.steps.des2, messages.How_Reserve.steps.des3];
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Crumbs locale={locale} home={ui.crumbsHome} items={[{ label: messages.Navigation.navlinks[4] }]} />
      <h1 className="mt-4 font-display text-5xl text-olive-deep">{messages.Contact.title}</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <ContactInfo />
      </div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{messages.How_Reserve.title}</h2>
      <ol className="mt-4 grid gap-3 md:grid-cols-3">
        {steps.map((title, index) => (
          <li key={title} className="rounded-2xl bg-paper p-4">
            <h3 className="font-display text-2xl">{index + 1}. {title}</h3>
            <OwnerDescription id={`contact-step-${index}`} text={stepText[index]} moreLabel={messages.Buttons.Show_more} lessLabel={messages.Buttons.Show_less} />
          </li>
        ))}
      </ol>
      <div className="mt-10 h-[420px] overflow-hidden rounded-3xl">
        <IFrameMaps className="h-full" />
      </div>
      <h2 className="mt-12 font-display text-4xl text-olive-deep">{ui.faqTitle}</h2>
      <div className="mt-4"><FaqList items={ui.faqs} /></div>
    </div>
    <InquiryBand title={ui.bandTitle} text={ui.bandText} cta={messages.Navigation.navLinksButton} />
    </>
  );
}
