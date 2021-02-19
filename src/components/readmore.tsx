import c from "clsx";
import Link from "next/link";
import React from "react";

import TechGiants from "../images/icons/china-tech-giants.svg";
import ContextBeforeCode from "../images/icons/context-before-code.svg";
import ExecutiveSummary from "../images/icons/executive-summary.svg";
import Services from "../images/icons/explore-the-data.svg";
import Introduction from "../images/icons/intro-essay.svg";
import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import Algorithms from "../images/icons/moving-fast.svg";
import Recommendations from "../images/icons/policy-recommendations.svg";
import Indicators from "../images/icons/scores-by-indicator.svg";
import Compare from "../images/icons/scores-over-time.svg";
import {ReadmoreItem} from "../types";

interface ReadmoreProps {
  readmore: ReadmoreItem;
  className?: string;
}

const Readmore = ({readmore, className}: ReadmoreProps) => {
  const iconClassName = "flex-none w-6 h-6 place-self-start";
  let icon;

  switch (readmore.kind) {
    case "summary": {
      icon = <ExecutiveSummary className={iconClassName} />;
      break;
    }
    case "introduction": {
      icon = <Introduction className={iconClassName} />;
      break;
    }
    case "key-findings": {
      icon = <KeyFindings className={iconClassName} />;
      break;
    }
    case "recommendations": {
      icon = <Recommendations className={iconClassName} />;
      break;
    }
    case "methodology": {
      icon = <Methodology className={iconClassName} />;
      break;
    }
    case "context-before-code": {
      icon = <ContextBeforeCode className={iconClassName} />;
      break;
    }
    case "unaccountable-algorithms": {
      icon = <Algorithms className={iconClassName} />;
      break;
    }
    case "china-tech-giants": {
      icon = <TechGiants className={iconClassName} />;
      break;
    }
    case "compare": {
      icon = <Compare className={iconClassName} />;
      break;
    }
    case "indicators": {
      icon = <Services className={iconClassName} />;
      break;
    }
    case "services": {
      icon = <Indicators className={iconClassName} />;
      break;
    }
    default: {
      icon = <KeyFindings className={iconClassName} />;
    }
  }

  return (
    <div
      className={c("flex flex-col h-44 bg-white shadow-md p-3.5", className)}
    >
      <Link passHref href={readmore.url}>
        <a className="border-b mb-3 pb-2 flex items-center text-black no-underline">
          {icon}
          <span className="font-circular font-bold text-md ml-2 leading-none">
            {readmore.title}
          </span>
        </a>
      </Link>
      <p className="font-circular text-sm">{readmore.excerpt}</p>
    </div>
  );
};

export default Readmore;
