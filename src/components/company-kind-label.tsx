import c from "clsx";
import React from "react";

import {CompanyKind} from "../types";

interface CompanyKindLabelProps {
  kind: CompanyKind;
  theme?: "light" | "dark";
}

const telecomText = "Telecommunications company";
const platformsText = "Digital platforms";

const CompanyKindLabel = ({kind, theme = "light"}: CompanyKindLabelProps) => {
  const text = kind === "telecom" ? telecomText : platformsText;

  const labelClassName = {
    "text-white": theme === "light",
    "text-black": theme === "dark",
  };
  const dotClassName = {
    "bg-diff-del": kind === "telecom",
    "bg-accent-orange": kind === "internet",
  };

  return (
    <div
      className={c("font-circular text-xxs flex items-center", labelClassName)}
    >
      <div
        className={c("rounded-full border border-white w-3 h-3", dotClassName)}
      />

      <div className="ml-2">{text}</div>
    </div>
  );
};

export default CompanyKindLabel;
