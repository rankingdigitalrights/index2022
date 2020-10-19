import {Indicator, ScoreCategory} from "../types";
import CompanyIndicatorChart from "./company-indicator-chart";

interface CompanySectionProps {
  category: ScoreCategory;
  score: number;
  text: string;
  indicators: Indicator[];
}

const CompanySection = ({
  category,
  score,
  text,
  indicators,
}: CompanySectionProps) => {
  let title;
  if (category === "governance") {
    title = "Governance";
  } else if (category === "freedom") {
    title = "Freedom of Expression";
  } else if (category === "privacy") {
    title = "Privacy";
  } else {
    title = "UNKNOWN CATEGORY!!!";
  }

  return (
    <section className="mt-6 pt-6 pb-6 border-t-2 border-black">
      <div className="font-simplon-light text-xl">Category</div>
      <h2 className="text-medium-gray">{title}</h2>

      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 md:mr-2">
          <h4>Score 2019</h4>
          <div className="text-xl font-simplon-bold mt-3 mb-6">{score}%</div>
          <div dangerouslySetInnerHTML={{__html: text}} />
        </div>

        <div className="md:w-1/3 md:m-2">
          <h4>Indicators</h4>

          <CompanyIndicatorChart indicators={indicators} category={category} />
        </div>

        <div className="md:w-1/3 md:ml-2">
          <h4>Summary of changes</h4>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
