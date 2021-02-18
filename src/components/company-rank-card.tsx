/* eslint react/no-danger: off */
import c from "clsx";
import React from "react";

import {enumerate} from "../utils";

interface CompanyRankCardProps {
  company: string;
  score: number;
  rank: number;
  basicInformation: string;
  className?: string;
}

const CompanyRankCard = ({
  company,
  score,
  rank,
  basicInformation,
  className,
}: CompanyRankCardProps) => {
  const classNameLabel = "border border-white rounded ml-3 p-1";

  return (
    <div className={c("rank-card flex flex-col", className)}>
      <h1 className="font-platform text-white bold text-xl py-4">{company}</h1>

      <div className="flex flex-wrap ">
        <div className="flex items-center font-circular text-white text-md font-bold mt-4 mr-6 md:mr-8 lg:mr-16">
          <span className="mr-3">Rank:</span>{" "}
          <span className={classNameLabel}>{enumerate(rank)}</span>
        </div>

        <div className="flex items-center font-circular text-white text-md font-bold mt-4">
          <span className="mr-3">Score:</span>{" "}
          <span className={classNameLabel}>{score}%</span>
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
