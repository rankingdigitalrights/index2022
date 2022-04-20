import c from "clsx";
import React from "react";

import Arrow from "./rdr-arrow";
import Circle from "./rdr-circle";

interface RdrLogoProps {
  theme?: "dark" | "light";
  className?: string;
}

const RdrLogo = ({theme = "dark", className}: RdrLogoProps) => {
  const arrowColor = theme === "dark" ? "prissian" : "white";
  const circleColor = theme === "dark" ? "red" : "white";

  return (
    <div
      aria-label="Ranking Digital Rights Logo"
      className={c("grid grid-rows-2 grid-cols-2 gap-0.5", className)}
    >
      <Arrow color={arrowColor} className="w-fit h-fit" />

      <Circle color={circleColor} className="w-fit h-fit" bars />

      <Arrow color={arrowColor} className="w-fit h-fit" />

      <Arrow color={arrowColor} className="w-fit h-fit" />
    </div>
  );
};

export default RdrLogo;
