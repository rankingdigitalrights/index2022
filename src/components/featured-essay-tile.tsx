import c from "clsx";
import React from "react";

import Image from "./image";

interface FeaturedEssayTileProps {
  title: string;
  subText?: string;
  href: string;
  src: string;
  className?: string;
}

const FeaturedEssayTile = ({
  title,
  subText,
  href,
  src,
  className,
}: FeaturedEssayTileProps) => {
  return (
    <div
      className={c(
        "flex flex-col space-y-2 group block hover-opacity",
        className,
      )}
    >
      <a href={href} className="flex flex-col space-y-6 text-black font-sans">
        <Image
          src={src}
          alt={title}
          alignment="center"
          className="aspect-video overflow-hidden md:h-72 pointer-events-none group-hover:opacity-75"
        />

        <span className="text-md leading-6">{title}</span>
      </a>
      {subText && (
        <p className="font-sans text-sm pointer-events-none">{subText}</p>
      )}
    </div>
  );
};

export default FeaturedEssayTile;
