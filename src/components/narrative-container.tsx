import c from "clsx";
import React from "react";

import Donate from "./donate";
import NarrativeBox from "./narrative-box";

const containerWidth =
  "w-11/12 md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12 px-4 md:px-16 xl:px-28 2xl:px-24";

interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({children: contents}: ContainerProps) => {
  return (
    <div className={c("container mx-auto", containerWidth)}>{contents}</div>
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
            className={c("font-circular text-xxs py-1", backgroundClassName)}
          >
            {heroCaption}
          </figcaption>
        </figure>
      )}

      <div
        className={c(
          "narrative flex flex-col justify-around py-12",
          backgroundClassName,
        )}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={c(
                "container mx-auto h-full top-0",
                containerClassName,
                containerWidth,
              )}
            />
          </div>

          <div className="relative flex items-center py-3">
            {children({Container})}
          </div>
        </div>

        {hasDonate && (
          <Donate className={c("relative mx-auto mt-12", containerWidth)} />
        )}
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
