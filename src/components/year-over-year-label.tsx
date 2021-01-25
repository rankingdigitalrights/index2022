import c from "clsx";
import React from "react";

import ArrowDown from "../images/icons/arrow-down.svg";
import ArrowUp from "../images/icons/arrow-up.svg";
import Dash from "../images/icons/dash.svg";

interface YearOverYearLabelProps {
  value: number;
  year: "2020" | "2019" | "2018" | "2017";
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
  let icon = <Dash />;
  if (isIncrease) {
    desc = `Gained ${value} points on comparable indicators since the ${
      numYear - 1
    } RDR Index.`;
    numModifier = "+ ";
    icon = <ArrowUp />;
  }
  if (isDecrease) {
    desc = `Lost ${value} points on comparable indicators since the ${
      numYear - 1
    } RDR Index.`;
    icon = <ArrowDown />;
  }

  return (
    <div className={c("flex flex-col", className)}>
      <div className="flex">
        <span
          className={c(
            "flex items-center justify-around rounded-md p-2 w-10",
            iconClassName,
          )}
        >
          {icon}
        </span>
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

      <p className="text-xs mt-3">{desc}</p>
    </div>
  );
};

export default YearOverYearLabel;
