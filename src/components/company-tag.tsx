import c from "clsx";
import React from "react";

import CancelX from "../images/icons/cancel.svg";

export interface CompanyTagProps {
  company: string;
  onClick?: () => void;
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
    className,
  );

  return (
    <button className={className2} onClick={onClick}>
      <span>{company}</span>{" "}
      {active && <CancelX className="ml-2 w-2 h-2 text-white fill-current" />}
    </button>
  );
};

export default CompanyTag;
