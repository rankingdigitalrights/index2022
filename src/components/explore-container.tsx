import c from "clsx";
import React from "react";

import Donate from "./donate";

export const containerWidth = "md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({children, className}: ContainerProps) => {
  return (
    <div className={c("explore-container mx-auto", className)}>{children}</div>
  );
};

interface ExploreContainerProps {
  hasDonate?: boolean;
  children: (props: {Container: typeof Container}) => React.ReactNode;
}

const ExploreContainer = ({
  hasDonate = false,
  children,
}: ExploreContainerProps) => {
  const ContainerWrapper = ({
    children: contents,
    className,
  }: ContainerProps) => {
    return (
      <Container
        className={c(
          "px-3 md:px-16 xl:px-28 2xl:px-24",
          containerWidth,
          className,
        )}
      >
        {contents}
      </Container>
    );
  };

  return (
    <div>
      <div className="flex flex-col justify-around py-3 md:py-12">
        <div className="relative pb-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={c(
                "explore-container w-full h-full top-0 z-10 mx-3 md:mx-auto",
                "px-3 md:px-16 xl:px-28 2xl:px-24",
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
    </div>
  );
};

export default ExploreContainer;
