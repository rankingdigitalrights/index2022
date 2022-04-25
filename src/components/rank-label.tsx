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
          "rounded-full h-5 w-5 text-white text-xs font-sans flex items-center justify-center hover-colors",
          className,
        )}
      >
        {rank}
      </span>
    </span>
  );
};

export default RankLabel;
