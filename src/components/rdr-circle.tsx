import c from "clsx";
import React from "react";

import Bars from "../images/icons/rdr-bars.svg";
import Circle from "../images/icons/rdr-circle.svg";

interface RdrCircleProps {
  color: "red" | "white";
  bars?: boolean;
  className?: string;
}

const RdrCircle = ({color, bars = false, className}: RdrCircleProps) => {
  const circleStyles = {
    "fill-arrow-red": color === "red",
    "fill-arrow-white": color === "white",
  };

  const barStyles = {
    "fill-arrow-white": color === "red",
    "fill-arrow-red": color === "white",
  };

  if (bars) {
    return (
      <div className={c("relative", className)}>
        <Circle className={c("w-full h-full", circleStyles)} />
        <div className="z-10 absolute top-1/4 left-0 w-full h-full">
          <Bars className={c("h-1.5 w-1.5 md:h-3 md:w-3 m-auto", barStyles)} />
        </div>
      </div>
    );
  }

  return <Circle className={c("fill-arrow-red", className)} />;
};

export default RdrCircle;
