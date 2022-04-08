import React from "react";

import RdrArrow from "../images/icons/rdr-arrow.svg";
import RdrCircle from "../images/icons/rdr-circle.svg";

const HomeTeaserLogo = () => {
  return (
    <aside className="grid grid-rows-3 grid-cols-9 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9 gap-0.5 lg:gap-1 xl:gap-2 place-items-center py-12 px-8">
      {/* Row 1 */}
      <RdrArrow className="w-fit h-fit fill-arrow-blue transform rotate-0" />

      <div />

      <div className="md:hidden lg:block" />

      <div className="md:hidden xl:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-turquoise transform rotate-0 md:hidden xl:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-turquoise transform rotate-0" />

      <RdrArrow className="w-fit h-fit fill-arrow-yellow transform rotate-0" />

      <div className="md:hidden lg:block" />

      <RdrCircle className="w-fit h-fit fill-arrow-red transform rotate-0" />

      {/* Row 2 */}
      <div />

      <RdrArrow className="w-fit h-fit fill-arrow-turquoise transform rotate-0 md:hidden xl:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-turquoise rotate-arrow" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue transform rotate-0 md:hidden lg:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue rotate-arrow md:hidden xl:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue transform rotate-0" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue rotate-arrow" />

      <div className="md:hidden lg:block" />

      <div />

      {/* Row 3 */}
      <RdrArrow className="w-fit h-fit fill-arrow-turquoise transform rotate-0 md:hidden lg:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue transform rotate-0 md:hidden xl:block" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue transform rotate-0" />

      <RdrArrow className="w-fit h-fit fill-arrow-yellow transform rotate-0" />

      <div className="md:hidden xl:block" />

      <div className="md:hidden lg:block" />

      <div />

      <RdrArrow className="w-fit h-fit fill-arrow-blue rotate-arrow" />

      <RdrArrow className="w-fit h-fit fill-arrow-blue transform rotate-0" />
    </aside>
  );
};

export default HomeTeaserLogo;
