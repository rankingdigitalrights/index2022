/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off */
import React from "react";

import BoxPrompt from "./box-prompt";

interface NarrativeImageProps {
  src: string;
  title?: string;
  alt?: string;
}

const NarrativeImage = ({src, alt, title}: NarrativeImageProps) => {
  const image = require(`../../data/images/${src}?resize&sizes[]=400&sizes[]=800&sizes[]=1024&sizes[]=2048`);
  const imageWebp = require(`../../data/images/${src}?resize&webp&sizes[]=400&sizes[]=800&sizes[]=1024&sizes[]=2048&format=webp`);
  let description = alt;
  let readmore;

  if (alt) {
    const match = alt.match(/(.*)readmore: (.*)/);

    if (match) {
      description = match[1].trim();
      // eslint-disable-next-line prefer-destructuring
      readmore = match[2];
    }
  }

  return (
    <div className="flex flex-col justify-around items-center">
      <figure className="flex flex-col justify-around my-6">
        <picture>
          <source srcSet={imageWebp.srcSet} type="image/webp" />
          <source srcSet={image.srcSet} type="image/png" />
          <source srcSet={image.srcSet} type="image/jpg" />

          <img
            src={image.src}
            srcSet={image.srcSet}
            alt={description}
            title={title}
            width={image.width}
            sizes="(min-width: 640px) 400w, (min-width: 768px) 400w, (min-width: 1024px) 800w, (min-width: 1440px) 1024w, 100vw"
            loading="lazy"
          />
        </picture>
        <figcaption className="font-circular font-bold text-sm text-right mt-1">
          {title}
        </figcaption>
      </figure>

      {readmore && (
        <div className="w-full mb-6">
          <BoxPrompt
            className="w-full md:w-10/12 md:ml-auto"
            readmore={readmore}
          />
        </div>
      )}
    </div>
  );
};

export default NarrativeImage;
