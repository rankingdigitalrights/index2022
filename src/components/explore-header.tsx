import React from "react";

import ExploreLogo from "./explore-logo";

const ExploreHeader = () => {
  return (
    <div className="py-12 bg-beige">
      <div className="relative explore-container px-2">
        <section className="sm:w-2/3 pr-4 sm:h-48 md:h-56 flex flex-col justify-center">
          <h1 className="font-bold text-xl leading-none text-prissian">
            Explore the Data
          </h1>

          <p className="mt-8">
            Welcome to our new and improved Data Explorer, an interactive tool
            that allows for multiple views of the data we collect, including by
            company and service; by lens, a new view that represents a curated
            group of indicators that illuminate a specific topic area; and by
            scores over time.
          </p>
        </section>

        <ExploreLogo className="hidden sm:grid sm:absolute inset-y-0 sm:-right-44 md:-right-48 sm:h-48 md:h-56" />
      </div>
    </div>
  );
};

export default ExploreHeader;
