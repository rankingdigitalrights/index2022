import c from "clsx";
import React from "react";

import CancelX from "../../static/cancel-x.svg";

export interface CompanyTagProps {
  company: string;
  onClick: () => void;
  active?: boolean;
  className?: string;
}

const CompanyTag = ({
  company,
  className,
  onClick,
  active = false,
}: CompanyTagProps) => {
  const className2 = c(
    "flex justify-between items-center font-circular text-xxs rounded-lg px-2 py-1 text-center",
    {
      "bg-beige": !active,
      "bg-prissian text-white": active,
    },
    className,
  );

  return (
    <button className={className2} onClick={onClick}>
      <span>{company}</span> {active && <CancelX className="ml-2" />}
    </button>
  );
};

export default CompanyTag;
