import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import CompanyRankCard from "../../components/company-rank-card";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import {companyDetails, loadData} from "../../data";
import {CompanyDetails, CompanyIndex} from "../../types";

type Params = {
  params: {
    slug: string;
  };
};

interface CompanyProps {
  company: CompanyIndex;
  details: CompanyDetails;
}

export const getStaticPaths = async () => {
  const data = await loadData();
  const paths = data.map(({id}) => ({
    params: {slug: id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {slug}}: Params) => {
  const [data, details] = await Promise.all([loadData(), companyDetails(slug)]);

  const company = data.find((d) => d.id === slug);
  if (!company) throw new Error(`Couldn't extract company for slug ${slug}`);

  // Map from the input format to the internal type.
  return {
    props: {
      company,
      details,
    },
  };
};

const CompanyPage = ({company, details}: CompanyProps) => {
  // FIXME: Dummy Data:
  //        - company kind

  const companyKind =
    company.kind === "telecom"
      ? "Telecommunications company"
      : "Internet and mobile ecosystem companies";

  return (
    <div>
      <section className="flex">
        <div className="w-1/2">
          <div className="flex items-start items-center">
            <span className="text-red-600 mr-2">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            <div className="font-simplon-light text-medium-gray text-sm">
              {companyKind}
            </div>
          </div>
          <h1>{company.company}</h1>
        </div>

        <div className="w-1/2">
          <CompanyRankCard rank={company.rank} score={company.scores.total} />
        </div>
      </section>

      <section className="flex">
        <div className="w-1/2 pt-3">
          <h2>Key findings</h2>
          <div dangerouslySetInnerHTML={{__html: details.keyFindings}} />
        </div>

        <div className="w-1/2 pt-3">
          <div className="pb-3">Services evaluated</div>
          <div
            dangerouslySetInnerHTML={{
              __html: details.servicesEvaluated,
            }}
          />
        </div>
      </section>

      <div className="flex flex-wrap bg-offset-gray center">
        <CompanyScoreChart
          category="governance"
          score={company.scores.governance}
        />
        <CompanyScoreChart category="freedom" score={company.scores.freedom} />
        <CompanyScoreChart category="privacy" score={company.scores.privacy} />
      </div>

      <section className="flex flex-col">
        <h2 className="text-medium-gray">Analysis</h2>

        <div className="flex">
          <div className="w-1/2">
            <h3>Overall score {company.scores.total}%</h3>
            <div dangerouslySetInnerHTML={{__html: details.analysisText}} />
          </div>

          <div className="w-1/2">
            <h3>Key recommendations</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: details.keyRecommendation,
              }}
            />
          </div>
        </div>
      </section>

      <CompanySection
        category="governance"
        score={company.scores.governance}
        text={details.governanceText}
        indicators={company.indicators.governance}
      />

      <CompanySection
        category="freedom"
        score={company.scores.freedom}
        text={details.freedomText}
        indicators={company.indicators.freedom}
      />

      <CompanySection
        category="privacy"
        score={company.scores.privacy}
        text={details.privacyText}
        indicators={company.indicators.privacy}
      />

      <footer>
        <h3>Footnotes</h3>
        <div dangerouslySetInnerHTML={{__html: details.footnotes}} />
      </footer>
    </div>
  );
};

export default CompanyPage;
