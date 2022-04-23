import c from "clsx";
import React from "react";

import {CompanyRank, IndicatorCategoryExt} from "../types";
import CategorySelector from "./category-selector";
import HomeBoxAlt from "./home-box-alt";
import Image from "./image";
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
  const altBoxClassName = "lg:p-6";

  return (
    <section className="xl:container xl:mx-auto grid grid-rows-2 grid-cols-3">
      <div className="pt-6">
        <HomeBoxAlt
          className={c("h-10/12", altBoxClassName)}
          title="Big Tech Keeps Failing Us"
          linkTitle="Read Our Key Findings"
          href="/"
          theme="altDark"
        >
          <p className="pb-2 text-sm text-black font-sans">
            For the sixth consecutive year, not one digital platform earned a
            passing grade in our ranking. While we see some incremental progress
            overall, this is no time for business as usual. Companies must
            improve their governance and accelerate their adoption of human
            rights standards to protect their users and the public interest.
          </p>
        </HomeBoxAlt>
      </div>

      <div className="px-6 py-12 space-y-4">
        <CategorySelector selected={category} onClick={onSelectCategory} />

        <RankChart
          className=""
          ranking={rankings}
          category={category}
          hasHeader={false}
        />
      </div>

      <div className="bg-beige pt-6">
        <HomeBoxAlt
          className={c("h-10/12", altBoxClassName)}
          title="Data Explorer"
          linkTitle="Visit the Data Explorer"
          href="/explore"
          theme="dark"
        >
          <p className="pb-2 text-sm text-black font-sans">
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
        className="md:col-span-3 lg:col-span-2"
      />

      <div className="relative disabled-grid-col bg-disabled">
        <div className="h-full flex ">
          <HomeBoxAlt
            className={c("self-center", altBoxClassName)}
            title="What’s Next for Big Tech Accountability?"
            linkTitle="RSVP to Join the Conversation"
            href="https://events.newamerica.org/chartingthefutureofbigtech"
            theme="dark"
          >
            <p className="pb-2 text-black font-sans">
              Join RDR and a superstar set of panelists on May 4 to discuss
              current strategies for holding Big Tech accountable through
              regulation, shareholder action, whistleblowing, and grassroots
              research and advocacy.
            </p>
          </HomeBoxAlt>
        </div>

        <div className="absolute -top-8 left-0 self-center w-full">
          <div className="flex flex-row space-x-2 w-fit mx-auto">
            <Arrow color="blue" className="w-16 h-16" outline />
            <Arrow color="turquoise" className="w-16 h-16" outline />
            <Arrow color="turquoise" className="w-16 h-16" outline />
            <Arrow color="yellow" className="w-16 h-16" outline rotate />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMainAreaDesktop;
