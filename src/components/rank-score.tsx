import c from "clsx";
import React from "react";

import {IndicatorScore} from "../types";

interface RankScoreProps {
  score: IndicatorScore;
  className?: string;
}

const RankScore = ({score, className}: RankScoreProps) => {
  return (
    <span
      className={c(
        "shrink-0 text-right w-12 pl-1 pr-1 select-none float-right",
        "transform-gpu transform-safari transition-colors ease-in-out duration-200",
        className,
      )}
    >
      {score}%
    </span>
  );
};

export default RankScore;
