import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Arbutus_Slab, Poppins } from "next/font/google";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalitics";
import JsonLd from "@/components/site/JsonLd";
import { siteUrl } from "@/lib/seo";

const arbutus = Arbutus_Slab({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-arbutus",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-poppins",
});

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
  return (
    <html lang={locale}>
      <GoogleAnalytics />
      <body
        className={`${poppins.variable} font-poppins ${arbutus.variable} font-arbutus`}
      >
        <JsonLd />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
