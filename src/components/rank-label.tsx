import c from "clsx";
import React from "react";

interface RankLabelProps {
  rank: number;
  className?: string;
}

const RankLabel = ({ rank, className }: RankLabelProps) => {
  return (
    <div className="w-8 flex justify-center" >
      <div
        className={
          c(
            "rounded-full h-5 w-5 text-white text-xs font-sans flex items-center justify-center",
            className,
          )
        }
      >
        {rank}
      </div >
    </div >
  );
};

export default RankLabel;