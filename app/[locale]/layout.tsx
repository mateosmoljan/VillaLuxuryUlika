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
  title: "Villa Luxury Ulika",
  description:
    "Welcome to Villa Luxury Ulika, your luxurious accommodation in Istria. Experience breathtaking views, modern amenities, and personalized service. ⭐⭐⭐⭐⭐",
  icons: {
    icon: "/assets/images/logo.png",
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
      "Welcome to Villa Luxury Ulika, your luxurious accommodation in Istria. Experience breathtaking views, modern amenities, and personalized service. ⭐⭐⭐⭐⭐",
    url: "https://villaluxulika.com",
  },
  twitter: {
    card: "summary_large_image",
    // site: "@YourTwitterHandle",
    title: "Accommodation Villa Luxury Ulika - Istria",
    description:
      "Welcome to Villa Luxury Ulika, your luxurious accommodation in Istria. Experience breathtaking views, modern amenities, and personalized service. ⭐⭐⭐⭐⭐",
    images: [
      {
        url: "https://www.villaluxulika.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F42.07efe036.jpg&w=1920&q=75",
        alt: "",
      },
    ],
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
