import Crumbs from "@/components/site/Crumbs";
import InquiryBand from "@/components/site/InquiryBand";
import PhotoGrid from "@/components/site/PhotoGrid";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import { villaPhotoAlt } from "@/lib/photoAlt";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";

const packs = { hr, en, de, it };

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "photogallery");
}

export default function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const ui = getChrome(locale);
  const messages = packs[locale];
  const shots = Array.from({ length: 140 }, (_, index) => {
    const number = index + 1;
    const ext = number === 108 || number === 109 ? "jpeg" : "jpg";
    return { src: `/assets/images/i/${number}.${ext}`, alt: villaPhotoAlt(locale, number) };
  });
  return (
    <>
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Crumbs locale={locale} home={ui.crumbsHome} items={[{ label: messages.Navigation.navlinks[2] }]} />
      <h1 className="mt-4 font-display text-5xl text-olive-deep">{messages.Titles.Photogallery}</h1>
      <p className="mt-3 text-ink/70">{ui.enlarge}</p>
      <div className="mt-8">
        <PhotoGrid images={shots} chrome={ui} initial={24} moreLabel={messages.Buttons.Show_more} />
      </div>
    </div>
    <InquiryBand title={ui.bandTitle} text={ui.bandText} cta={ui.inquiry} />
    </>
  );
}
