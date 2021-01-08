import c from "clsx";
import React from "react";

import {CompanyKind} from "../types";
import {enumerate} from "../utils";

interface CompanyRankCardProps {
  company: string;
  score: number;
  rank: number;
  kind: CompanyKind;
  counts: number;
  className?: string;
}

const CompanyRankCard = ({
  company,
  score,
  rank,
  kind,
  counts,
  className,
}: CompanyRankCardProps) => {
  const rankLabel =
    kind === "telecom"
      ? `${counts} telecommunication companies`
      : `${counts} digital platforms`;

  const classNameLabel = "border border-white rounded ml-3 p-1";

  return (
    <div className={c("flex flex-col", className)}>
      <h1 className="font-platform text-white bold text-xl">{company}</h1>

      <div className="flex flex-wrap ">
        <div className="flex flex-col mr-8 mt-4">
          <div className="flex items-center font-circular text-white text-md bold">
            <span className="mr-3">Ranked:</span>{" "}
            <span className={classNameLabel}>{enumerate(rank)}</span>
          </div>
          <span className="font-circular text-sm text-disabled-dark mt-3">
            Out of {rankLabel}.
          </span>
        </div>

        <div className="flex flex-col mt-4">
          <div className="flex items-center font-circular text-white text-md bold">
            <span className="mr-3">Scored:</span>{" "}
            <span className={classNameLabel}>{score}%</span>
          </div>
          <span className="font-circular text-sm text-disabled-dark mt-3">
            Out of 100 possible points.
          </span>
        </div>
      </div>

      <p className="font-circular text-sm text-white mt-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Arcu cursus vitae
        congue mauris rhoncus aenean. Odio pellentesque diam volutpat commodo
        sed egestas egestas fringilla phasellus.
      </p>
    </div>
  );
};

export default CompanyRankCard;
