import React from "react";

import Tile from "./featured-essay-tile";

const HomeFeaturedEssays = () => {
  return (
    <section className="xl:container xl:mx-auto py-6 px-2 lg:px-6 xl:px-0">
      <h3 className="font-bold text-xl leading-9 text-prissian">
        Featured Essays
      </h3>

      <div className="flex flex-col sm:grid sm:grid-rows-4 sm:grid-cols-1 md:grid-rows-2 md:grid-cols-2 xl:grid-rows-1 xl:grid-cols-4 gap-5 mt-8">
        <Tile
          title="Key Findings"
          subText="Key Findings from the 2022 RDR Big Tech Scorecard."
          href="https://rankingdigitalrights.org/mini-report/key-findings-2022/"
          src="essays/key-findings.jpg"
          className="w-full overflow-hidden"
        />
        <Tile
          title="We Must Govern Online Ads"
          subText="For a global internet that supports and sustains human rights, we need a global online advertising ecosystem that does the same thing."
          href="https://rankingdigitalrights.org/mini-report/we-must-govern-online-ads"
          src="essays/online-ads.jpg"
          className="w-full overflow-hidden"
        />
        <Tile
          title="Empowering Big Tech Shareholders"
          subText="It’s time to bring down the barriers blocking shareholders on human rights."
          href="https://rankingdigitalrights.org/mini-report/its-time-to-bring-down-the-barriers-blocking-shareholders-on-human-rights"
          src="essays/big-tech.jpg"
          className="w-full overflow-hidden"
        />
        <Tile
          title="Why Won't Chinese Companies Talk to Us?"
          subText="Chinese companies may want to engage with civil society. But in the era of Xi Jinping, it’s not that simple."
          href="https://rankingdigitalrights.org/2022/04/27/why-wont-chinese-companies-talk-to-us"
          src="essays/chinese-companies.jpg"
          className="w-full overflow-hidden"
        />
      </div>
    </section>
  );
};

export default HomeFeaturedEssays;
