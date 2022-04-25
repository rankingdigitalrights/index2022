import React from "react";

import Tile from "./featured-essay-tile";

const HomeFeaturedEssays = () => {
  return (
    <section className="xl:container xl:mx-auto py-6 px-2 lg:px-6 xl:px-0">
      <h3 className="font-bold text-xl leading-9 text-prissian">
        Featured Essays
      </h3>

      <div className="grid grid-rows-4 grid-cols-1 md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4 gap-5 mt-8">
        <Tile
          title="Key Findings"
          href="https://rankingdigitalrights.org/mini-report/key-findings-2022/"
          src="essays/key-findings.jpg"
          className="w-full overflow-hidden"
        />
        <Tile
          title="We Must Govern Online Ads"
          href="https://rankingdigitalrights.org/mini-report/we-must-govern-online-ads"
          src="essays/online-ads.jpg"
          className="w-full overflow-hidden"
        />
        <Tile
          title="Empowering Big Tech Shareholders"
          href="https://rankingdigitalrights.org/mini-report/its-time-to-bring-down-the-barriers-blocking-shareholders-on-human-rights"
          src="essays/big-tech.jpg"
          className="w-full overflow-hidden"
        />
        <Tile
          title="Why Won't Chinese Companies Talk to Us?"
          href="https://rankingdigitalrights.org/2022/04/20/why-wont-chinese-companies-talk-to-us"
          src="essays/chinese-companies.jpg"
          className="w-full overflow-hidden"
        />
      </div>
    </section>
  );
};

export default HomeFeaturedEssays;
