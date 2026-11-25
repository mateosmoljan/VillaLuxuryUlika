import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import "../brochure.css";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalitics";
import JsonLd from "@/components/site/JsonLd";
import Shell from "@/components/brochure/Shell";
import { siteUrl } from "@/lib/seo";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

const packs = { hr, en, de, it };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Villa Luxury Ulika",
  description:
    "Holiday home Villa Luxury Ulika in Vodnjan, Istria. Four bedrooms, a private pool, a Finnish sauna and a jacuzzi.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  generator: "Next.js",
  applicationName: "Accommodation Villa Luxury Ulika",
  referrer: "origin-when-cross-origin",
  keywords: ["Accommodation", "Villa Luxury Ulika", "Istria", "Croatia"],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    title: "Accommodation Villa Luxury Ulika - Istria",
    description:
      "Holiday home Villa Luxury Ulika in Vodnjan, Istria. Four bedrooms, a private pool, a Finnish sauna and a jacuzzi.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/assets/images/i/105.jpg`,
        alt: "Villa Luxury Ulika",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Villa Luxury Ulika – Istria",
    description:
      "Holiday home Villa Luxury Ulika in Vodnjan, Istria. Four bedrooms, a private pool, a Finnish sauna and a jacuzzi.",
    images: [`${siteUrl}/assets/images/i/105.jpg`],
  },
  authors: [
    { name: "Mateo Smoljan" },
    { name: "Mateo Smoljan", url: "https://boostweb.io" },
  ],
  creator: "Mateo Smoljan",
  publisher: "Mateo Smoljan",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = packs[locale === "hr" || locale === "de" || locale === "it" ? locale : "en"];
  const links = messages.Navigation.navlinks;
  return (
    <html lang={locale}>
      {process.env.NEXT_PUBLIC_MEASUREMENT_ID ? <GoogleAnalytics /> : null}
      <body>
        <JsonLd />
        <Shell
          locale={locale}
          inquiry={messages.Navigation.navLinksButton}
          nav={[
            { href: "/villa-luxury-ulika", label: links[0] },
            { href: "/photogallery", label: links[2] },
            { href: "/pricelist", label: links[1] },
            { href: "/surroundings", label: links[3] },
          ]}
          guides={[
            { href: "/guides/pool", label: messages.Villa_Features.card.title[41] },
            { href: "/guides/family", label: messages.Villa_Features.title9 },
          ]}
        >
          {children}
        </Shell>
      </body>
    </html>
  );
}
