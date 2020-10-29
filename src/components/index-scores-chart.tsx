import c from "clsx";
import React, {useState} from "react";

import {CompanyIndex} from "../types";
import CategoriesRadarChart from "./categories-radar-chart";
import IndexScoresChartBar from "./index-scores-chart-bar";

type IndexScores = Pick<CompanyIndex, "id" | "company" | "scores">;

interface IndexScoresChartProps {
  companies: IndexScores[];
  width?: number;
  debug?: boolean;
}

const IndexScoreChart = ({
  companies,
  width = 250,
  debug = false,
}: IndexScoresChartProps) => {
  const [selectedCompany, setSelectedCompany] = useState<
    IndexScores | undefined
  >();

  const height = 35 * companies.length;

  const toggleCompany = (company: IndexScores) => {
    if (selectedCompany && selectedCompany.id === company.id) {
      setSelectedCompany(undefined);
    } else {
      setSelectedCompany(company);
    }
  };

  return (
    <div className={c("flex", debug ? "border border-yellow-400" : undefined)}>
      <div>
        <svg
          version="1"
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
        >
          <g>
            {companies.map((company, index) => {
              const {id, company: name, scores} = company;
              const pos = 35 * index;

              return (
                <g
                  key={`index-scores-${id}`}
                  transform={`translate(0,${pos})`}
                  onClick={() => toggleCompany(company)}
                >
                  <IndexScoresChartBar
                    value={scores.total}
                    name={name}
                    width={width}
                  />
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="mr-10">
        {selectedCompany && (
          <CategoriesRadarChart scores={selectedCompany.scores} />
        )}
      </div>
    </div>
  );
};

export default IndexScoreChart;
