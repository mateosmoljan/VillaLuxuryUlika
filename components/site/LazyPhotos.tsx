"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { Chrome } from "@/lib/site/chrome";

const PhotoGrid = dynamic(() => import("./PhotoGrid"), { ssr: false });

function Frame() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3" aria-hidden>
      <div className="col-span-2 aspect-[3/2] rounded-2xl bg-sand" />
      <div className="aspect-[3/2] rounded-2xl bg-sand" />
      <div className="aspect-[3/2] rounded-2xl bg-sand" />
      <div className="aspect-[3/2] rounded-2xl bg-sand" />
      <div className="aspect-[3/2] rounded-2xl bg-sand" />
    </div>
  );
}

export default function LazyPhotos({
  images,
  chrome,
}: {
  images: { src: string; alt: string }[];
  chrome: Chrome;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShow(true);
      },
      { rootMargin: "160px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{show ? <PhotoGrid images={images} chrome={chrome} /> : <Frame />}</div>;
}
