import c from "clsx";
import React from "react";

import type {IndicatorLens, IndicatorLensIndex} from "../types";
import LensCircle from "./lens-circle";
import PillHeader from "./pill-header";
import RankChart from "./rank-chart-nolabel";

interface LensScoreProps {
  lenses: IndicatorLensIndex[];
  className?: string;
  companyList: string[];
}

const lensDescription = (lens: IndicatorLens) => {
  switch (lens) {
    case "algorithmic-transparency": {
      return `This Lens groups indicators that ask questions about whether
              companies make a commitment to human rights in the development and
              deployment of their algorithmic systems, conduct human rights
              impact assessments on those systems, make related policies
              accessible, disclose how they use algorithms to curate, recommend,
              and rank content, and how they use algorithms to collect, process,
              and make inferences about user data.`;
    }
    case "targeted-advertising": {
      return `This Lens
          groups indicators that ask whether companies conduct human rights
          impact assessments on their targeted advertising systems, as well as
          whether they clearly disclose rules around ad targeting and how those
          rules are enforced.`;
    }
    default:
      return "";
  }
};

const LensScore = ({lenses, className, companyList}: LensScoreProps) => {
  const divider = Math.ceil(lenses.length / 2);

  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row font-sans">
      <div className="w-full md:w-1/2">
        <ul className={c("ml-0 space-y-12", className)}>
          {lenses
            .slice(0, divider)
            .map(({lens, lensPretty, scores, average}) => {
              return (
                <li key={lens} className="flex flex-col mt-2">
                  <PillHeader className="flex items-center">
                    <>
                      <LensCircle lens={lens} className="w-4 h-4 mr-3 grow-0" />
                      <span className="grow">{lensPretty}</span>
                      <span className="self-end text-prissian">{average}%</span>
                    </>
                  </PillHeader>

                  <p className="font-sans text-xs mt-3 h-32">
                    {lensDescription(lens)}
                  </p>

                  <RankChart
                    ranking={
                      companyList.length > 0
                        ? scores.filter((score) => {
                            return companyList.includes(score.id);
                          })
                        : scores
                    }
                  />
                </li>
              );
            })}
        </ul>
      </div>

      <div className="w-full md:w-1/2">
        <ul className={c("ml-0 space-y-12", className)}>
          {lenses.slice(divider).map(({lens, lensPretty, scores, average}) => {
            return (
              <li key={lens} className="flex flex-col mt-2">
                <PillHeader className="flex items-center">
                  <>
                    <LensCircle lens={lens} className="w-4 h-4 mr-3 grow-0" />
                    <span className="grow">{lensPretty}</span>
                    <span className="self-end text-prissian">{average}%</span>
                  </>
                </PillHeader>

                <p className="font-sans text-xs mt-3 h-32">
                  {lensDescription(lens)}
                </p>

                <RankChart
                  ranking={
                    companyList.length > 0
                      ? scores.filter((score) => {
                          return companyList.includes(score.id);
                        })
                      : scores
                  }
                  rankColorClass={`bg-lens-${lens}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LensScore;
