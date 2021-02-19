import c from "clsx";
import React from "react";

interface DonateProps {
  className?: string;
}
const Donate = ({className}: DonateProps) => {
  return (
    <div
      className={c(
        "flex flex-col items-center bg-accent-red shadow-md text-white text-center p-6",
        className,
      )}
    >
      <span className="font-platform font-bold text-md">
        Support Ranking Digital Rights!
      </span>

      <p className="font-circular text-sm my-6">
        Tech companies wield unprecedented power in the digital age. Ranking
        Digital Rights helps hold them accountable for their obligations to
        protect and respect their users’ rights.
        <br />
        <br />
        As a nonprofit initiative that <u>receives no corporate funding</u>, we
        need your support. Help us guarantee future editions of the RDR Index by
        making a donation. Do your part to help keep tech power in check!
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
