/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off */
import c from "clsx";
import React from "react";
import {useInView} from "react-intersection-observer";

// import {useBreakpointSize} from "../hooks";
import BoxPrompt from "./box-prompt";

interface NarrativeImageProps {
  src: string;
  title?: string;
  alt?: string;
}

const NarrativeImage = ({src, alt, title}: NarrativeImageProps) => {
  const [ioHook, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  // FIXME: Remove this code once we nailed the image widths
  /* const screenWidth = useBreakpointSize();
   * let width = "100%";
   * if (screenWidth > 768 && screenWidth <= 2000) {
   *   width = "80%";
   * }
   * if (screenWidth > 2000) {
   *   width = "60%";
   * } */

  const image = require(`../../data/images/${src}?resize&sizes[]=400&sizes[]=800&sizes[]=1024`);
  const imageWebp = require(`../../data/images/${src}?resize&webp&sizes[]=400&sizes[]=800&sizes[]=1024&format=webp`);
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

  const figureClassName = {
    "transition-opacity ease-in-out duration-600 opacity-100 motion-reduce:transition-none motion-reduce:transform-none": inView,
    "transition-opacity ease-in-out duration-600 opacity-0 motion-reduce:transition-none motion-reduce:transform-none": !inView,
  };

  // FIXME: clashes with smooth scrolling: <img loading="lazy" />
  //        Maybe set the height of an image to make sure the page renders with
  //        the right total height.
  return (
    <div className="flex flex-col justify-around items-center">
      <figure
        ref={ioHook}
        className={c("flex flex-col justify-around my-6", figureClassName)}
      >
        <picture>
          <source srcSet={imageWebp.srcSet} type="image/webp" />
          <source srcSet={image.srcSet} type="image/png" />
          <source srcSet={image.srcSet} type="image/jpg" />

          <img
            className="mx-auto"
            src={image.src}
            srcSet={image.srcSet}
            alt={description}
            title={title}
            sizes="(min-width: 640px) 400w, (min-width: 1024px) 800w, 100vw"
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
