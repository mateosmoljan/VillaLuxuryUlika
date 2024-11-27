import { PropertyGalleryLib } from "@/lib/property_gallery";
import Image from "next/image";
import { motion } from "framer-motion";

type Props = {
  handleImageClick: (index: number) => void;
};

function PhotogalleriesImages({ handleImageClick }: Props) {
  const fadeIn = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * index,
      },
    }),
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {PropertyGalleryLib.images.slice(0, 8).map((image, index) => (
        <motion.div
          key={index}
          className="w-full h-full rounded-md"
          variants={fadeIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={546}
            height={364}
            placeholder="blur"
            className="overflow-hidden cursor-pointer object-cover rounded-md block w-full h-full hover:opacity-90"
            onClick={() => handleImageClick(index)}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default PhotogalleriesImages;
