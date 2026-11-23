import About from "@/components/About/About";
import HeadSwiper from "@/components/HeadSwiper/HeadSwiper";
import SendMessage from "@/components/SendMessage/SendMessage";
import React from "react";
import NavPath from "@/components/NavPath/NavPath";
import { buildPageMetadata, getLodgingBusinessJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Distances = dynamic(() => import("@/components/About/Distances"), {
  ssr: false,
  loading: () => <section className="py-10" />,
});

const Acommodation = dynamic(() => import("@/components/Accommodations/Accommodation"), {
  ssr: false,
  loading: () => <section className="py-10 bg-gray-100" />,
});

const Photogalleries = dynamic(() => import("@/components/Gallery/Photogalleries"), {
  ssr: false,
  loading: () => <section className="py-10" />,
});

const TouristGuide = dynamic(() => import("@/components/TouristGuide/TouristGuide"), {
  ssr: false,
  loading: () => <section className="py-10 bg-gray-100" />,
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(locale, "/");
}

function Home({ params: { locale } }: { params: { locale: string } }) {
  const jsonLd = getLodgingBusinessJsonLd(locale);

  return (
    <div>
      <link
        rel="preload"
        as="image"
        imageSrcSet="/hero/ulika-640.avif 640w, /hero/ulika-828.avif 828w"
        imageSizes="100vw"
        type="image/avif"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <HeadSwiper />
      <main>
        <h1 className="sr-only">Villa Luxury Ulika</h1>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <NavPath homePage={true} />
        <About />
        <Distances />
        <Acommodation />
        <Photogalleries />
        <TouristGuide />
        <div className="mb-24">
          <SendMessage />
        </div>
      </main>
    </div>
  );
}

export default Home;
