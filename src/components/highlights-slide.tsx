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
        <a className="text-black no-underline hover:no-underline">
          <div className="flex mt-4">
            <span
              className={c(
                "w-12 font-circular text-center border rounded p-1",
                scoreClassName,
              )}
            >
              {score}%
            </span>
            <span className="ml-3 font-platform font-bold text-lg">
              {companyPretty}
            </span>
          </div>
          <p className="font-circular text-sm mt-4">{text}</p>
        </a>
      </Link>
    </div>
  );
};

const HighlightsSlide = ({
  highlight: {title, text, highlights},
}: HighlightsSlideProps) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full">
      <div className="flex flex-col lg:h-64 w-full lg:w-1/3 px-8 py-4 items-center">
        <span className="font-platform font-bold text-xl text-center leading-8">
          {title}
        </span>
        <span className="font-circular text-sm text-center mt-3">{text}</span>
      </div>

      <div className="flex flex-col sm:flex-row w-full lg:w-2/3">
        {highlights.map((h) => {
          return (
            <CompanySlide
              key={h.company}
              className="md:h-64 md:w-1/2 px-8 py-4"
              company={h}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HighlightsSlide;
