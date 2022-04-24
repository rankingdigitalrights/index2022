import c from "clsx";
import React from "react";

interface RankLabelProps {
  rank: number;
  className?: string;
}

const RankLabel = ({rank, className}: RankLabelProps) => {
  return (
    <span className="w-8 flex justify-center">
      <span
        className={c(
          "rounded-full h-5 w-5 text-white text-xs font-sans flex items-center justify-center",
          "transform-gpu transform-safari transition-colors ease-in-out duration-200",
          className,
        )}
      >
        {rank}
      </span>
    </span>
  );
};

export default RankLabel;
