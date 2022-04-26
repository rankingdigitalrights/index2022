/* eslint @typescript-eslint/no-var-requires: off, import/no-dynamic-require: off, global-require: off */
import c from "clsx";
import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  alignment?: "left-top" | "center";
  className?: string;
}

const Image = ({src, alt, alignment = "left-top", className}: ImageProps) => {
  const image = require(`../images/${src}?resize&sizes[]=400&sizes[]=750&sizes[]=1500`);

  return (
    <div className={c("h-full", className)}>
      <figure className="flex flex-col h-full">
        <picture className="flex h-full w-full">
          <source srcSet={image.srcSet} type="image/png" />
          <source srcSet={image.srcSet} type="image/jpg" />

          <img
            className={c("mx-auto object-cover", {
              "object-left-top": alignment === "left-top",
              "object-center": alignment === "center",
            })}
            src={image.src}
            srcSet={image.srcSet}
            alt={alt}
            title={alt}
            sizes="(min-width: 320px) 400w, (min-width: 640px) 750w, 100vw"
            loading="lazy"
          />
        </picture>
        <figcaption className="text-sm mt-2 sr-only">{alt}</figcaption>
      </figure>
    </div>
  );
};

export default Image;
