import React from "react";

import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBox from "./home-box";
import HomeBoxAlt from "./home-box-alt";
import RankChart from "./rank-chart";
import Arrow from "./rdr-arrow";

interface HomeMainAreaDesktopProps {
  category: IndicatorCategoryExt;
  rankings: CompanyRank[];
  onSelectCategory: (category: IndicatorCategoryExt) => void;
}

const HomeMainAreaDesktop = ({
  category,
  rankings,
  onSelectCategory,
}: HomeMainAreaDesktopProps) => {
  return (
    <section className="xl:container xl:mx-auto grid grid-rows-3 md:grid-cols-3 lg:grid-rows-2">
      <div className="lg:row-end-2 lg:p-6 grid self-center">
        <h3 className="font-bold text-lg sm:text-xl sm:leading-9 mt-0 mb-16">
          Big Tech Keeps Failing Us
        </h3>

        <p>
          For the sixth consecutive year, not one digital platform earned a
          passing grade in our ranking. While we see some incremental progress
          overall, companies must improve their governance and accelerate their
          adoption of human rights standards to protect their users and the
          public interest.
        </p>
      </div>

      <div className="md:col-span-2 lg:col-span-1 lg:row-end-2 p-6 space-y-4">
        <CategorySelector selected={category} onClick={onSelectCategory} />

        <RankChart
          className=""
          ranking={rankings}
          category={category}
          hasHeader={false}
        />
      </div>

      <div className="bg-beige beige-grid-col" />

      <div className="md:col-span-3 lg:col-span-2 bg-landing-page" />

      <div className="disabled-grid-col bg-disabled" />

      <div className="overlay-grid-col flex flex-col justify-between py-2 lg:pb-6 xl:py-8">
        <div className="flex flex-col lg:space-y-6 px-6">
          <HomeBox
            className="h-32 xl:h-36"
            title="Key findings"
            href="/key-findings"
            theme="dark"
          >
            <p className="hidden lg:block">
              In 2022, what’s changed? What hasn’t? Read our top observations
              and recommendations, and learn why—more than ever—this is no time
              for business as usual.
            </p>
          </HomeBox>

          <HomeBox
            className="h-32 xl:h-36"
            title="Data Explorer"
            href="/explore"
            theme="dark"
          >
            <p className="hidden lg:block">
              Which companies commit to human rights? Who does the best job
              describing how they moderate content? Where is your data safest in
              case of a breach? How has Apple’s scores changed over time? Drill
              down into hundreds of thousands of data points to answer questions
              like these in our enhanced Data Explorer.
            </p>
          </HomeBox>
        </div>

        <div className="self-center flex flex-row space-x-2 lg:mt-16 xl:mt-8 2xl:-mt-4">
          <Arrow color="blue" className="w-16 h-16" outline />
          <Arrow color="turquoise" className="w-16 h-16" outline />
          <Arrow color="turquoise" className="w-16 h-16" outline />
          <Arrow color="yellow" className="w-16 h-16" outline rotate />
        </div>

        <HomeBoxAlt
          className="px-6 py-8 lg:mb-6"
          title="Charting the Future of Big Tech Accountability"
          linkTitle="Key findings"
          href="/key-findings"
          theme="dark"
        >
          <span />
        </HomeBoxAlt>
      </div>
    </section>
  );
};

export default HomeMainAreaDesktop;
