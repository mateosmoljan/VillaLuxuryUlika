import { villaPhotoAlt } from "@/lib/photoAlt";
import { pageMetadata } from "@/lib/seo";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";
import type { Metadata } from "next";
const packs = { hr, en, de, it };
export function generateMetadata({ params }: { params: { locale: string } }): Metadata { return pageMetadata(params.locale, "photogallery"); }
export default function Gallery({ params }: { params: { locale: string } }) {
  const locale = params.locale === "hr" || params.locale === "de" || params.locale === "it" ? params.locale : "en";
  const messages = packs[locale];
  const shots = Array.from({ length: 140 }, (_, index) => index + 1).filter((id) => id !== 108 && id !== 109);
  return (
    <main id="main" className="sec wrap">
      <h1>{messages.Titles.Photogallery}</h1>
      <div className="bento gal">
        {shots.map((id) => (
          <a key={id} className="gi" href={`/assets/images/i/${id}.jpg`}>
            <img src={`/assets/images/i/${id}.jpg`} alt={villaPhotoAlt(locale, id)} width={640} height={427} loading="lazy" />
          </a>
        ))}
      </div>
    </main>
  );
}
