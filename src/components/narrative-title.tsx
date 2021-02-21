import c from "clsx";
import React from "react";

interface NarrativeTitleProps {
  title: React.ReactNode;
  byLine?: string;
  transparent?: boolean;
}

const NarrativeTitle = ({
  title,
  byLine,
  transparent = false,
}: NarrativeTitleProps) => {
  const spacingClassName = {
    "mb-6 mt-3 md:mt-12": !transparent,
    "mb-6 mt-3 md:mt-3": transparent,
  };

  return (
    <div
      className={c(
        "border-b border-prissian",
        spacingClassName,
        byLine ? "pb-4" : "pb-2",
      )}
    >
      <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
        {title}
      </h1>

      {byLine && <span className="font-platform text-sm">By {byLine}</span>}
    </div>
  );
};

export default NarrativeTitle;
