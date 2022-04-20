import React from "react";

import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBox from "./home-box";
import HomeBoxAlt from "./home-box-alt";
import RankChart from "./rank-chart";

interface HomeMainAreaMobileProps {
  category: IndicatorCategoryExt;
  rankings: CompanyRank[];
  onSelectCategory: (category: IndicatorCategoryExt) => void;
}

const HomeMainAreaMobile = ({
  category,
  rankings,
  onSelectCategory,
}: HomeMainAreaMobileProps) => {
  return (
    <section className="flex flex-col">
      <h3 className="font-bold text-xl leading-9 my-8 px-2">
        Big Tech Keeps Failing Us
      </h3>

      <p className="px-2">
        For the sixth consecutive year, not one digital platform earned a
        passing grade in our ranking. While we see some incremental progress
        overall, companies must improve their governance and accelerate their
        adoption of human rights standards to protect their users and the public
        interest.
      </p>

      <div className="py-8 px-2 flex flex-col space-y-4">
        <CategorySelector selected={category} onClick={onSelectCategory} />

        <RankChart ranking={rankings} category={category} hasHeader={false} />
      </div>

      <div className="flex flex-col px-2 space-y-8 bg-beige">
        <HomeBox title="Key findings" href="/key-findings" theme="dark">
          <div className="font-serif flex flex-col h-full justify-end">
            <p>
              In 2022, what’s changed? What hasn’t? Read our top observations
              and recommendations, and learn why—more than ever—this is no time
              for business as usual.
            </p>
          </div>
        </HomeBox>

        <HomeBox title="Data Explorer" href="/explore" theme="dark">
          <div className="font-serif flex flex-col h-full justify-end">
            <p>
              Which companies commit to human rights? Who does the best job
              describing how they moderate content? Where is your data safest in
              case of a breach? How has Apple’s scores changed over time? Drill
              down into hundreds of thousands of data points to answer questions
              like these in our enhanced Data Explorer.
            </p>
          </div>
        </HomeBox>
      </div>

      <div className="bg-landing-page w-full h-56" />

      <HomeBoxAlt
        className="px-2 py-8 bg-disabled"
        title="Charting the Future of Big Tech Accountability"
        linkTitle="Key findings"
        href="/key-findings"
        theme="dark"
      >
        <span />
      </HomeBoxAlt>
    </section>
  );
};

export default HomeMainAreaMobile;
