import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyBar from "@/components/site/StickyBar";
import JsonLd from "@/components/site/JsonLd";
import { getChrome } from "@/lib/site/chrome";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalitics";
import { prepareLocale } from "@/lib/site/locale";
import { pageMetadata, siteUrl } from "@/lib/site/seo";
import { getPublished } from "@/lib/store/publish";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true,
});

const sans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return ["hr", "en", "de", "it"].map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = prepareLocale(params.locale);
  const { copy } = await getPublished(locale);
  return {
    metadataBase: new URL(siteUrl),
    ...pageMetadata(locale, "", copy.meta.title, copy.meta.description),
    title: {
      default: copy.meta.title,
      template: "%s · Villa Luxury Ulika",
    },
    applicationName: "Villa Luxury Ulika",
    icons: { icon: "/assets/images/logo_fav.jpg" },
    authors: [{ name: "Mateo Smoljan" }],
    creator: "Mateo Smoljan",
    publisher: "Mateo Smoljan",
    formatDetection: { email: false, address: false, telephone: false },
  };
}

export default async function RootLayout({
  children,
  params: { locale: localeParam },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = prepareLocale(localeParam);
  const { copy } = await getPublished(locale);
  const ui = getChrome(locale);
  const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white pb-20 font-sans text-ink antialiased md:pb-0">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-olive focus:px-4 focus:py-2 focus:text-paper"
        >
          {copy.skip}
        </a>
        <Header
          locale={locale}
          nav={copy.nav}
          eyebrow={copy.hero.eyebrow}
          inquiry={ui.inquiry}
          menuLabel={ui.menu}
          closeLabel={ui.close}
        />
        <div id="content">{children}</div>
        <Footer copy={copy} />
        <StickyBar chrome={ui} phone={copy.contact.phones[0]} email={copy.contact.email} />
        <JsonLd locale={locale} copy={copy} />
        {measurementId ? <GoogleAnalytics /> : null}
      </body>
    </html>
  );
}
