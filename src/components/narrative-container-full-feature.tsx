import c from "clsx";
import React from "react";

// import NarrativeBox from "./narrative-box";

interface NarrativeContainerProps {
  hasHero?: boolean;
  heroClassName?: string;
  heroCaption?: string;
  backgroundClassName?: string;
  transparent?: boolean;
  children: React.ReactNode;
}

const NarrativeContainer = ({
  hasHero = false,
  heroClassName,
  heroCaption = "",
  backgroundClassName,
  transparent = false,
  children,
}: NarrativeContainerProps) => {
  const containerClassName = {
    "bg-white shadow-md": !transparent,
    "bg-transparent": transparent,
  };

  return (
    <div className="NarContainer">
      {hasHero && heroClassName && (
        <figure className="hero-figure">
          <div className={c("w-full", heroClassName)} />
          <figcaption
            className={c("font-circular text-xxs py-1", backgroundClassName)}
          >
            {heroCaption}
          </figcaption>
        </figure>
      )}
      <div className={c("narrative flex justify-around", backgroundClassName)}>
        <div
          className={c(
            "container mx-auto w-11/12 md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12 px-4 md:px-20 xl:px-32 2xl:px-36 py-3",
            containerClassName,
          )}
        >
          {children}
        </div>
      </div>
      {/* <div className="bg-beige flex justify-around py-3 md:py-16">
        <div className="flex flex-col md:flex-row items-center">
          <NarrativeBox kind="scores" />
          <NarrativeBox kind="findings" />
          <NarrativeBox kind="methodology" />
        </div>
      </div> */}
    </div>
  );
};

export default NarrativeContainer;
