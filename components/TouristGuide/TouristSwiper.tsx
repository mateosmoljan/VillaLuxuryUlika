import Image, { StaticImageData } from "next/image";
import { Link } from "@/navigation";

type TouristItem = {
  src: StaticImageData;
  alt: string;
  image_title?: string;
  image_des?: string;
};

function TouristSwiper({ items }: { items: TouristItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.slice(0, 6).map((image, index) => (
        <div key={index} className="h-96 xl:h-80">
          <div className="relative h-full overflow-hidden rounded-md group">
            <Link href="/environs" className="flex items-center justify-center relative h-full">
              <Image
                src={image.src}
                alt={image.alt}
                width={512}
                height={342}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                placeholder="blur"
                className="object-cover h-full w-full rounded-md transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </Link>
            <div className="absolute inset-x-0 bottom-0 text-left p-4 z-10 flex flex-col gap-2">
              <h2
                className="text-white font-bold text-xl drop-shadow-xl"
                style={{ textShadow: "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em #B29600" }}
              >
                {image.image_title}
              </h2>
              <p
                className="text-white drop-shadow-xl"
                style={{ textShadow: "1px 1px 2px red, 0 0 1em blue, 0 0 0.2em #B29600" }}
              >
                {image.image_des}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TouristSwiper;
