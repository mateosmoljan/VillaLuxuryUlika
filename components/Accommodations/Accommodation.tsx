import { getAccommodationData } from "@/lib/acommodation";
import PropertyCard from "./PropertyCard";
import { useLocale } from "next-intl";

function Acommodation() {
  const localeActive = useLocale();
  const AccommodationsData = getAccommodationData(localeActive);
  return (
    <section className="bg-gray-100 py-10">
      <div className="container">
        <div className="w-6xl flex flex-col gap-3 pb-10">
          <h2 className="text-pink font-semibold uppercase tracking-widest">
            {AccommodationsData.data[0].subtitle}
          </h2>
          <h1 className="font-bold text-2xl sm:text-3xl text-dark_blue_black">
            {AccommodationsData.data[0].title}
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <PropertyCard />
        </div>
      </div>
    </section>
  );
}

export default Acommodation;
