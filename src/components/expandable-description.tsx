import React, {useState} from "react";

import ChevronDown from "../../static/chevron-down.svg";
import ChevronUp from "../../static/chevron-up.svg";

interface ExpandableDescriptionProps {
  label: string;
  children: React.ReactNode;
}

const ExpandableDescription = ({
  label,
  children,
}: ExpandableDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col">
      <button className="flex items-center" onClick={toggleExpanded}>
        <span className="text-prissian text-sm font-circular">{label}</span>

        {isExpanded ? (
          <ChevronDown className="ml-2 text-prissian stroke-current" />
        ) : (
          <ChevronUp className="ml-2 text-prissian stroke-current" />
        )}
      </button>

      {isExpanded && children}
    </div>
  );
};

export default ExpandableDescription;
