import React from "react";

import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBoxAlt from "./home-box-alt";
import Image from "./image";
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
      <HomeBoxAlt
        className="px-2 pt-8"
        title="Big Tech Keeps Failing Us"
        linkTitle="Read Our Key Findings"
        href="/"
        theme="altDark"
      >
        <p className="text-black font-sans">
          For the sixth consecutive year, not one digital platform earned a
          passing grade in our ranking. While we see some incremental progress
          overall, this is no time for business as usual. Companies must improve
          their governance and accelerate their adoption of human rights
          standards to protect their users and the public interest.
        </p>
      </HomeBoxAlt>

      <div className="py-8 px-2 flex flex-col space-y-4">
        <CategorySelector selected={category} onClick={onSelectCategory} />

        <RankChart ranking={rankings} category={category} />
      </div>

      <div className="flex flex-col px-2 py-8 space-y-8 bg-beige">
        <HomeBoxAlt
          title="Data Explorer"
          linkTitle="Visit the Data Explorer"
          href="/explore"
          theme="dark"
        >
          <p className="pb-8 text-black font-sans">
            Which companies commit to human rights? Who does the best job
            describing how they moderate content? Where is your data safest in
            case of a breach? How has Apple’s scores changed over time? Drill
            down into hundreds of thousands of data points to answer questions
            like these in our enhanced Data Explorer.
          </p>
        </HomeBoxAlt>
      </div>

      <Image
        src="charting-the-future-of-big-tech-accountability.jpg"
        alt="Charting the Future of Big Tech Accountability"
        className="w-full"
      />

      <HomeBoxAlt
        className="px-2 py-8 bg-disabled"
        title="What’s Next for Big Tech Accountability?"
        linkTitle="RSVP to Join the Conversation"
        href="https://events.newamerica.org/chartingthefutureofbigtech"
        theme="dark"
      >
        <p className="pb-4 text-black font-sans">
          Join RDR and a superstar set of panelists on May 4 to discuss current
          strategies for holding Big Tech accountable through regulation,
          shareholder action, whistleblowing, and grassroots research and
          advocacy.
        </p>
      </HomeBoxAlt>
    </section>
  );
};

export default HomeMainAreaMobile;
