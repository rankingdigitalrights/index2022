import {ScoreCategory} from "@src/types";
import c from "clsx";

interface CompanyIndicatorChartBarProps {
  value: number;
  name: string;
  pos: number;
  category: ScoreCategory;
}

const CompanyIndicatorChartBar = ({
  value,
  name,
  pos,
  category,
}: CompanyIndicatorChartBarProps) => {
  //
  return (
    <g>
      <rect
        className={c("fill-current", {
          "text-governance": category === "governance",
          "text-freedom": category === "freedom",
          "text-privacy": category === "privacy",
          "text-vis-negative": category === undefined,
        })}
        x={0}
        y={`${pos - 23}px`}
        width={value}
        height={8}
      />
      <rect
        className="text-vis-negative fill-current"
        x={value}
        y={`${pos - 23}px`}
        width={100 - value}
        height={8}
      />

      <text className="text-sm font-simplon-light" y={`${pos}px`}>
        {name}
      </text>
    </g>
  );
};

export default CompanyIndicatorChartBar;
