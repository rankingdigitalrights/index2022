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
      icon = (
        <ExecutiveSummary
          className={iconClassName}
          aria-label="Readmore summary icon"
        />
      );
      break;
    }
    case "introduction": {
      icon = (
        <Introduction
          className={iconClassName}
          aria-label="Readmore introduction icon"
        />
      );
      break;
    }
    case "key-findings": {
      icon = (
        <KeyFindings
          className={iconClassName}
          aria-label="Readmore key findings icon"
        />
      );
      break;
    }
    case "recommendations": {
      icon = (
        <Recommendations
          className={iconClassName}
          aria-label="Readmore recommendations icon"
        />
      );
      break;
    }
    case "methodology": {
      icon = (
        <Methodology
          className={iconClassName}
          aria-label="Readmore methodology icon"
        />
      );
      break;
    }
    case "context-before-code": {
      icon = (
        <ContextBeforeCode
          className={iconClassName}
          aria-label="Readmore context before code icon"
        />
      );
      break;
    }
    case "unaccountable-algorithms": {
      icon = (
        <Algorithms
          className={iconClassName}
          aria-label="Readmore unaccountable algorithms icon"
        />
      );
      break;
    }
    case "china-tech-giants": {
      icon = (
        <TechGiants
          className={iconClassName}
          aria-label="Readmore china tech giants icon"
        />
      );
      break;
    }
    case "compare": {
      icon = (
        <Compare
          className={iconClassName}
          aria-label="Readmore compare year on year icon"
        />
      );
      break;
    }
    case "indicators": {
      icon = (
        <Services
          className={iconClassName}
          aria-label="Readmore explore indicators icon"
        />
      );
      break;
    }
    case "services": {
      icon = (
        <Indicators
          className={iconClassName}
          aria-label="Readmore explore services icon"
        />
      );
      break;
    }
    default: {
      icon = (
        <KeyFindings
          className={iconClassName}
          aria-label="Readmore key findings icon"
        />
      );
    }
  }

  return (
    <div
      className={c("flex flex-col h-44 bg-white shadow-md p-3.5", className)}
    >
      <Link passHref href={readmore.url}>
        <a className="border-b mb-3 pb-2 flex items-center text-black no-underline">
          {icon}
          <span className="font-bold text-md ml-2 leading-none">
            {readmore.title}
          </span>
        </a>
      </Link>
      <p className="text-sm">{readmore.excerpt}</p>
    </div>
  );
};

export default Readmore;
