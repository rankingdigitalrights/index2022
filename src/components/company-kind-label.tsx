import c from "clsx";
import React from "react";

import {CompanyKind} from "../types";

interface CompanyKindLabelProps {
  kind: CompanyKind;
  theme?: "light" | "dark";
  home?: boolean;
  className?: string;
}

const telecomText = "Telecommunications company";
const platformsText = "Digital platform";
const telecomTextHome = "Telecoms";
const platformsTextHome = "Platforms";

const CompanyKindLabel = ({
  kind,
  className,
  theme = "light",
  home = false,
}: CompanyKindLabelProps) => {
  let text = kind === "telecom" ? telecomText : platformsText;

  if (home) {
    text = kind === "telecom" ? telecomTextHome : platformsTextHome;
  }

  const textSize = home ? "text-xs" : "text-sm";

  const labelClassName = {
    "text-white": theme === "light",
    "text-black": theme === "dark",
  };
  const dotClassName = {
    "bg-accent-orange": kind === "telecom",
    "bg-diff-del": kind === "internet",
  };

  return (
    <div
      className={c(
        "font-circular flex items-center",
        textSize,
        labelClassName,
        className,
      )}
    >
      <div
        className={c("rounded-full border border-white w-3 h-3", dotClassName)}
      />

      <div className="ml-2">{text}</div>
    </div>
  );
};

export default CompanyKindLabel;
