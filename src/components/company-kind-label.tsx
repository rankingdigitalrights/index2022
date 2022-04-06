import c from "clsx";
import React from "react";

import {CompanyKind} from "../types";

interface CompanyKindLabelProps {
  kind: CompanyKind;
  theme?: "light" | "dark";
  className?: string;
}

const telecomText = "Telecommunications companies";
const platformsText = "Digital platforms";

const CompanyKindLabel = ({
  kind,
  className,
  theme = "light",
}: CompanyKindLabelProps) => {
  const text = kind === "telecom" ? telecomText : platformsText;

  const labelClassName = {
    "text-white": theme === "light",
    "text-black": theme === "dark",
  };
  const dotClassName = {
    "bg-accent-orange": kind === "telecom",
    "bg-diff-del": kind === "internet",
  };

  return (
    <div className={c("text-sm flex items-center", labelClassName, className)}>
      <div className={c("rounded-full w-2.5 h-2.5", dotClassName)} />

      <div className="ml-2">{text}</div>
    </div>
  );
};

export default CompanyKindLabel;
