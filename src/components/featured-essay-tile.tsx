import c from "clsx";
import React from "react";

import Image from "./image";

interface FeaturedEssayTileProps {
  title: string;
  href: string;
  src: string;
  className?: string;
}

const FeaturedEssayTile = ({
  title,
  href,
  src,
  className,
}: FeaturedEssayTileProps) => {
  return (
    <div className={c("flex flex-col space-y-6", className)}>
      <Image
        src={src}
        alt={title}
        className="aspect-ratio overflow-hidden md:h-72"
      />
      <a href={href} className="text-black font-sans">
        {title}
      </a>
    </div>
  );
};

export default FeaturedEssayTile;
