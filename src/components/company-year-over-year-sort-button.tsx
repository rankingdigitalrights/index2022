import c from "clsx";
import React from "react";

import ChevronDown from "../images/icons/chevron-down.svg";
import ChevronUp from "../images/icons/chevron-up.svg";

interface CompanyYearOverYearSortButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

const CompanyYearOverYearSortButton = ({
  label,
  isSelected,
  onClick,
  className,
}: CompanyYearOverYearSortButtonProps) => {
  return isSelected ? (
    <div className={c("flex items-center space-x-2", className)}>
      <span>{label}</span>
      <ChevronDown aria-label={`Sorted by ${label}`} />
    </div>
  ) : (
    <button
      className={c("flex items-center space-x-2", className)}
      onClick={() => onClick()}
    >
      <span>{label}</span>
      <div className="flex flex-col items-center space-y-0.5">
        <ChevronUp aria-label={`Sort by ${label}`} />
        <ChevronDown aria-label={`Sort by ${label}`} />
      </div>
    </button>
  );
};

export default CompanyYearOverYearSortButton;
