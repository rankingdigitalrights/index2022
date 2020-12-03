import React, {useEffect, useRef, useState} from "react";

import {Indicator, ScoreCategory} from "../types";
import CompanyIndicatorChart from "./company-indicator-chart";

interface CompanySectionProps {
  category: ScoreCategory;
  score: number;
  text: string;
  indicators: Indicator[];
}

const CompanySection = ({
  category,
  score,
  text,
  indicators,
}: CompanySectionProps) => {
  // eslint-disable-next-line unicorn/no-null
  const chartRef = useRef<HTMLDivElement>(null);

  // Set the default width of the indicator chart to 0 to avoid a visible
  // rerender when the page loads the first time. React needs to render the
  // chart once in order to figure out the width of the surrounding div
  // element. Better not to show any graph than a graph with the wrong width
  // before resizing it to the appropriate width.
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const resize = () => {
      if (!chartRef?.current?.offsetWidth) return;
      const width = chartRef.current.offsetWidth;
      setChartWidth(width);
    };

    window.addEventListener("resize", resize);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [chartRef]);

  let title;
  if (category === "governance") {
    title = "Governance";
  } else if (category === "freedom") {
    title = "Freedom of Expression";
  } else if (category === "privacy") {
    title = "Privacy";
  } else {
    title = "UNKNOWN CATEGORY!!!";
  }

  return (
    <section className="mt-6 pt-6 pb-6 border-t-2 border-black m-2">
      <div className="font-circular text-md">Category</div>
      <h2 className="font-platform text-xl">{title}</h2>

      <div className="flex flex-col md:flex-row mt-8 md:mt-20">
        <div className="md:w-1/3 md:mr-2">
          <div className="flex md:h-64">
            <div className="flex flex-col">
              <h4 className="text-lg font-circular">Score 2019</h4>
              <div className="text-xl font-platform font-bold mb-2">
                {score}%
              </div>
            </div>

            <div className="flex flex-col ml-12">
              <h4 className="text-lg font-circular">Score 2020</h4>
              <div className="text-xl font-platform font-bold mb-2">
                {score}%
              </div>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{__html: text}} />
        </div>

        <div ref={chartRef} className="md:w-1/3">
          <h4 className="text-lg font-circular md:h-64 mt-4 md:mt-0">
            Indicators
          </h4>

          <CompanyIndicatorChart indicators={indicators} width={chartWidth} />
        </div>

        <div className="md:w-1/3 md:ml-2">
          <h4 className="text-lg font-circular md:h-64 mt-4 md:mt-0">
            Summary of changes
          </h4>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
