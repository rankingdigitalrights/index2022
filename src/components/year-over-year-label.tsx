import c from "clsx";
import Link from "next/link";
import React from "react";

import ArrowDown from "../images/icons/arrow-down.svg";
import ArrowUp from "../images/icons/arrow-up.svg";
import Dash from "../images/icons/dash.svg";

interface YearOverYearLabelProps {
  value: number;
  year: "2022" | "2020" | "2019" | "2018" | "2017";
  className?: string;
}

const YearOverYearLabel = ({
  value,
  year,
  className,
}: YearOverYearLabelProps) => {
  const isIncrease = value > 0;
  const isDecrease = value < 0;
  const isUnchanged = value === 0;

  const iconClassName = {
    "bg-diff-add": isIncrease,
    "bg-diff-del": isDecrease,
    "bg-grey-500": isUnchanged,
  };

  const valueClassName = {
    "border-diff-add": isIncrease,
    "border-diff-del": isDecrease,
    "border-grey-500": isUnchanged,
  };

  const numYear = Number.parseInt(year, 10);
  let desc = `Stayed the same on comparable indicators since the ${
    numYear - 1
  } RDR Index.`;
  let numModifier = "";
  let icon = <Dash className="w-6 h-6" aria-label="No change icon" />;
  if (isIncrease) {
    desc = `Gained ${value} points on comparable indicators since the ${
      numYear - 1
    } RDR Index.`;
    numModifier = "+ ";
    icon = <ArrowUp className="w-6 h-6" aria-label="Positive change icon" />;
  }
  if (isDecrease) {
    desc = `Lost ${value} points on comparable indicators since the ${
      numYear - 1
    } RDR Index.`;
    icon = <ArrowDown className="w-6 h-6" aria-label="Negative change icon" />;
  }

  return (
    <div className={c("flex flex-col", className)}>
      <div className="flex">
        <Link href="/compare">
          <a
            className={c(
              "flex items-center justify-around rounded-md p-2 w-10 cursor-pointer",
              iconClassName,
            )}
          >
            {icon}
          </a>
        </Link>

        <span
          className={c(
            "font-bold text-md border rounded-md ml-2 px-2 py-1",
            valueClassName,
          )}
        >
          {numModifier}
          {value} points
        </span>
      </div>

      <p className="text-sm mt-3">{desc}</p>
    </div>
  );
};

export default YearOverYearLabel;
