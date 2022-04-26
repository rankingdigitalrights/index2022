import c from "clsx";
import React from "react";

import type {IndicatorLens, IndicatorLensIndex} from "../types";
import LensCircle from "./lens-circle";
import PillHeader from "./pill-header";
import RankChart from "./rank-chart";

interface LensScoreProps {
  lenses: IndicatorLensIndex[];
  className?: string;
  companyList: string[];
}

const lensDescription = (lens: IndicatorLens) => {
  switch (lens) {
    case "algorithmic-transparency": {
      return `This lens groups indicators that ask questions about whether companies conduct human rights impact assessments on algorithmic systems and whether they disclose how they use and develop algorithms. The scores are an average of the following indicators: G1, element 3; G4(d); F1(d); F2(d); F3(a), element 4; F3(c), element 4; F12; F13; P1b; P2(b); and P7, elements 7 and 8.`;
    }
    case "targeted-advertising": {
      return `This lens groups indicators that ask whether companies conduct human rights impact assessments on their targeted advertising systems, and whether they clearly disclose rules around ad targeting and how those rules are enforced.

The scores are an average of the following indicators: G4(c); F1(b); F2(b); F1(c); F2(c); F3(b); F3(c); F4(c); P3(a); P3(b); P4; P5; P7; P8, elements 5 and 6; and P9.`;
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
          {lenses.slice(0, divider).map(({lens, lensPretty, scores}) => {
            return (
              <li key={lens} className="flex flex-col mt-2">
                <PillHeader className="flex items-center">
                  <>
                    <LensCircle lens={lens} className="w-4 h-4 mr-3 grow-0" />
                    <span className="grow">{lensPretty}</span>
                  </>
                </PillHeader>

                <p className="font-sans text-xs mt-3 h-32 whitespace-pre-line">
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
          {lenses.slice(divider).map(({lens, lensPretty, scores}) => {
            return (
              <li key={lens} className="flex flex-col mt-2">
                <PillHeader className="flex">
                  <>
                    <LensCircle lens={lens} className="w-4 h-4 mr-3 grow-0" />
                    <span className="grow">{lensPretty}</span>
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
