import PhotoGrid from "@/components/site/PhotoGrid";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/seo";
import { villaPhotoAlt } from "@/lib/photoAlt";
import type { Metadata } from "next";

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  prepareLocale(params.locale);
  return pageMetadata(params.locale, "photogallery");
}

export default function GalleryPage({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const ui = getChrome(locale);
  const shots = Array.from({ length: 140 }, (_, index) => {
    const number = index + 1;
    const ext = number === 108 || number === 109 ? "jpeg" : "jpg";
    return { src: `/assets/images/i/${number}.${ext}`, alt: villaPhotoAlt(locale, number) };
  });
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl text-olive-deep">{ui.photosTitle}</h1>
      <p className="mt-3 text-ink/70">{ui.enlarge}</p>
      <div className="mt-8"><PhotoGrid images={shots} chrome={ui} /></div>
    </div>
  );
}
