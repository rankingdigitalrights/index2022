import React from "react";

import bigTech from "../images/essay-big-tech.jpg";
import chineseCompanies from "../images/essay-chinese-companies.jpg";
import onlineAds from "../images/essay-online-ads.jpg";
import Tile from "./featured-essay-tile";

const HomeFeaturedEssays = () => {
  return (
    <section className="lg:container lg:mx-auto py-6">
      <h3 className="font-bold text-xl leading-9 text-prissian">
        Featured essays
      </h3>

      <div className="grid grid-rows-1 grid-cols-3 gap-5 mt-8">
        <Tile
          title="We Must Govern Online Ads"
          href="https://rankingdigitalrights.org/mini-report/we-must-govern-online-ads"
          image={onlineAds}
        />
        <Tile
          title="Empowering Big Tech Shareholders"
          href="https://rankingdigitalrights.org/mini-report/its-time-to-bring-down-the-barriers-blocking-shareholders-on-human-rights"
          image={bigTech}
        />
        <Tile
          title="Why Won't Chinese Companies Talk to Us?"
          href="https://rankingdigitalrights.org/2022/04/20/why-wont-chinese-companies-talk-to-us"
          image={chineseCompanies}
        />
      </div>
    </section>
  );
};

export default HomeFeaturedEssays;
