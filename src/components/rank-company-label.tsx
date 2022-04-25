import c from "clsx";
import Link from "next/link";
import React from "react";

interface RankCompanyLabelProps {
  id: string;
  name: string;
  className?: string;
}

const RankCompanyLabel = ({id, name, className}: RankCompanyLabelProps) => {
  return (
    <Link passHref href={`/companies/${id}`}>
      <a
        className={c(
          "flex-none font-normal select-none whitespace-nowrap hover-colors",
          className,
        )}
      >
        {name}
      </a>
    </Link>
  );
};

export default RankCompanyLabel;
