import React from "react";

import {useMobileSize} from "../hooks";
import Arrow from "./rdr-arrow";
import Circle from "./rdr-circle";

const HomeTeaserLogo = () => {
  const isMobile = useMobileSize(768);
  const isTablet = useMobileSize(1024);
  const isDesktop = !(isMobile || isTablet);

  return (
    <>
      {isMobile && (
        <aside className="grid md:hidden grid-rows-1 grid-cols-9 gap-0.5">
          {/* Row 1 */}
          <Arrow className="w-full h-full" color="blue" />

          <div />

          <div />

          <div />

          <Arrow className="w-full h-full" color="turquoise" />

          <Arrow className="w-full h-full" color="turquoise" rotate />

          <Arrow className="w-full h-full" color="yellow" />

          <div />

          <Circle className="w-full h-full" color="red" />
        </aside>
      )}

      {isTablet && (
        <aside className="hidden md:grid lg:hidden md:grid-rows-2 md:grid-cols-9 gap-0.5">
          {/* Row 1 */}
          <Arrow className="w-full h-full" color="blue" />

          <div />

          <div />

          <div />

          <Arrow className="w-full h-full" color="turquoise" />

          <Arrow className="w-full h-full" color="turquoise" rotate />

          <Arrow className="w-full h-full" color="yellow" />

          <div />

          <Circle className="w-full h-full" color="red" />

          {/* Row 2 */}
          <div />

          <Arrow className="w-full h-full" color="turquoise" rotate />

          <Arrow className="w-full h-full" color="blue" />

          <Arrow className="w-full h-full" color="blue" />

          <Arrow className="w-full h-full" color="blue" rotate />

          <div />

          <div />

          <div />
        </aside>
      )}

      {isDesktop && (
        <aside className="hidden lg:grid grid-rows-3 grid-cols-9 lg:gap-1 xl:gap-2">
          {/* Row 1 */}
          <Arrow className="w-full h-full" color="blue" rotate />

          <div />

          <div />

          <div />

          <Arrow className="w-full h-full" color="turquoise" rotate />

          <Arrow className="w-full h-full" color="turquoise" rotate />

          <Arrow className="w-full h-full" color="yellow" rotate />

          <div />

          <Circle className="w-full h-full" color="red" />

          {/* Row 2 */}
          <div />

          <Arrow className="w-full h-full" color="turquoise" />

          <Arrow className="w-full h-full" color="turquoise" rotate />

          <Arrow className="w-full h-full" color="blue" />

          <Arrow className="w-full h-full" color="blue" rotate />

          <Arrow className="w-full h-full" color="blue" />

          <Arrow className="w-full h-full" color="blue" rotate />

          <div />

          <div />

          {/* Row 3 */}
          <Arrow className="w-full h-full" color="turquoise" />

          <Arrow className="w-full h-full" color="blue" />

          <Arrow className="w-full h-full" color="blue" />

          <Arrow className="w-full h-full" color="yellow" />

          <div />

          <div />

          <div />

          <Arrow className="w-full h-full" color="blue" rotate />

          <Arrow className="w-full h-full" color="blue" />
        </aside>
      )}
    </>
  );
};

export default HomeTeaserLogo;
