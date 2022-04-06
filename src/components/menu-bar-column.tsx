import c from "clsx";
import React from "react";

import ChevronDown from "../images/icons/chevron-down.svg";
import ChevronUp from "../images/icons/chevron-up.svg";
import {identity} from "../utils";

interface MenuBarColumnProps {
  title: string;
  isExpandable?: boolean;
  isExpanded?: boolean;
  className?: string;
  children?: React.ReactNode;
  onExpand: (toggle: boolean) => void;
}

const MenuBarColumn = ({
  title,
  isExpandable = false,
  isExpanded,
  className,
  children,
  onExpand,
}: MenuBarColumnProps) => {
  const handleExpandColumn = () => {
    onExpand(!isExpanded);
  };

  const showChildren = !isExpandable || isExpanded;
  const columnHeaderClassName = {
    "cursor-text": !isExpandable,
  };

  return (
    <div className={c("flex flex-col", className)}>
      <button
        className={c(
          "flex items-center justify-between uppercase font-bold border-b-2 border-disabled-dark w-full py-6 md:py-0 md:pb-1",
          columnHeaderClassName,
        )}
        onClick={() => (isExpandable ? handleExpandColumn() : identity())}
      >
        {title}
        {isExpandable && (
          <span>
            {isExpanded ? (
              <ChevronUp aria-label="Close menu bar icon" />
            ) : (
              <ChevronDown aria-label="Open menu bar icon" />
            )}
          </span>
        )}
      </button>
      {showChildren && children}
    </div>
  );
};

export default MenuBarColumn;
