import React from "react";

import HomeBox from "./home-box";
import HomeLogo from "./home-teaser-logo";

const HomeTeaser = () => {
  return (
    <div className="relative">
      <div className="absolute flex flex-row w-full h-full top-0">
        <div className="lg:w-1/3 w-full lg:bg-accent-red" />
        <div className="lg:w-2/3 w-full lg:bg-prissian" />
      </div>

      <div className="lg:container lg:mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3 items-center bg-accent-red z-10">
          <HomeBox title="2022 Big Tech Scorecard" href="/intro-essay">
            <div className="flex flex-col h-full justify-end">
              <p className="font-serif">
                Each year, Ranking Digital Rights evaluates and ranks
                14 of the world’s most powerful digital platforms
                on their policies and practices affecting people’s rights
                to freedom of expression and privacy.
              </p>
            </div>
          </HomeBox>
        </div>

        <div className="md:w-2/3 bg-prissian flex flex-col justify-around">
          <HomeLogo />
        </div>
      </div>
    </div>
  );
};

export default HomeTeaser;
