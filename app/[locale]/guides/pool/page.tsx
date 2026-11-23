import Crumbs from "@/components/site/Crumbs";
import InquiryBand from "@/components/site/InquiryBand";
import OwnerDescription from "@/components/site/OwnerDescription";
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
  return pageMetadata(params.locale, "pool");
}

function poolText(source: string) {
  const parts = source.split("\n\n");
  const index = parts.findIndex((part) => part.includes("8 × 4"));
  if (index < 0) return source;
  const heading = index > 0 && parts[index - 1].startsWith("**") ? parts[index - 1] : "";
  return [heading, parts[index]].filter(Boolean).join("\n\n");
}

export default function PoolGuide({ params }: { params: { locale: string } }) {
  const locale = prepareLocale(params.locale);
  const messages = packs[locale];
  const ui = getChrome(locale);
  const features = messages.Villa_Features;
  const start = [4, 3, 14, 4, 4, 1, 6, 3].reduce((sum, size) => sum + size, 0);
  const items = features.card.title.slice(start, start + 9).map((name, offset) => ({
    name,
    note: features.card.des[start + offset],
  }));
  return (
    <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Crumbs locale={locale} home={ui.crumbsHome} items={[{ label: ui.poolGuideTitle }]} />
      <h1 className="mt-4 font-display text-5xl text-olive-deep">{ui.poolGuideTitle}</h1>
      <div className="mt-6 max-w-3xl">
        <OwnerDescription id="pool-guide" text={poolText(messages.Villa_Description.des2)} moreLabel={messages.Buttons.Show_more} lessLabel={messages.Buttons.Show_less} />
      </div>
      <h2 className="mt-10 font-display text-3xl">{features.title11}</h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.name} className="rounded-2xl border border-sand px-4 py-3 text-sm">
            <span className="font-medium">{item.name}</span>
            {item.note ? <span className="mt-1 block text-ink/65">{item.note}</span> : null}
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
