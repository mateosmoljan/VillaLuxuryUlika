import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyBar from "@/components/site/StickyBar";
import JsonLd from "@/components/site/JsonLd";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalitics";
import { getChrome } from "@/lib/site/chrome";
import { prepareLocale } from "@/lib/site/locale";
import { siteUrl } from "@/lib/seo";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: "600",
  display: "swap",
  variable: "--font-display",
  adjustFontFallback: true,
  preload: true,
});

const sans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true,
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return ["hr", "en", "de", "it"].map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const packs = { hr, en, de, it };

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const active = prepareLocale(locale);
  const messages = packs[active];
  const ui = getChrome(active);
  const measurementId = process.env.NEXT_PUBLIC_MEASUREMENT_ID;
  return (
    <html lang={active} className={`${display.variable} ${sans.variable}`}>
      <body className="bg-white pb-20 font-sans text-ink antialiased md:pb-0">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-olive focus:px-4 focus:py-2 focus:text-white"
        >
          {ui.menu}
        </a>
        <JsonLd />
        <Header
          locale={active}
          nav={messages.Navigation.navlinks}
          eyebrow="Vodnjan · Istra"
          inquiry={messages.Navigation.navLinksButton}
          menuLabel={ui.menu}
          closeLabel={ui.close}
        />
        <div id="content">{children}</div>
        <Footer
          year={messages.Footer.year}
          rights={messages.Footer.rights}
          pagesTitle={ui.pagesTitle}
          pages={[
            { href: "/villa-luxury-ulika", label: messages.Navigation.navlinks[0] },
            { href: "/photogallery", label: messages.Navigation.navlinks[2] },
            { href: "/pricelist", label: messages.Navigation.navlinks[1] },
            { href: "/surroundings", label: messages.Navigation.navlinks[3] },
            { href: "/contact", label: messages.Navigation.navlinks[4] },
          ]}
          guidesTitle={ui.guidesTitle}
          guides={[
            { href: "/guides/pool", label: ui.poolGuideTitle },
            { href: "/guides/family", label: messages.Villa_Features.title9 },
          ]}
          discoverTitle={messages.Footer.Discover.title}
          vodnjan={messages.Footer.Discover.list.Pula}
          guide={messages.Footer.Discover.list.Guide}
          contactTitle={messages.Footer.Contact_Us.title}
        />
        <StickyBar
          chrome={ui}
          phone={{ display: "+(385) 95 582 4729", href: "tel:+385955824729" }}
          email="villa-ulika-fivestars@gmail.com"
        />
        {measurementId ? <GoogleAnalytics /> : null}
      </body>
    </html>
  );
}
