import c from "clsx";
import React from "react";

import type { IndicatorLensIndex } from "../types";
import LensCircle from "./lens-circle";
import RankChart from "./rank-chart-nolabel";

interface LensScoreProps {
  lenses: IndicatorLensIndex[];
  className?: string;
  companyList: [];
}

const LensScore = ({ lenses, className, companyList }: LensScoreProps) => {
  return (
    <ul className={c("ml-0 space-y-12", className)}>
      {lenses.map(({lens, lensPretty, scores, average}) => {
        return (
          <li key={lens} className="flex flex-col mt-2">
            <div className="rounded-full bg-beige font-sans font-bold py-5 px-4 flex items-center">
              <LensCircle lens={lens} className="w-4 h-4 mr-3 grow-0" />
              <span className="grow">{lensPretty}</span>
              <span className="self-end text-prissian">{average}%</span>
            </div>
            <RankChart
              ranking={
                companyList.length > 0 ?
                  (scores.filter((score) => {
                    return companyList.includes(score.id)
                  }))
                  : scores
              }
            />
          </li>
        );
      })}
    </ul>
  );
};

export default LensScore;
