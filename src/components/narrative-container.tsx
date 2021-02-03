import c from "clsx";
import React from "react";

import NarrativeBox from "./narrative-box";

interface NarrativeContainerProps {
  heroClassName?: string;
  heroCaption?: string;
  backgroundClassName?: string;
  children: React.ReactNode;
}

const NarrativeContainer = ({
  heroClassName,
  heroCaption = "",
  backgroundClassName,
  children,
}: NarrativeContainerProps) => {
  return (
    <div>
      {heroClassName && (
        <figure>
          <div className={c("w-full h-96", heroClassName)} />
          <figcaption
            className={c("font-circular text-xxs py-1", backgroundClassName)}
          >
            {heroCaption}
          </figcaption>
        </figure>
      )}

      <div
        className={c(
          "narrative flex justify-around py-12",
          backgroundClassName,
        )}
      >
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12 max-w-screen-lg bg-white px-4 md:px-12 py-3 shadow-md">
          {children}
        </div>
      </div>

      <div className="bg-beige flex justify-around py-3 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <NarrativeBox kind="scores" />
          <NarrativeBox kind="findings" />
          <NarrativeBox kind="methodology" />
        </div>
      </div>
    </div>
  );
};

export default NarrativeContainer;
