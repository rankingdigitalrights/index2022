import React from "react";

import HomeBox from "./home-teaser-box";
import HomeLogo from "./home-teaser-logo";

const HomeTeaser = () => {
  return (
    <div className="relative">
      <div className="absolute flex flex-row w-full h-full top-0">
        <div className="lg:w-5/12 w-full lg:bg-accent-red" />
        <div className="lg:w-7/12 w-full lg:bg-prissian" />
      </div>

      <div className="lg:container lg:mx-auto flex flex-col lg:flex-row">
        <div className="lg:w-5/12 self-center bg-accent-red">
          <HomeBox href="/executive-summary" />
        </div>

        <div className="lg:w-7/12 bg-prissian flex flex-col justify-around">
          <HomeLogo />
        </div>
      </div>
    </div>
  );
};

export default HomeTeaser;
