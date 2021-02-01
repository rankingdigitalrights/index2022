import c from "clsx";
import React, {useState} from "react";

import ChevronDown from "../images/icons/chevron-down.svg";
import ChevronUp from "../images/icons/chevron-up.svg";
import {identity} from "../utils";

interface MenuBarColumnProps {
  title: string;
  isExpandable?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const MenuBarColumn = ({
  title,
  isExpandable = false,
  className,
  children,
}: MenuBarColumnProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandColumn = () => setIsExpanded(!isExpanded);

  const showChildren = !isExpandable || isExpanded;
  const columnHeaderClassName = {
    "cursor-text": !isExpandable,
  };

  return (
    <div className={c("flex flex-col", className)}>
      <button
        className={c(
          "flex items-center justify-between uppercase font-circular font-bold border-b-2 border-disabled-dark w-full py-6 md:py-0 md:pb-1",
          columnHeaderClassName,
        )}
        onClick={() => (isExpandable ? handleExpandColumn() : identity())}
      >
        {title}
        {isExpandable && (
          <span>{isExpanded ? <ChevronUp /> : <ChevronDown />}</span>
        )}
      </button>
      {showChildren && children}
    </div>
  );
};

export default MenuBarColumn;
