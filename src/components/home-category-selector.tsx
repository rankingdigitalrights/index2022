import c from "clsx";
import React from "react";

import {IndicatorCategoryExt} from "../types";

interface HomeCategorySelectorProps {
  selected: IndicatorCategoryExt;
  onClick: (category: IndicatorCategoryExt) => void;
  className?: string;
}

const HomeCategorySelector = ({
  selected,
  onClick,
  className,
}: HomeCategorySelectorProps) => {
  const buttonClassName = "font-circular p-2 border rounded-md";

  const totalClassName = c(buttonClassName, "my-2 mr-2 text-prissian", {
    "border-prissian": selected !== "total",
    "border-white bg-prissian bg-opacity-25": selected === "total",
  });

  const governanceClassName = c(buttonClassName, "m-2 text-cat-governance", {
    "border-cat-governance": selected !== "governance",
    "border-white bg-cat-governance bg-opacity-25": selected === "governance",
  });

  const freedomClassName = c(buttonClassName, "m-2 text-cat-freedom", {
    "border-cat-freedom": selected !== "freedom",
    "border-white bg-cat-freedom bg-opacity-25": selected === "freedom",
  });

  const privacyClassName = c(buttonClassName, "m-2 text-cat-privacy", {
    "border-cat-privacy": selected !== "privacy",
    "border-white bg-cat-privacy bg-opacity-25": selected === "privacy",
  });

  return (
    <div
      className={c(
        "flex flex-wrap items-center font-circular text-sm",
        className,
      )}
    >
      <button className={totalClassName} onClick={() => onClick("total")}>
        Total
      </button>

      <button
        className={governanceClassName}
        onClick={() => onClick("governance")}
      >
        Governance
      </button>

      <button className={freedomClassName} onClick={() => onClick("freedom")}>
        Freedom of expression
      </button>

      <button className={privacyClassName} onClick={() => onClick("privacy")}>
        Privacy
      </button>
    </div>
  );
};

export default HomeCategorySelector;
