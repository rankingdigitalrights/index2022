import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

import CompanyRankCard from "../../components/company-rank-card";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import {Company, CompanyDetails} from "../../types";

const index2019Path = path.join(process.cwd(), "../index2019/app/_companies");

type Params = {
  params: {
    slug: string;
  };
};

interface CompanyProps {
  company: CompanyDetails;
}

type IndicatorSource = {name: string; value: string};

export const getStaticPaths = async () => {
  const data = await fetch(
    "https://rankingdigitalrights.org/index2019/assets/static/overview.json",
  ).then((resp) => resp.json());
  const paths = data.map(({id}: Company) => ({
    params: {slug: id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {slug}}: Params) => {
  const filePath = path.join(index2019Path, `${slug}/index.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const {data} = matter(fileContents);

  const allIndicators = await fetch(
    "https://rankingdigitalrights.org/index2019/assets/static/company/all-indicators.json",
  ).then((resp) => resp.json());
  const {
    commitment: governanceIndicators,
    freedom: freedomIndicators,
    privacy: privacyIndicators,
  } = allIndicators.find(({id}: {id: string}) => id === slug) || {
    commitment: [],
    freedom: [],
    privacy: [],
  };

  // Map from the input format to the internal type.
  return {
    props: {
      company: {
        id: data.id,
        display: data.display,
        rank: data.rank,
        companyType: data.company_type,
        basicInformation: data.basic_information,
        keyFindings: data.key_findings,
        servicesEvaluated: data.services_evaluated,
        analysisText: data.analysis_text,
        analysisValue: Number.parseInt(data.analysis_value, 10),
        keyRecommendation: data.key_recommendation,
        governanceText: data.governance_text,
        governanceValue: Number.parseInt(data.governance_value, 10),
        summaryOfChangesGovernance: data.summary_of_changes_governance,
        freedomText: data.freedom_text,
        freedomValue: Number.parseInt(data.freedom_value, 10),
        summaryOfChangesFreedom: data.summary_of_changes_freedom,
        privacyText: data.privacy_text,
        privacyValue: Number.parseInt(data.privacy_value, 10),
        summaryOfChangesPrivacy: data.summary_of_changes_privacy,
        footnotes: data.footnotes,
        indicators: {
          governance: governanceIndicators.map(
            (indicator: IndicatorSource) => ({
              ...indicator,
              value:
                indicator.value === "N/A"
                  ? 0
                  : Number.parseInt(indicator.value, 10),
            }),
          ),
          freedom: freedomIndicators.map((indicator: IndicatorSource) => ({
            ...indicator,
            value:
              indicator.value === "N/A"
                ? 0
                : Number.parseInt(indicator.value, 10),
          })),
          privacy: privacyIndicators.map((indicator: IndicatorSource) => ({
            ...indicator,
            value:
              indicator.value === "N/A"
                ? 0
                : Number.parseInt(indicator.value, 10),
          })),
        },
      },
    },
  };
};

const CompanyPage = ({company}: CompanyProps) => {
  return (
    <div>
      <section className="flex">
        <div className="w-1/2">
          <div className="flex items-start items-center">
            <span className="text-red-600 mr-2">
              <FontAwesomeIcon icon={faCircle} />
            </span>
            <div className="font-simplon-light text-medium-gray text-sm">
              {company.companyType}
            </div>
          </div>
          <h1>{company.display}</h1>
        </div>

        <div className="w-1/2">
          <CompanyRankCard rank={company.rank} score={company.analysisValue} />
        </div>
      </section>

      <section className="flex">
        <div className="w-1/2 pt-3">
          <h2>Key findings</h2>
          <div dangerouslySetInnerHTML={{__html: company.keyFindings}} />
        </div>

        <div className="w-1/2 pt-3">
          <div className="pb-3">Services evaluated</div>
          <div dangerouslySetInnerHTML={{__html: company.servicesEvaluated}} />
        </div>
      </section>

      <div className="flex flex-wrap bg-offset-gray center">
        <CompanyScoreChart
          category="governance"
          score={company.governanceValue}
        />
        <CompanyScoreChart category="freedom" score={company.freedomValue} />
        <CompanyScoreChart category="privacy" score={company.privacyValue} />
      </div>

      <section className="flex flex-col">
        <h2 className="text-medium-gray">Analysis</h2>

        <div className="flex">
          <div className="w-1/2">
            <h3>Overall score {company.analysisValue}%</h3>
            <div dangerouslySetInnerHTML={{__html: company.analysisText}} />
          </div>

          <div className="w-1/2">
            <h3>Key recommendations</h3>
            <div
              dangerouslySetInnerHTML={{__html: company.keyRecommendation}}
            />
          </div>
        </div>
      </section>

      <CompanySection
        category="governance"
        score={company.governanceValue}
        text={company.governanceText}
        indicators={company.indicators.governance}
      />

      <CompanySection
        category="freedom"
        score={company.freedomValue}
        text={company.freedomText}
        indicators={company.indicators.freedom}
      />

      <CompanySection
        category="privacy"
        score={company.privacyValue}
        text={company.privacyText}
        indicators={company.indicators.privacy}
      />

      <footer>
        <h3>Footnotes</h3>
        <div dangerouslySetInnerHTML={{__html: company.footnotes}} />
      </footer>
    </div>
  );
};

export default CompanyPage;
