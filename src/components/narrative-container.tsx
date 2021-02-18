import c from "clsx";
import React from "react";

import Donate from "./donate";
import NarrativeBox from "./narrative-box";

const containerWidth =
  "md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12 px-6 md:px-16 xl:px-28 2xl:px-24";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({children: contents, className}: ContainerProps) => {
  return (
    <div
      className={c("narrative-container mx-auto", containerWidth, className)}
    >
      {contents}
    </div>
  );
};

interface NarrativeContainerProps {
  heroClassName?: string;
  heroCaption?: string;
  backgroundClassName?: string;
  transparent?: boolean;
  hasDonate?: boolean;
  children: (props: {Container: typeof Container}) => React.ReactNode;
}

const NarrativeContainer = ({
  heroClassName,
  heroCaption = "",
  backgroundClassName,
  transparent = false,
  hasDonate = true,
  children,
}: NarrativeContainerProps) => {
  const containerClassName = {
    "bg-white shadow-md": !transparent,
    "bg-transparent": transparent,
  };

  return (
    <div>
      {heroClassName && (
        <figure>
          <div className={c("w-full h-96", heroClassName)} />
          <figcaption
            className={c(
              "font-circular text-xxs py-1 pl-1",
              backgroundClassName,
            )}
          >
            {heroCaption}
          </figcaption>
        </figure>
      )}

      <div
        className={c(
          "narrative flex flex-col justify-around py-3 md:py-12",
          backgroundClassName,
        )}
      >
        <div className="relative pb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={c(
                "narrative-container w-full h-full top-0 z-10 mx-3 md:mx-auto",
                containerClassName,
                containerWidth,
              )}
            />
          </div>

          <div className="relative pb-3 z-10">{children({Container})}</div>
        </div>

        {hasDonate && (
          <Donate
            className={c(
              "narrative-container relative mx-3 md:mx-auto mt-3 md:mt-12",
              containerWidth,
            )}
          />
        )}
      </div>

      <div className="bg-beige flex py-3 md:py-16">
        <div className="flex flex-col mx-3 md:mx-auto md:flex-row items-center">
          <NarrativeBox className="w-full md:w-60" kind="scores" />
          <NarrativeBox className="w-full md:w-60" kind="findings" />
          <NarrativeBox className="w-full md:w-60" kind="methodology" />
        </div>
      </div>
    </div>
  );
};

export default NarrativeContainer;
