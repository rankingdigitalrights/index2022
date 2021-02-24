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
  const containerPadding = {
    "px-6 md:px-16 xl:px-28 2xl:px-24": !transparent,
    "px-3 md:px-16 xl:px-28 2xl:px-24": transparent,
  };
  const containerClassName = {
    "bg-white shadow-md": !transparent,
    "bg-transparent": transparent,
  };

  return (
    <div className="NarContainer">
      {hasHero && heroClassName && (
        <figure className="bg-white hero-figure">
          <div className={c("w-full h-96", heroClassName)} />
          <figcaption
            className={c(
              "font-circular text-right text-xs md:text-sm py-1 pr-3 md:pr-1.5",
              backgroundClassName,
            )}
          >
            {heroCaption}
          </figcaption>
        </figure>
      )}
      <div className={c("narrative flex justify-around", backgroundClassName)}>
        <div
          className={c(
            "narrative-container mx-auto md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12 px-3 md:px-16 xl:px-28 2xl:px-24",
            containerPadding,
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
