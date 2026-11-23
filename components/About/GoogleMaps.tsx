import { RxCross2 } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import IFrameMaps from "./iFrameMaps";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import hr from "@/messages/hr.json";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import it from "@/messages/it.json";

interface GoogleMapsProps {
  onClose: () => void;
}

function GoogleMaps({ onClose }: GoogleMapsProps) {
  const mapsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const title = (
    { hr, en, de, it }[locale] ?? en
  ).Map_Location.title;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mapsRef.current && !mapsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="flex justify-center fixed inset-0 items-center w-screen h-screen bg-black bg-opacity-50 z-50">
      <div
        ref={mapsRef}
        className="container px-3 flex flex-col h-[75%] bg-white rounded-md transitionMap"
      >
        <div className="flex justify-between py-3">
          <h2 className="font-bold text-xl">{title}</h2>
          <button onClick={onClose} className="text-xl">
            <RxCross2 />
          </button>
        </div>
        <div className="w-full h-full">
          <IFrameMaps />
        </div>
        <div className="py-3 flex justify-end">
          <button
            onClick={onClose}
            aria-label="Close Map"
            className="btn-2 flex gap-2"
          >
            Close <ImCross />
          </button>
        </div>
      </div>
    </section>
  );
}

export default GoogleMaps;
