"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { MdKeyboardArrowDown } from "react-icons/md";
import { SwiperNavButtons } from "./SwiperNavButton";
import { getHeadSwiperLib } from "@/lib/HeadSwiperLib";
import { useLocale } from "next-intl";

export default function HeadSwiper() {
  const localeActive = useLocale();

  const pagination = {
    clickable: true,
  };

  const headSwiperLib = getHeadSwiperLib(localeActive);
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  return (
    <section className="block h-screen max-w-screen relative">
      <picture>
        <source media="(max-width: 767px)" srcSet="/hero/ulika-640.avif 640w, /hero/ulika-828.avif 828w" sizes="100vw" type="image/avif" />
        <source media="(max-width: 767px)" srcSet="/hero/ulika-640.webp 640w, /hero/ulika-828.webp 828w" sizes="100vw" type="image/webp" />
        <img
          src="/hero/ulika-828.webp"
          alt="Villa Luxury Ulika"
          width={828}
          height={552}
          fetchPriority="high"
          className={`absolute inset-0 h-full w-full object-cover ${live ? "z-0" : "z-20"}`}
        />
      </picture>
      <div className="block relative z-10 max-w-full head_swiper ">
        <Swiper
          loop={true}
          spaceBetween={0}
          modules={[FreeMode, Autoplay, Pagination]}
          autoplay={{
            delay: 10000,
            disableOnInteraction: true,
          }}
          pagination={pagination}
          grabCursor={true}
          speed={900}
        >
          {headSwiperLib.images.map((image, index) => (
            <SwiperSlide key={index} className="!h-screen">
              <div className="relative h-screen w-full flex items-center justify-center">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1920}
                  height={1080}
                  sizes="100vw"
                  placeholder="blur"
                  priority={index === 0}
                  className="object-cover block h-screen w-full"
                />
                <div className="left-1/20 right-1/20 md:left-auto md:right-auto md:mx-0 md:max-w-2xl z-20 absolute bottom-8 flex items-center justify-center flex-col bg-black bg-opacity-60 rounded-md p-8 gap-3">
                  <h1 className="text-white font-arbutus text-center text-3xl font-bold">
                    {image.title}
                  </h1>
                  <p className="text-white">{image.des}</p>
                  <a href="#about">
                    <button className="btn">
                      {image.button}{" "}
                      <MdKeyboardArrowDown className="text-2xl" />
                    </button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwiperNavButtons />
        </Swiper>
      </div>
    </section>
  );
}
