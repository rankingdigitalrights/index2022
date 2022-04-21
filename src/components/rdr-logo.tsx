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
      <Arrow color={arrowColor} className="h-full w-full" />

      <Circle color={circleColor} className="h-full w-full" bars />

      <Arrow color={arrowColor} className="h-full w-full" />

      <Arrow color={arrowColor} className="h-full w-full" />
    </div>
  );
};

export default RdrLogo;
