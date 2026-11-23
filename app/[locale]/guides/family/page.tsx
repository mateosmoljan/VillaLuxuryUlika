import Crumbs from "@/components/site/Crumbs";
import InquiryBand from "@/components/site/InquiryBand";
import { Link } from "@/navigation";
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
  return pageMetadata(params.locale, "family");
}

export default function FamilyGuide({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const ui = getChrome(locale);
  const features = messages.Villa_Features;
  const start = [4, 3, 14, 4, 4, 1].reduce((sum, size) => sum + size, 0);
  const items = features.card.title.slice(start, start + 6).map((name, offset) => ({
    name,
    note: features.card.des[start + offset],
  }));
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Crumbs locale={locale} home={ui.crumbsHome} items={[{ label: features.title9 }]} />
      <h1 className="mt-4 font-display text-5xl text-olive-deep">{features.title9}</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/80">{messages.Acommodation.card_des}</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.name} className="rounded-2xl bg-paper p-5">
            <h2 className="font-display text-2xl">{item.name}</h2>
            {item.note ? <p className="mt-2 text-sm text-ink/70">{item.note}</p> : null}
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <Link href="/villa-luxury-ulika" className="font-semibold text-olive">{messages.Navigation.navlinks[0]}</Link>
      </p>
      <InquiryBand title={ui.bandTitle} text={ui.bandText} cta={ui.inquiry} />
    </article>
  );
}
