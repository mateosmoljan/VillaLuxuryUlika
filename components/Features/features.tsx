"use client";
import { RxCross2 } from "react-icons/rx";
import { AmenityIcon } from "@/components/Amenities/AmenityIcon";
import { getFeaturesData } from "@/lib/features";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { getFeaturesTitleData } from "@/lib/features_titles";

type Props = {
  handleClose: () => void;
};

function FeaturesComponent({ handleClose }: Props) {
  const featuresRef = useRef<HTMLDivElement>(null);
  const localeActive = useLocale();
  const FeaturesData = getFeaturesData(localeActive);
  const FeaturesTitleData = getFeaturesTitleData(localeActive);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        featuresRef.current &&
        !featuresRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="bg-black/50 w-screen h-screen inset-0 fixed z-50 flex items-center justify-center">
      <div
        ref={featuresRef}
        className="flex flex-col justify-center items-end bg-white rounded-md h-[90%] w-[90%] md:w-[780px]"
      >
        <div className="flex p-3">
          <button
            onClick={() => handleClose()}
            className="text-white cursor-pointer p-2 close-button"
          >
            <RxCross2
              className=" text-2xl text-dark_blue_black hover:scale-150
                  transition-scale duration-300"
            />
          </button>
        </div>
        <div className="overflow-y-scroll h-[98%] w-full p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-titleBold text-2xl text-dark_blue_black mb-4">
              {FeaturesTitleData.data[0].title2}
            </h2>
            {(
              [
                ["title3", 0, 4],
                ["title4", 4, 7],
                ["title5", 7, 21],
                ["title6", 21, 25],
                ["title7", 25, 29],
                ["title8", 29, 30],
                ["title9", 30, 36],
                ["title10", 36, 39],
                ["title11", 39, 48],
                ["title12", 48, 50],
                ["title13", 50, 53],
                ["title14", 53, 56],
                ["title15", 56, 59],
                ["title16", 59, 61],
              ] as const
            ).map(([titleKey, from, to]) => (
              <div key={titleKey}>
                <h2 className="font-titleBold text-xl text-dark_blue_black mb-3">
                  {FeaturesTitleData.data[0][titleKey]}
                </h2>
                {FeaturesData.data.slice(from, to).map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-center border-b-[1px] border-[#e5e7eb]"
                  >
                    <AmenityIcon index={from + index} />
                    <li className="py-4 flex flex-col justify-center">
                      {item.titles}
                      <span className="text-sm text-grey">{item.des}</span>
                    </li>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesComponent;
