import c from "clsx";
import React from "react";

import readmoreItems from "../../data/readmore.json";
import {ReadmoreItem, ReadmoreKind} from "../types";
import Donate from "./donate";
import Readmore from "./readmore";

export const containerWidth = "md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={c("narrative-container mx-auto", className)}>
      {children}
    </div>
  );
};

interface NarrativeContainerProps {
  heroClassName?: string;
  heroCaption?: string;
  backgroundClassName?: string;
  transparent?: boolean;
  hasDonate?: boolean;
  readmore?: ReadmoreKind[];
  children: (props: {Container: typeof Container}) => React.ReactNode;
}

const NarrativeContainer = ({
  heroClassName,
  heroCaption = "",
  backgroundClassName,
  transparent = false,
  hasDonate = true,
  readmore = [],
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

  const contentClassName = {
    "pt-4 pb-6 md:pt-3 md:pb-10": !transparent,
    "pb-0": transparent,
  };

  const readmoreSelection: Array<ReadmoreItem | undefined> = readmore.map(
    (kind) => {
      const item = readmoreItems.find((i) => (i.kind as ReadmoreKind) === kind);
      return item ? (item as ReadmoreItem) : undefined;
    },
  );

  const ContainerWrapper = ({
    children: contents,
    className,
  }: ContainerProps) => {
    return (
      <Container className={c(containerWidth, containerPadding, className)}>
        {contents}
      </Container>
    );
  };

  return (
    <div className={backgroundClassName}>
      {heroClassName && (
        <figure className="bg-white">
          <div className={c("w-full h-96", heroClassName)} />
          <figcaption
            className={c(
              "text-right text-xs md:text-sm py-1 pr-3 md:pr-1.5",
              backgroundClassName,
            )}
          >
            {heroCaption}
          </figcaption>
        </figure>
      )}

      <div className="narrative flex flex-col justify-around py-3 md:py-12">
        <div className={c("relative", contentClassName)}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={c(
                "narrative-container w-full h-full top-0 z-10 mx-3 md:mx-auto",
                containerClassName,
                containerWidth,
                containerPadding,
              )}
            />
          </div>

          <div className="relative z-10">
            {children({Container: ContainerWrapper})}
          </div>
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

      {readmoreSelection.length > 0 && (
        <div className="bg-beige flex flex-col items-center py-3 md:pt-10 md:pb-6">
          <span
            className={c(
              "narrative-container relative mx-3 px-3 md:px-0 text-lg font-bold mb-3",
              "w-full md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12",
            )}
          >
            Read more:
          </span>

          <div
            className={c(
              "narrative-container relative flex flex-col mx-3 md:mx-auto lg:flex-row items-center",
              "md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12",
            )}
          >
            {readmoreSelection[0] && (
              <Readmore
                className="w-full lg:max-w-xs"
                readmore={readmoreSelection[0]}
              />
            )}
            {readmoreSelection[1] && (
              <Readmore
                className="w-full my-6 lg:my-0 lg:max-w-xs lg:mx-6"
                readmore={readmoreSelection[1]}
              />
            )}
            {readmoreSelection[2] && (
              <Readmore
                className="w-full lg:max-w-xs"
                readmore={readmoreSelection[2]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NarrativeContainer;
