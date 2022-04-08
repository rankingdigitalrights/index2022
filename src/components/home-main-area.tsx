import React, {useState} from "react";

import RdrArrow from "../images/icons/rdr-arrow.svg";
import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBox from "./home-box";
import RankChart from "./rank-chart";

interface HomeMainAreaProps {
  totalRanking: CompanyRank[];
  governanceRanking: CompanyRank[];
  freedomRanking: CompanyRank[];
  privacyRanking: CompanyRank[];
}

const HomeMainArea = ({
  totalRanking,
  governanceRanking,
  freedomRanking,
  privacyRanking,
}: HomeMainAreaProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    IndicatorCategoryExt
  >("total");
  const [platformRankings, setPlatformRankings] = useState<CompanyRank[]>(
    totalRanking,
  );

  const handleSelectCategory = (category: IndicatorCategoryExt): void => {
    switch (category) {
      case "total": {
        setSelectedCategory("total");
        setPlatformRankings(totalRanking);
        break;
      }
      case "governance": {
        setSelectedCategory("governance");
        setPlatformRankings(governanceRanking);
        break;
      }
      case "freedom": {
        setSelectedCategory("freedom");
        setPlatformRankings(freedomRanking);
        break;
      }
      case "privacy": {
        setSelectedCategory("privacy");
        setPlatformRankings(privacyRanking);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <section className="xl:container xl:mx-auto grid grid-rows-3 md:grid-cols-3 lg:grid-rows-2">
      <div className="lg:row-end-2 lg:p-6 grid self-center">
        <HomeBox
          title="How did Big Tech do in 2022?"
          href="/intro-essay"
          theme="dark"
        >
          <div className="flex flex-col h-full justify-end">
            <p>
              We evaluated 26 of the world’s most powerful digital platforms and
              telecommunications companies on their disclosed policies and
              practices affecting people’s rights to freedom of expression and
              privacy.
            </p>
          </div>
        </HomeBox>
      </div>

      <div className="md:col-span-2 lg:col-span-1 lg:row-end-2 p-6">
        <CategorySelector
          selected={selectedCategory}
          onClick={handleSelectCategory}
        />

        <RankChart
          className=""
          ranking={platformRankings}
          category={selectedCategory}
          hasHeader={false}
        />
      </div>

      <div className="bg-beige beige-grid-col" />

      <div className="md:col-span-3 lg:col-span-2 bg-landing-page" />

      <div className="disabled-grid-col bg-disabled" />

      <div className="overlay-grid-col flex flex-col justify-between py-6 md:pt-6 md:pb-2 lg:pb-16 xl:pt-16 xl:pb-6">
        <div className="flex flex-col lg:space-y-8">
          <HomeBox
            className="h-32 xl:h-36"
            title="Key findings"
            href="/key-findings"
            theme="dark"
          >
            <div className="hidden md:block flex flex-col h-full justify-end">
              <p>
                Companies are improving in principle, but failing in practice
              </p>
            </div>
          </HomeBox>

          <HomeBox
            className="h-32 xl:h-36"
            title="Data Explorer"
            href="/explore"
            theme="dark"
          >
            <div className="hidden md:block flex flex-col h-full justify-end">
              <p>
                Soluta omnis exercitationem dolorem qui eos. At libero alias
                aut. Voluptas sint omnis ullam velit eius.
              </p>
            </div>
          </HomeBox>
        </div>

        <div className="self-center flex flex-row space-x-2 -mt-6 lg:-mt-6">
          <RdrArrow className="w-16 h-16 stroke-arrow-blue" />
          <RdrArrow className="w-16 h-16 stroke-arrow-turquoise" />
          <RdrArrow className="w-16 h-16 stroke-arrow-turquoise" />
          <RdrArrow className="w-16 h-16 stroke-arrow-yellow rotate-arrow" />
        </div>

        <HomeBox
          className="h-56 xl:h-80 lg:mb-8"
          title="Companies are improving in principle, but failing in practice"
          href="/explore"
          theme="dark"
        >
          <div className="hidden xl:block flex flex-col h-full justify-end">
            <p>
              Soluta omnis exercitationem dolorem qui eos. At libero alias aut.
              Voluptas sint omnis ullam velit eius.
            </p>
          </div>
        </HomeBox>
      </div>
    </section>
  );
};

export default HomeMainArea;
