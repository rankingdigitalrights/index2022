import c from "clsx";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useState} from "react";

import {useChartResize} from "../hooks";
import {CompanyKind, CompanyRank} from "../types";
import PercentageBar from "./percentage-bar";

interface CompanyRankChartProps {
  activeCompany: string;
  ranking: CompanyRank[];
  height?: number;
}

const CompanyRankChart = ({
  activeCompany,
  ranking,
  height = 10,
}: CompanyRankChartProps) => {
  const router = useRouter();
  const [chartRef, chartWidth] = useChartResize();

  const [highlightedCompany, setHighlightedCompany] = useState<
    string | undefined
  >();

  const companyKind: CompanyKind = ranking[0]?.kind || "telecom";
  const isPrint = router.query?.print !== undefined;

  return (
    <div className="flex flex-col">
      {ranking.map(({id, companyPretty, score, rank}, idx) => {
        // eslint-disable-next-line unicorn/no-null
        const ref = idx === 0 ? chartRef : null;
        const isActiveCompany = id === activeCompany;
        const isHighlightedCompany = id === highlightedCompany;

        const className = c("flex items-center m-0.5 font-circular text-sm", {
          "text-prissian": isActiveCompany || isHighlightedCompany,
        });

        const rankClassName = {
          "bg-prissian": isHighlightedCompany,
          "bg-diff-del": !isHighlightedCompany && companyKind === "internet",
          "bg-accent-orange":
            !isHighlightedCompany && companyKind === "telecom",
        };

        const barClassName = c(
          isActiveCompany || isHighlightedCompany
            ? "text-prissian"
            : "text-disabled-dark",
        );

        const scoreClassName = c("ml-3 pl-1 pr-1 select-none", {
          "text-white bg-prissian": isActiveCompany,
        });

        const companyLabel = isPrint ? (
          <span className="flex-none font-circular w-28 select-none whitespace-nowrap">
            {companyPretty}
          </span>
        ) : (
          <Link passHref href={`/companies/${id}`}>
            <a className="flex-none font-circular text-black w-28 select-none whitespace-nowrap">
              {companyPretty}
            </a>
          </Link>
        );

        return (
          <div
            key={`company-rank-${activeCompany}-${id}`}
            className={className}
            onMouseEnter={() => setHighlightedCompany(id)}
            onMouseLeave={() => setHighlightedCompany(undefined)}
          >
            {companyLabel}

            <div className="flex-none w-8 flex justify-center">
              <div
                className={c(
                  "rounded-full h-5 w-5 text-white flex items-center justify-center",
                  rankClassName,
                )}
              >
                {rank}
              </div>
            </div>

            <div ref={ref} className="flex-grow ml-1">
              <svg
                version="1"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height={height}
                transform="translate(0, 0)"
              >
                <PercentageBar
                  value={score}
                  width={isPrint ? "100%" : chartWidth}
                  height={height}
                  className={barClassName}
                />
              </svg>
            </div>

            <div
              className={c(
                "relative flex-none ml-auto w-10 float-right",
                isActiveCompany ? "score-label" : undefined,
              )}
            >
              <span className={scoreClassName}>{score}%</span>
            </div>
          </div>
        );
      })}
      <div className="flex">
        <div className="flex-none w-28">&nbsp;</div>

        <div className="flex-none w-8">&nbsp;</div>

        <div className="flex-grow font-circular text-xs flex justify-between ml-2">
          <span>0%</span>
          <span>100%</span>
        </div>

        <div className="flex-none ml-auto w-10">&nbsp;</div>
      </div>
    </div>
  );
};

export default CompanyRankChart;
