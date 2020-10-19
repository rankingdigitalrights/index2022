import CompanyIndicatorChartBar from "@src/components/company-indicator-chart-bar";
import {Indicator, ScoreCategory} from "@src/types";

interface CompanyIndicatorChartProps {
  indicators: Indicator[];
  category: ScoreCategory;
}

const CompanyIndicatorChart = ({
  indicators,
  category,
}: CompanyIndicatorChartProps) => {
  // FIXME: The height of the svg tag is fixed and probably cuts some of the bars off.
  return (
    <div>
      <svg className="h-64">
        <g>
          {indicators.map(({name, value}, index) => {
            const pos = 35 * (index + 1);

            return (
              <CompanyIndicatorChartBar
                key={name}
                name={name}
                value={value}
                pos={pos}
                category={category}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default CompanyIndicatorChart;
