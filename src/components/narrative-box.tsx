import c from "clsx";
import Link from "next/link";
import React from "react";

import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import ScoresByIndicator from "../images/icons/scores-by-indicator.svg";

interface NarrativeBoxProps {
  kind: "methodology" | "scores" | "findings";
  className?: string;
}

const NarrativeBox = ({kind, className}: NarrativeBoxProps) => {
  let title;
  let text;
  let icon;
  let href;

  switch (kind) {
    case "scores": {
      title = "Scores by indicator";
      icon = <ScoresByIndicator className="flex-none w-6 h-6" />;
      text = "Find out how companies did on specific issues in 2020";
      href = "/explore-indicators";
      break;
    }
    case "findings": {
      title = "Key findings";
      icon = <KeyFindings className="flex-none w-6 h-6" />;
      text = "Companies are improving in principle, but failing in practice.";
      href = "/key-findings";
      break;
    }
    case "methodology": {
      title = "Methodology";
      icon = <Methodology className="flex-none w-6 h-6" />;
      text =
        "Our methodology builds on more than a decade of work by the human rights, privacy, and security communities";
      href = "/methodology";
      break;
    }
    default:
      return <div />;
  }

  return (
    <div
      className={c("flex flex-col h-44 bg-white shadow-md p-3.5", className)}
    >
      <Link passHref href={href}>
        <a className="border-b mb-3 pb-2 flex items-center text-black no-underline">
          {icon}
          <span className="font-circular font-bold text-md ml-2">{title}</span>
        </a>
      </Link>
      <p className="font-circular text-sm">{text}</p>
    </div>
  );
};

export default NarrativeBox;
