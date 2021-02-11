import c from "clsx";
import React from "react";

interface DonateProps {
  className?: string;
}
const Donate = ({className}: DonateProps) => {
  return (
    <div
      className={c(
        "flex flex-col items-center bg-accent-red shadow-md text-white text-center py-6",
        className,
      )}
    >
      <span className="font-platform font-bold text-md">
        Support Ranking Digital Rights!
      </span>

      <p className="font-circular text-sm my-6">
        Digital platforms and telecommunications companies are becoming more
        powerful every day. Donate to Ranking Digital Rights and help us hold
        them accountable to the public!
      </p>

      <a
        href="https://newamerica.org"
        className="w-28 bg-white font-circular font-bold text-sm text-center text-accent-red rounded-md px-4 py-2 uppercase"
      >
        Donate
      </a>
    </div>
  );
};

export default Donate;
