import c from "clsx";
import React from "react";

import CancelX from "../../static/cancel-x.svg";

export interface CompanyTagProps {
  company: string;
  active?: boolean;
}

const CompanyTag = ({company, active = false}: CompanyTagProps) => {
  const className = c(
    "flex justify-between items-center font-circular text-xxs rounded-lg px-2 py-1 text-center",
    {
      "bg-beige": !active,
      "bg-prissian text-white": active,
    },
  );

  return (
    <button className={className}>
      <span>{company}</span> {active && <CancelX className="ml-2" />}
    </button>
  );
};

export default CompanyTag;
