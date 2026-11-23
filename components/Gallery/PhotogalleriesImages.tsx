import { PropertyGalleryLib } from "@/lib/property_gallery";
import Image from "next/image";

type Props = {
  handleImageClick: (index: number) => void;
};

function PhotogalleriesImages({ handleImageClick }: Props) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PropertyGalleryLib.images.slice(0, 8).map((image, index) => (
        <div
          key={index}
          className="w-full h-full rounded-md opacity-0 translate-y-6 animate-[fadeInUp_.4s_ease_forwards]"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={546}
            height={364}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder="blur"
            className="cursor-pointer object-cover rounded-md block w-full h-full hover:opacity-90"
            onClick={() => handleImageClick(index)}
          />
        </div>
      ))}
    </div>
  );
}

export default PhotogalleriesImages;
