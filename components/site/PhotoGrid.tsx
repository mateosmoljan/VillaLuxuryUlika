"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Chrome } from "@/lib/site/chrome";

type Shot = { src: string; alt: string };

export default function PhotoGrid({
  images,
  chrome,
  initial,
  moreLabel,
}: {
  images: Shot[];
  chrome: Chrome;
  initial?: number;
  moreLabel?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [shown, setShown] = useState(initial && initial < images.length ? initial : images.length);
  const visible = images.slice(0, shown);
  const current = index == null ? null : images[index];

  useEffect(() => {
    if (index == null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setIndex(null);
      if (event.key === "ArrowRight") setIndex((value) => (value == null ? value : (value + 1) % images.length));
      if (event.key === "ArrowLeft") setIndex((value) => (value == null ? value : (value - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        {visible.map((image, imageIndex) => (
          <li key={image.src} className={imageIndex === 0 ? "col-span-2 sm:col-span-2" : ""}>
            <button
              type="button"
              className="group relative z-0 block aspect-[3/2] w-full overflow-hidden rounded-2xl bg-sand text-left"
              onClick={() => setIndex(imageIndex)}
            >
              <Image src={image.src} alt={image.alt} fill sizes={imageIndex === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"} className="pointer-events-none object-cover transition duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100" quality={65} />
              <span className="sr-only">{chrome.enlarge}</span>
            </button>
          </li>
        ))}
      </ul>
      {shown < images.length && moreLabel ? (
        <button type="button" className="mt-4 rounded-full border border-olive px-5 py-3 text-sm font-semibold text-olive" onClick={() => setShown(images.length)}>
          {moreLabel}
        </button>
      ) : null}
      {current && index != null && (
        <dialog open className="lightbox fixed inset-0 z-50 m-0 flex h-full max-h-none w-full max-w-none items-center justify-center bg-ink p-4">
          <button type="button" className="absolute right-4 top-4 z-30 rounded-full bg-white px-4 py-2 text-sm font-semibold" onClick={() => setIndex(null)}>
            {chrome.closePhoto}
          </button>
          <button type="button" className="absolute left-3 z-30 rounded-full bg-white px-3 py-2 text-sm font-semibold md:left-6" onClick={() => setIndex((index - 1 + images.length) % images.length)}>
            {chrome.previousPhoto}
          </button>
          <figure className="relative z-10 h-[70vh] w-full max-w-5xl">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" quality={75} priority />
            <figcaption className="absolute inset-x-0 bottom-0 bg-ink/70 px-4 py-2 text-center text-sm text-white">{current.alt}</figcaption>
          </figure>
          <button type="button" className="absolute right-3 z-30 rounded-full bg-white px-3 py-2 text-sm font-semibold md:right-6" onClick={() => setIndex((index + 1) % images.length)}>
            {chrome.nextPhoto}
          </button>
        </dialog>
      )}
    </>
  );
}
