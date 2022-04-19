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
        <aside className="grid md:hidden grid-rows grid-cols-9 gap-0.5">
          {/* Row 1 */}
          <Arrow color="blue" />

          <div />

          <div />

          <div />

          <Arrow color="turquoise" />

          <Arrow color="turquoise" rotate />

          <Arrow color="yellow" />

          <div />

          <Circle color="red" />
        </aside>
      )}

      {isTablet && (
        <aside className="hidden md:grid lg:hidden md:grid-rows-2 md:grid-cols-9 gap-0.5">
          {/* Row 1 */}
          <Arrow color="blue" />

          <div />

          <div />

          <div />

          <Arrow color="turquoise" />

          <Arrow color="turquoise" rotate />

          <Arrow color="yellow" />

          <div />

          <Circle color="red" />

          {/* Row 2 */}
          <div />

          <Arrow color="turquoise" rotate />

          <Arrow color="blue" />

          <Arrow color="blue" />

          <Arrow color="blue" rotate />

          <div />

          <div />

          <div />
        </aside>
      )}

      {isDesktop && (
        <aside className="hidden lg:grid grid-rows-2 grid-cols-9 lg:gap-1 xl:gap-2">
          {/* Row 1 */}
          <Arrow color="blue" rotate />

          <div />

          <div />

          <div />

          <Arrow color="turquoise" rotate />

          <Arrow color="turquoise" rotate />

          <Arrow color="yellow" rotate />

          <div />

          <Circle className="w-fit h-fit" color="red" />

          {/* Row 2 */}
          <div />

          <Arrow color="turquoise" />

          <Arrow color="turquoise" rotate />

          <Arrow color="blue" />

          <Arrow color="blue" rotate />

          <Arrow color="blue" />

          <Arrow color="blue" rotate />

          <div />

          <div />

          {/* Row 3 */}
          <Arrow color="turquoise" />

          <Arrow color="blue" />

          <Arrow color="blue" />

          <Arrow color="yellow" />

          <div />

          <div />

          <div />

          <Arrow color="blue" rotate />

          <Arrow color="blue" />
        </aside>
      )}
    </>
  );
};

export default HomeTeaserLogo;
