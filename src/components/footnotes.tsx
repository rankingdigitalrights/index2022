import c from "clsx";
import React from "react";

interface FootnotesProps {
  source: React.ReactNode;
  className?: string;
}

const Footnotes = ({source, className}: FootnotesProps) => {
  return (
    <div className={c("border-t-2 border-prissian mt-6 text-sm", className)}>
      <h2 className="mb-3">Footnotes</h2>

      {source}
    </div>
  );
};

export default Footnotes;
