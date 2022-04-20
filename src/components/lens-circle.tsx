import c from "clsx";
import React from "react";

import Circle from "../images/icons/lens-circle.svg";

interface LensCircleProps {
  lens: string;
  className?: string;
}

const LensCircle = ({lens, className}: LensCircleProps) => {
  return <Circle className={c(`fill-lens-${lens}`, className)} />;
};

export default LensCircle;
