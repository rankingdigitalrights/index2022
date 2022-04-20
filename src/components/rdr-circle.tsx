import c from "clsx";
import React from "react";

import CircleBarsDark from "../images/icons/circle-bars-dark.svg";
import CircleBarsLight from "../images/icons/circle-bars-light.svg";
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

  if (bars && color === "white") {
    return <CircleBarsLight className={c("w-full h-full", circleStyles)} />;
  }

  if (bars && color === "red") {
    return <CircleBarsDark className={c("w-full h-full", circleStyles)} />;
  }

  return (
    <Circle className={c("fill-arrow-red transform rotate-0", className)} />
  );
};

export default RdrCircle;
