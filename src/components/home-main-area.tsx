import React, {useState} from "react";

import {useMobileSize} from "../hooks";
import {CompanyRank, IndicatorCategoryExt} from "../types";
import HomeMainAreaDesktop from "./home-main-area-desktop";
import HomeMainAreaMobile from "./home-main-area-mobile";

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
  const isMobile = useMobileSize(1024);

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

  return isMobile ? (
    <HomeMainAreaMobile
      category={selectedCategory}
      rankings={platformRankings}
      onSelectCategory={handleSelectCategory}
    />
  ) : (
    <HomeMainAreaDesktop
      category={selectedCategory}
      rankings={platformRankings}
      onSelectCategory={handleSelectCategory}
    />
  );
};

export default HomeMainArea;
