import c from "clsx";
import React from "react";

interface NarrativeTitleProps {
  title: React.ReactNode;
  byLine?: string;
}

const NarrativeTitle = ({title, byLine}: NarrativeTitleProps) => {
  return (
    <div
      className={c(
        "mb-6 border-b border-prissian pt-12",
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
