import c from "clsx";
import React from "react";

import Arrow from "./rdr-arrow";

interface ExploreLogoProps {
  className?: string;
}

const ExploreLogo = ({className}: ExploreLogoProps) => {
  return (
    <div className={c("grid grid-rows-3 grid-cols-6 gap-1", className)}>
      {/* Row 1 */}
      <Arrow className="w-full h-full" color="blue" />

      <div />

      <div />

      <div />

      <Arrow className="w-full h-full" color="turquoise" />

      <Arrow className="w-full h-full" color="turquoise" />

      {/* Row 2 */}
      <div />

      <Arrow className="w-full h-full" color="turquoise" />

      <Arrow className="w-full h-full" color="turquoise" rotate />

      <Arrow className="w-full h-full" color="blue" />

      <Arrow className="w-full h-full" color="blue" rotate />

      <Arrow className="w-full h-full" color="blue" />

      {/* Row 3 */}
      <Arrow className="w-full h-full" color="turquoise" />

      <Arrow className="w-full h-full" color="blue" />

      <Arrow className="w-full h-full" color="blue" />

      <Arrow className="w-full h-full" color="yellow" />

      <div />

      <div />
    </div>
  );
};

export default ExploreLogo;
