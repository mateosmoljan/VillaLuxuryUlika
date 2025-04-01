import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Arbutus_Slab, Poppins } from "next/font/google";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Footer/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics/GoogleAnalitics";

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
  title: "House Lucia",
  description:
    "Welcome to House Lucia, your luxurious accommodation in Istria. Experience breathtaking views, modern amenities, and personalized service. ⭐⭐⭐⭐⭐",
  icons: {
    icon: "/assets/images/logo.png",
  },
  generator: "Next.js",
  applicationName: "Accommodation House Lucia",
  referrer: "origin-when-cross-origin",
  keywords: ["Accommodation", "House Lucia", "Istria", "Croatia"],
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1.0",
  openGraph: {
    type: "website",
    title: "Accommodation House Lucia - Istria",
    description:
      "Welcome to House Lucia, your luxurious accommodation in Istria. Experience breathtaking views, modern amenities, and personalized service. ⭐⭐⭐⭐⭐",
    url: "https://houselucia.hr",
  },
  twitter: {
    card: "summary_large_image",
    // site: "@YourTwitterHandle",
    title: "Accommodation House Lucia - Istria",
    description:
      "Welcome to House Lucia, your luxurious accommodation in Istria. Experience breathtaking views, modern amenities, and personalized service. ⭐⭐⭐⭐⭐",
    images: [
      {
        url: "https://www.houselucia.hr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F42.07efe036.jpg&w=1920&q=75",
        alt: "House Lucia",
      },
    ],
  },
  authors: [
    { name: "Boost Web" },
    { name: "Boost Web", url: "https://boostweb.io" },
  ],
  creator: "Boost Web",
  publisher: "Boost Web",
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
