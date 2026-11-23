"use client";

import Image from "next/image";
import { PropertyGalleryLib } from "@/lib/property_gallery";
import { useLocale } from "next-intl";
import { getAccommodationData } from "@/lib/acommodation";

function PropertyCard() {
  const localeActive = useLocale();
  const AccommodationsData = getAccommodationData(localeActive);
  const heroImage = PropertyGalleryLib.images[0];

  return (
    <div className=" md:w-3/5 lg:w-1/2 shadow-md hover:shadow-xl custom_border rounded-md z-10 w-full overflow-hidden">
      <div className="flex relative items-center justify-center h-full w-full">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          width={559}
          height={320}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          className="object-cover block rounded-t-md h-60 w-full"
          priority={false}
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h2 className="font-black text-xl font-arbutus">
          {AccommodationsData.data[0].card_title}
        </h2>
        <p className="text-sm">{AccommodationsData.data[0].card_des}</p>
        <p className="text-sm">
          {AccommodationsData.data[0].card_des2}{" "}
          <span className="font-bold text-yellow text-xl">220 €</span>{" "}
          {AccommodationsData.data[0].card_des3}
        </p>
      </div>
    </div>
  );
}

export default PropertyCard;
