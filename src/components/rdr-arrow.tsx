import c from "clsx";
import React from "react";

import Arrow from "../images/icons/rdr-arrow.svg";

interface RdrArrowProps {
  color: "white" | "blue" | "prissian" | "turquoise" | "yellow" | "red";
  rotate?: boolean;
  outline?: boolean;
  className?: string;
}

const RdrArrow = ({
  color,
  rotate = false,
  outline = false,
  className,
}: RdrArrowProps) => {
  const styles = {
    [`stroke-arrow-${color}`]: outline,
    [`fill-arrow-${color}`]: !outline,
    "transform rotate-180": rotate,
    "transform rotate-0": !rotate,
  };
  return <Arrow className={c(className, styles)} />;
};

export default RdrArrow;
