import InquiryForm from "@/components/site/InquiryForm";
import FaqList from "@/components/site/FaqList";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return pageMetadata(locale, "/contact", copy.contact.title, copy.contact.intro);
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams?: { arrival?: string; departure?: string };
}) {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  const ui = getChrome(locale);
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-olive">{copy.contact.kicker}</p>
        <h1 className="mt-2 font-display text-5xl text-ink">{copy.contact.title}</h1>
        <p className="mt-4 leading-relaxed text-ink/80">{copy.contact.intro}</p>
        <dl className="mt-8 space-y-4 text-ink">
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink/50">{copy.contact.personLabel}</dt>
            <dd className="mt-1">{copy.contact.person}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink/50">{copy.contact.phoneLabel}</dt>
            {copy.contact.phones.map((phone) => (
              <dd key={phone.href}>
                <a href={phone.href} className="underline decoration-sand underline-offset-4">
                  {phone.display}
                </a>
              </dd>
            ))}
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink/50">{copy.contact.emailLabel}</dt>
            <dd>
              <a
                href={`mailto:${copy.contact.email}`}
                className="underline decoration-sand underline-offset-4"
              >
                {copy.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink/50">{copy.contact.languagesLabel}</dt>
            <dd>{copy.contact.languages}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-ink/50">{copy.place.kicker}</dt>
            <dd>{copy.footer.place}</dd>
          </div>
        </dl>
      </div>
      <InquiryForm copy={copy} arrival={searchParams?.arrival} departure={searchParams?.departure} />
      <div className="lg:col-span-2">
        <h2 className="font-display text-3xl">{ui.faqTitle}</h2>
        <div className="mt-4">
          <FaqList items={ui.faqs.slice(3, 7)} />
        </div>
      </div>
    </div>
  );
}
