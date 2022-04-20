import c from "clsx";
import React from "react";

import type {IndicatorLensIndex} from "../types";
import LensCircle from "./lens-circle";
import RankChart from "./rank-chart-nolabel";

interface LensScoreProps {
  lenses: IndicatorLensIndex[];
  className?: string;
}

const LensScore = ({lenses, className}: LensScoreProps) => {
  return (
    <ul className={c("space-y-12", className)}>
      {lenses.map(({lens, lensPretty, scores}) => {
        return (
          <li key={lens} className="flex flex-col mt-2">
            <div className="rounded-full bg-beige font-sans font-bold py-5 pl-4 flex items-center">
              <LensCircle lens={lens} className="w-4 h-4 mr-3" /> {lensPretty}
            </div>

            <RankChart ranking={scores} />
          </li>
        );
      })}
    </ul>
  );
};

export default LensScore;
