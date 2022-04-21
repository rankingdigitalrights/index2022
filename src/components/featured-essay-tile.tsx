import Image from "next/image";
import React from "react";

interface FeaturedEssayTileProps {
  title: string;
  href: string;
  image: StaticImageData;
}

const FeaturedEssayTile = ({title, href, image}: FeaturedEssayTileProps) => {
  return (
    <a href={href} className="flex flex-col text-black font-sans space-y-6">
      <div className="h-32 overflow-hidden">
        <Image
          src={image}
          alt={title}
          placeholder="blur"
          className="object-cover"
        />
      </div>

      <span>{title}</span>
    </a>
  );
};

export default FeaturedEssayTile;
