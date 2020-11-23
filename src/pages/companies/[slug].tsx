import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import CompanyRankCard from "../../components/company-rank-card";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import Layout from "../../components/layout";
import {companyData, companyIndices} from "../../data";
import {CompanyDetails, CompanyIndex} from "../../types";

type Params = {
  params: {
    slug: string;
  };
};

interface CompanyProps {
  index: CompanyIndex;
  details: CompanyDetails;
}

export const getStaticPaths = async () => {
  const data = await companyIndices();
  const paths = data.map(({id}) => ({
    params: {slug: id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {slug}}: Params) => {
  const [index, details] = await companyData(slug);

  // Map from the input format to the internal type.
  return {
    props: {
      index,
      details,
    },
  };
};

const CompanyPage = ({index, details}: CompanyProps) => {
  // FIXME: I don't receive the company kind yet as part of the CSV data.
  const companyKind =
    index.kind === "telecom"
      ? "Telecommunications company"
      : "Internet and mobile ecosystem companies";

  return (
    <Layout>
      <div className="container mx-auto">
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
            <h1>{index.company}</h1>
          </div>

          <div className="w-1/2">
            <CompanyRankCard rank={index.rank} score={index.scores.total} />
          </div>
        </section>

        <section className="flex">
          <div className="w-1/2 pt-3">
            <h2>Key findings</h2>
            <div
              dangerouslySetInnerHTML={{__html: details.keyFindings || ""}}
            />
          </div>

          <div className="w-1/2 pt-3">
            <div className="pb-3">Services evaluated</div>
          </div>
        </section>

        <div className="flex flex-wrap bg-offset-gray center">
          <CompanyScoreChart
            category="governance"
            score={index.scores.governance}
          />
          <CompanyScoreChart category="freedom" score={index.scores.freedom} />
          <CompanyScoreChart category="privacy" score={index.scores.privacy} />
        </div>

        <section className="flex flex-col">
          <h2 className="text-medium-gray">Analysis</h2>

          <div className="flex">
            <div className="w-1/2">
              <h3>Overall score {index.scores.total}%</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: details.analysis || "analysis missing",
                }}
              />
            </div>

            <div className="w-1/2">
              <h3>Key recommendations</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    details.keyRecommendation || "key recommendation missing",
                }}
              />
            </div>
          </div>
        </section>

        <CompanySection
          category="governance"
          score={index.scores.governance}
          text={details.governance || "governance missing"}
          indicators={index.indicators.governance}
        />

        <CompanySection
          category="freedom"
          score={index.scores.freedom}
          text={details.freedom || "freedom missing"}
          indicators={index.indicators.freedom}
        />

        <CompanySection
          category="privacy"
          score={index.scores.privacy}
          text={details.privacy || "privacy missing"}
          indicators={index.indicators.privacy}
        />

        {details.footnotes && (
          <footer>
            <h3>Footnotes</h3>
            <div dangerouslySetInnerHTML={{__html: details.footnotes}} />
          </footer>
        )}
      </div>
    </Layout>
  );
};

export default CompanyPage;
