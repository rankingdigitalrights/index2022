import c from "clsx";
import React, {useEffect, useRef, useState} from "react";

import {IndicatorCategory, IndicatorNested} from "../types";
import CompanyIndicatorChart from "./company-indicator-chart";

interface CompanySectionProps {
  category: IndicatorCategory;
  text: string;
  indicators: IndicatorNested[];
}

const CompanySection = ({category, text, indicators}: CompanySectionProps) => {
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

  const titleClassName = c("font-platform text-xl", {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
  });

  return (
    <section className="mt-6 pb-6 border-t border-disabled-dark m-2">
      <div className="flex flex-col md:flex-row mt-8 md:mt-16 font-circular text-sm">
        <div className="md:w-4/6 md:mr-3">
          <div className="flex flex-col justify-end mb-12 md:h-16">
            <div className="font-circular text-md text-prissian">Category</div>
            <h2 className={titleClassName}>{title}</h2>
          </div>

          <div dangerouslySetInnerHTML={{__html: text}} />
        </div>

        <div ref={chartRef} className="md:w-2/6 md:ml-3">
          <div className="flex flex-col justify-end md:h-16 mb-12 mt-4 md:mt-0">
            <h3 className="text-lg font-circular">Indicators</h3>
          </div>

          <CompanyIndicatorChart indicators={indicators} width={chartWidth} />
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
