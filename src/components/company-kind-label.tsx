import c from "clsx";
import React from "react";

import {CompanyKind} from "../types";

interface CompanyKindLabelProps {
  kind: CompanyKind;
}

const telecomText = "Telecommunications company";
const platformsText = "Digital platforms";

const CompanyKindLabel = ({kind}: CompanyKindLabelProps) => {
  const text = kind === "telecom" ? telecomText : platformsText;

  const className = {
    "bg-diff-del": kind === "telecom",
    "bg-accent-orange": kind === "internet",
  };

  return (
    <div className="font-circular text-white text-xxs flex items-center">
      <div
        className={c("rounded-full border border-white w-3 h-3", className)}
      />

      <div className="ml-2">{text}</div>
    </div>
  );
};

export default CompanyKindLabel;
