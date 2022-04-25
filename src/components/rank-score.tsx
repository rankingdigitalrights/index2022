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
        "text-right pl-1 pr-1 select-none float-right hover-colors",
        className,
      )}
    >
      {score}%
    </span>
  );
};

export default RankScore;
