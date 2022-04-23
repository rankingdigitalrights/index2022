import React from "react";

import HomeBox from "./home-teaser-box";
import HomeLogo from "./home-teaser-logo";

const HomeTeaser = () => {
  return (
    <section className="relative">
      <div className="absolute flex flex-row w-full h-full top-0">
        <div className="w-full lg:w-5/12 xl:w-1/2 2xl:w-5/12 lg:bg-accent-red" />
        <div className="w-full lg:w-7/12 xl:w-1/2 2xl:w-7/12 lg:bg-prissian" />
      </div>

      <div className="xl:container lg:mx-auto flex flex-col-reverse lg:flex-row">
        <div className="h-full lg:w-5/12 xl:w-1/2 2xl:w-5/12 2xl:pr-16 bg-accent-red px-2 py-4 sm:py-6 lg:py-12 lg:px-6">
          <HomeBox href="/executive-summary" />
        </div>

        <div className="h-full lg:w-7/12 xl:w-1/2 2xl:w-7/12 bg-prissian py-4 px-2 md:py-4 lg:py-12 md:px-2 lg:px-6">
          <HomeLogo />
        </div>
      </div>
    </section>
  );
};

export default HomeTeaser;
