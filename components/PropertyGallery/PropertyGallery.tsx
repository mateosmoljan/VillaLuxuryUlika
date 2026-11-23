"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import "./style.css";

import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper/modules";
import Image from "next/image";
import { PropertyGalleryLib } from "@/lib/property_gallery";
import { SwiperNavButtons } from "./SwiperNavButton";
import Loading from "../Loading/Loading";
import Gallery from "../Gallery/Gallery";

export type AppContextType = {
  openGalleryContext: boolean;
  setOpenGalleryContext: (_value: boolean) => void;
};

export const AppContext = createContext<AppContextType>({
  openGalleryContext: false,
  setOpenGalleryContext: (_value: boolean) => {},
});

export const useGalleryContext = () => useContext(AppContext);

export default function PropertyGallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openGalleryContext, setOpenGalleryContext] = useState<boolean>(false);

  const handleImageClick = (index: number) => {
    setOpenGalleryContext(true);
    setActiveIndex(index);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="pb-12">
      <AppContext.Provider
        value={{
          openGalleryContext,
          setOpenGalleryContext,
        }}
      >
        {isLoaded ? (
          <div className="PropertyGalleryDiv">
            <Swiper
              effect={"fade"}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, EffectFade]}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="PropertySwiper !overflow-visible "
            >
              {PropertyGalleryLib.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center w-full h-full cursor-pointer">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={748}
                      height={470}
                      placeholder="blur"
                      priority
                      className="object-cover block rounded-md max-w-full aspect-[748/470]"
                      onClick={() => handleImageClick(index)}
                    />
                  </div>
                </SwiperSlide>
              ))}
              <SwiperNavButtons />
            </Swiper>
            {openGalleryContext && (
              <Gallery
                library={PropertyGalleryLib.images}
                initIndex={activeIndex}
              />
            )}
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={0}
              grabCursor
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className={`PropertySWiperThumbnail ${
                openGalleryContext ? "hidden" : ""
              }`}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {PropertyGalleryLib.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className={`flex items-center justify-center `}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={150}
                      height={100}
                      placeholder="blur"
                      className={` border-4${
                        activeIndex == index ? " border-4 !border-yellow" : ""
                      } border-transparent object-cover block rounded-md aspect-[15/10] max-w-full`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <Loading />
        )}
      </AppContext.Provider>
    </div>
  );
}
