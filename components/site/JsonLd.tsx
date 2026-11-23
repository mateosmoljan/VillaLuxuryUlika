import { siteUrl } from "@/lib/seo";

const address = {
  "@type": "PostalAddress",
  addressLocality: "Vodnjan",
  addressRegion: "Istria",
  addressCountry: "HR",
};

const image = `${siteUrl}/assets/images/i/105.jpg`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "VacationRental",
      name: "Villa Luxury Ulika",
      url: siteUrl,
      image,
      address,
      telephone: "+385955824729",
    },
    {
      "@type": "LodgingBusiness",
      name: "Villa Luxury Ulika",
      url: siteUrl,
      image,
      address,
      telephone: "+385955824729",
    },
  ],
};

function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default JsonLd;
