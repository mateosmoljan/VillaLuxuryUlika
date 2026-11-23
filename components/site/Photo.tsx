import Image from "next/image";

type PhotoProps = {
  src: string;
  alt: string;
  priority?: boolean;
  sizes: string;
  className?: string;
};

export default function Photo({ src, alt, priority, sizes, className = "" }: PhotoProps) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={70}
        className="object-cover"
      />
    </div>
  );
}
