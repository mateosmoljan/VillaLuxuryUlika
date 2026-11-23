import type { Copy, Locale } from "@/lib/site/copy";
import { siteUrl } from "@/lib/site/seo";

export default function JsonLd({ locale, copy }: { locale: Locale; copy: Copy }) {
  const amenities = copy.amenities.groups
    .filter((group) => !group.notIncluded)
    .flatMap((group) => group.items.map((item) => item.name));

  const data = {
    "@context": "https://schema.org",
    "@type": ["VacationRental", "LodgingBusiness"],
    name: "Villa Luxury Ulika",
    description: copy.meta.description,
    url: `${siteUrl}/${locale}`,
    image: [
      `${siteUrl}/og/villa.jpg`,
      `${siteUrl}/assets/images/i/76.jpg`,
      `${siteUrl}/assets/images/i/42.jpg`,
      `${siteUrl}/assets/images/i/16.jpg`,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vodnjan",
      addressRegion: "Istra",
      addressCountry: "HR",
    },
    telephone: copy.contact.phones.map((phone) => phone.href.replace("tel:", "")),
    email: copy.contact.email,
    numberOfBedrooms: 4,
    petsAllowed: false,
    smokingAllowed: false,
    checkinTime: "16:00",
    checkoutTime: "09:00",
    availableLanguage: ["hr", "en", "de", "it"],
    amenityFeature: amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
