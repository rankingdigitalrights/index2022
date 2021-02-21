import c from "clsx";
import Link from "next/link";
import React from "react";

import {CompanyHighlight, HighlightedCompany} from "../types";
import CompanyKindLabel from "./company-kind-label";

interface HighlightsSlideProps {
  highlight: CompanyHighlight;
}

interface CompanySlideProps {
  company: HighlightedCompany;
  className?: string;
}

const CompanySlide = ({
  company: {company: id, companyPretty, text, score, kind},
  className,
}: CompanySlideProps) => {
  const scoreClassName = {
    "border-accent-orange": kind === "telecom",
    "border-diff-del": kind === "internet",
  };

  return (
    <div className={c("flex flex-col", className)}>
      <CompanyKindLabel kind={kind} theme="dark" />

      <Link passHref href={`/companies/${id}`}>
        <a className="text-black hover:no-underline">
          <div className="flex mt-4">
            <span
              className={c(
                "w-12 font-circular text-center border rounded p-1 hover:no-underline",
                scoreClassName,
              )}
            >
              {score}%
            </span>
            <span
              className={c(
                "ml-3 font-platform font-bold text-lg hover:underline",
              )}
            >
              {companyPretty}
            </span>
          </div>
        </a>
      </Link>
      <p className="font-circular font-normal text-sm mt-4">{text}</p>
    </div>
  );
};

const HighlightsSlide = ({
  highlight: {title, text, highlights},
}: HighlightsSlideProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full">
      <div className="flex flex-col lg:h-64 w-full lg:w-1/3 px-8 lg:pt-10">
        <span className="font-platform font-bold text-xl leading-8">
          {title}
        </span>
        <span className="font-circular text-sm mt-3">{text}</span>
      </div>

      <div className="flex flex-col sm:flex-row w-full lg:w-2/3 sm:mt-6 lg:mt-0 pl-9 pr-9">
        {highlights.map((h, idx) => {
          const innerClassName = {
            "pr-3": idx === 0,
            "pl-3": idx === 1,
          };
          return (
            <CompanySlide
              key={h.company}
              className={c("md:h-64 md:w-1/2 py-4", innerClassName)}
              company={h}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HighlightsSlide;
