/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off */
import React from "react";

interface NarrativeImageProps {
  src: string;
  title?: string;
  alt?: string;
}

const NarrativeImage = ({src, alt, title}: NarrativeImageProps) => {
  const image = require(`../../data/images/${src}?resize&sizes[]=400&sizes[]=800&sizes[]=1024&sizes[]=2048`);
  const imageWebp = require(`../../data/images/${src}?resize&webp&sizes[]=400&sizes[]=800&sizes[]=1024&sizes[]=2048&format=webp`);

  return (
    <div className="flex justify-around">
      <figure className="flex flex-col justify-around my-6">
        <picture>
          <source srcSet={imageWebp.srcSet} type="image/webp" />
          <source srcSet={image.srcSet} type="image/png" />
          <source srcSet={image.srcSet} type="image/jpg" />

          <img
            src={image.src}
            srcSet={image.srcSet}
            alt={alt}
            title={title}
            loading="lazy"
          />
        </picture>
        <figcaption className="font-circular font-bold text-sm text-right mt-1">
          {title}
        </figcaption>
      </figure>
    </div>
  );
};

export default NarrativeImage;
