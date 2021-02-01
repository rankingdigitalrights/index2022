import React from "react";

import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import ScoresByIndicator from "../images/icons/scores-by-indicator.svg";

interface NarrativeBoxProps {
  kind: "methodology" | "scores" | "findings";
}

const NarrativeBox = ({kind}: NarrativeBoxProps) => {
  let title;
  let text;
  let icon;

  switch (kind) {
    case "scores": {
      title = "Scores by indicator";
      icon = <ScoresByIndicator className="flex-none w-6 h-6" />;
      text =
        "Since the mid-1990s, more than 200 people have been sentenced to more than 1,100 years in prison in six Western Balkans countries for terrorist acts, or for leaving to fight in a foreign war, according to BIRN analysis.";
      break;
    }
    case "findings": {
      title = "Key findings";
      icon = <KeyFindings className="flex-none w-6 h-6" />;
      text =
        "Since the mid-1990s, more than 200 people have been sentenced to more than 1,100 years in prison in six Western Balkans countries for terrorist acts, or for leaving to fight in a foreign war, according to BIRN analysis.";
      break;
    }
    case "methodology": {
      title = "Methodology";
      icon = <Methodology className="flex-none w-6 h-6" />;
      text =
        "Since the mid-1990s, more than 200 people have been sentenced to more than 1,100 years in prison in six Western Balkans countries for terrorist acts, or for leaving to fight in a foreign war, according to BIRN analysis.";
      break;
    }
    default:
      return <div />;
  }

  return (
    <div className="flex flex-col h-48 w-128 md:w-60 bg-white shadow-md m-3 p-3">
      <div className="border-b mb-3 pb-2 flex items-center">
        {icon}
        <span className="font-circular font-bold text-md ml-2">{title}</span>
      </div>
      <p className="font-circular text-sm leading-3">{text}</p>
    </div>
  );
};

export default NarrativeBox;
