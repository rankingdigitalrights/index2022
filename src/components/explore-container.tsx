import c from "clsx";
import React from "react";

import Donate from "./donate";

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
    return <Container className={c(className)}>{contents}</Container>;
  };

  return (
    <div>
      <div className="flex flex-col justify-around py-3 md:py-12">
        <div className="pb-0">{children({Container: ContainerWrapper})}</div>

        {hasDonate && (
          <Donate className="explore-relative mx-3 md:mx-auto mt-3 md:mt-12" />
        )}
      </div>
    </div>
  );
};

export default ExploreContainer;
