"use client";

import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import FullscreenButton from "../About/FullscreenButton";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useGlobalContext } from "./Photogalleries";
import { usePropertyGalleryContext } from "./ShowcaseGallery";
import { useShowcaseGallery2Context } from "./ShowcaseGallery2";
import { useGalleryContext } from "../PropertyGallery/PropertyGallery";
import { useFourGalleryContext } from "./FourGallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

type Props = {
  initIndex: number;
  library: { src: StaticImageData; alt: string }[];
};

function Gallery({ initIndex, library }: Props) {
  const { setFourGalleryContext } = useFourGalleryContext();
  const { setOpenIndex } = useGlobalContext();
  const { setOpenIndexPropertyGallery } = usePropertyGalleryContext();
  const { setOpenIndexShowcaseGallery2Context } = useShowcaseGallery2Context();
  const { setOpenGalleryContext } = useGalleryContext();
  const [currentSlide, setCurrentSlide] = useState<number>(initIndex);
  const totalImages = library.length;

  function handleClose() {
    if (document.body) {
      document.body.style.overflowY = "auto";
    }
    setOpenIndexPropertyGallery(false);
    setOpenIndex(false);
    setOpenIndexShowcaseGallery2Context(false);
    setOpenGalleryContext(false);
    setFourGalleryContext(false);
    if (document.fullscreenElement) document.exitFullscreen();
  }

  useEffect(() => {
    if (document.body) {
      document.body.style.overflowY = "hidden";
    }
  }, []);

  return (
    <section className="fixed !inset-0 w-screen !h-screen bg-black z-[1000] overflow-y-hidden">
      <div className="mx-auto w-full">
        <div className="flex justify-end mr-4 absolute w-full z-[100]">
          <div className="inline-block ml-auto">
            <div className="rounded-md bg-grey2 flex justify-end items-center gap-2 mt-6 m-4 landscape:mt-3 landscape:m-3 landscape:z-[10000] landscape:flex-col-reverse">
              <button className="fullscreen-button">
                <FullscreenButton />
              </button>
              <button
                onClick={() => handleClose()}
                className="text-white cursor-pointer p-2 close-button"
              >
                <RxCross2 className="text-2xl text-dark_blue_black hover:scale-150 transition-scale duration-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="h-screen flex items-center justify-center">
          <div className="w-screen m-auto landscape:m-0 relative">
            <div className="mx-auto z-50 flex justify-center landscape:inline-block mb-3 sm:mb-10">
              <div className="block text-white landscape:pl-3 landscape:pt-3 landscape:absolute landscape:inline-block landscape:top-0">
                {currentSlide + 1}/{totalImages}
              </div>
            </div>

            <Swiper
              modules={[Navigation, EffectFade]}
              effect="fade"
              navigation={{ nextEl: ".gallery-next", prevEl: ".gallery-prev" }}
              initialSlide={initIndex}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
              loop
            >
              {library.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="sm:container !flex !items-center !justify-center relative image_gallery m-auto overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={960}
                      height={540}
                      sizes="100vw"
                      placeholder="blur"
                      className="object-contain object-center h-[300px] sm:h-[750px] sm:min-h-[500px] sm:min-w-[700px] min-w-full m-auto"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="gallery-prev h-full absolute block top-0 text-4xl left-0 z-40">
              <div className="bg-grey2 sm:p-1 rounded-r-md sm:opacity-100 opacity-30">
                <IoIosArrowRoundBack className="text-black" />
              </div>
            </button>
            <button className="gallery-next h-full block absolute right-0 top-0 text-4xl z-10">
              <div className="bg-grey2 sm:p-1 rounded-l-md sm:opacity-100 opacity-30">
                <IoIosArrowRoundForward className="text-black" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Gallery;
