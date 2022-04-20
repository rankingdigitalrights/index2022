import c from "clsx";
import Link from "next/link";
import React from "react";

import Ads from "../images/icons/ads.svg";
import ChinaCompanies from "../images/icons/china-companies.svg";
import ExecutiveSummary from "../images/icons/executive-summary.svg";
import Services from "../images/icons/explore-the-data.svg";
import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import Indicators from "../images/icons/scores-by-indicator.svg";
import Compare from "../images/icons/scores-over-time.svg";
import Shareholders from "../images/icons/shareholders.svg";
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
    case "key-findings": {
      icon = (
        <KeyFindings
          className={iconClassName}
          aria-label="Readmore key findings icon"
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
    case "shareholders": {
      icon = (
        <Shareholders
          className={iconClassName}
          aria-label="Readmore shareholders icon"
        />
      );
      break;
    }
    case "ads": {
      icon = <Ads className={iconClassName} aria-label="Readmore ads icon" />;
      break;
    }
    case "china-companies": {
      icon = (
        <ChinaCompanies
          className={iconClassName}
          aria-label="Readmore shareholders icon"
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
    case "data": {
      icon = (
        <Services
          className={iconClassName}
          aria-label="Readmore explore indicators icon"
        />
      );
      break;
    }
    case "indicators": {
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
          <span className="font-bold text-md ml-2 leading-none font-sans">
            {readmore.title}
          </span>
        </a>
      </Link>
      <p className="text-sm">{readmore.excerpt}</p>
    </div>
  );
};

export default Readmore;
