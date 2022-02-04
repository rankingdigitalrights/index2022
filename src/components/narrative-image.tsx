/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off */
import c from "clsx";
import React from "react";

import BoxPrompt from "./box-prompt";

interface NarrativeImageProps {
  src: string;
  title?: string;
  alt?: string;
}

const NarrativeImage = ({src, alt, title}: NarrativeImageProps) => {
  const image = require(`../../data/images/${src}?resize&sizes[]=400&sizes[]=750&sizes[]=1500`);
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
      <figure className={c("flex flex-col justify-around my-6")}>
        <picture>
          <source srcSet={image.srcSet} type="image/png" />
          <source srcSet={image.srcSet} type="image/jpg" />

          <img
            className="mx-auto"
            src={image.src}
            srcSet={image.srcSet}
            alt={description}
            title={title}
            sizes="(min-width: 320px) 400w, (min-width: 640px) 750w, 100vw"
            loading="lazy"
          />
        </picture>
        <figcaption className="font-circular text-sm mt-2">{title}</figcaption>
      </figure>

      {readmore && (
        <div className="mt-6 mb-12 ml-auto">
          <BoxPrompt className="w-auto" readmore={readmore} />
        </div>
      )}
    </div>
  );
};

export default NarrativeImage;
