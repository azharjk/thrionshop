import { NextPage } from "next";
import Image from "next/image";

interface HorizontalProductCardProps {
  src: string;
  alt: string;
  title: string;
  price_html: string;
}

const HorizontalProductCard: NextPage<HorizontalProductCardProps> = ({
  src,
  alt,
  title,
  price_html,
}) => {
  return (
    <div className="flex gap-3">
      <div>
        <Image
          loader={() => src}
          unoptimized
          src={src}
          width={100}
          height={100}
          alt={alt}
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <span>{title}</span>
        <div className="flex justify-end items-center gap-2">
          <span className="font-semibold text-lg">{price_html}</span>
          <span>&times;1</span>
        </div>
      </div>
    </div>
  );
};

export default HorizontalProductCard;
