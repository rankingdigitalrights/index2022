/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off */
import React from "react";

interface NarrativeImageProps {
  src: string;
  title?: string;
  alt?: string;
}

const NarrativeImage = ({src, alt, title}: NarrativeImageProps) => {
  const image = require(`../images/${src}?resize&sizes[]=300&sizes[]=600&sizes[]=1000`);
  const imageWebp = require(`../images/${src}?resize&webp&sizes[]=300&sizes[]=600&sizes[]=1000`);

  return (
    <div className="flex justify-around">
      <picture>
        <source srcSet={imageWebp.srcSet} type="image/webp" />
        <source srcSet={image.srcSet} type="image/png" />

        <img src={image.src} srcSet={image.srcSet} alt={alt} title={title} />
      </picture>
    </div>
  );
};

export default NarrativeImage;
