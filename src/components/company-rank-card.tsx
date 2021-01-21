/* eslint react/no-danger: off */
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
  basicInformation: string;
  className?: string;
}

const CompanyRankCard = ({
  company,
  score,
  rank,
  kind,
  counts,
  basicInformation,
  className,
}: CompanyRankCardProps) => {
  const rankLabel =
    kind === "telecom"
      ? `${counts} telecommunication companies`
      : `${counts} digital platforms`;

  const classNameLabel = "border border-white rounded ml-3 p-1";

  return (
    <div className={c("rank-card flex flex-col", className)}>
      <h1 className="font-platform text-white bold text-xl">{company}</h1>

      <div className="flex flex-wrap ">
        <div className="flex flex-col md:mr-2 lg:mr-8 mt-4">
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

      <div
        className="font-circular text-sm text-white mt-6"
        dangerouslySetInnerHTML={{
          __html: basicInformation,
        }}
      />
    </div>
  );
};

export default CompanyRankCard;
