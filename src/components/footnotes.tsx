import React from "react";

interface FootnotesProps {
  source: React.ReactNode;
}

const Footnotes = ({source}: FootnotesProps) => {
  return (
    <div className="border-t-2 border-prissian text-sm mt-12">
      <h2>Footnotes</h2>

      {source}
    </div>
  );
};

export default Footnotes;
