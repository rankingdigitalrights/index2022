import Link from "next/link";
import {useRouter} from "next/router";

import CompanyKindLabel from "../../components/company-kind-label";
import CompanyRankCard from "../../components/company-rank-card";
import CompanyRankChart from "../../components/company-rank-chart";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import EvaluatedService from "../../components/evaluated-service";
import Layout from "../../components/layout";
import YearOverYearLabel from "../../components/year-over-year-label";
import {
  allCompanies,
  companyData,
  companyRankingData,
  companyServices,
} from "../../data";
import Download from "../../images/icons/download.svg";
import {CompanyDetails, CompanyIndex, CompanyRank, Service} from "../../types";

type Params = {
  params: {
    slug: string;
  };
};

interface CompanyProps {
  index: CompanyIndex;
  details: CompanyDetails;
  ranking: CompanyRank[];
  services: Service[];
}

export const getStaticPaths = async () => {
  const data = await allCompanies();
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
  const ranking = await companyRankingData(index.kind, "total");
  const services = await companyServices(slug);

  // Map from the input format to the internal type.
  return {
    props: {
      index,
      details,
      ranking,
      services,
    },
  };
};

const CompanyPage = ({index, details, ranking, services}: CompanyProps) => {
  const router = useRouter();

  const handleIndicatorClick = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="md:w-7/12 lg:w-3/5 xl:w-7/12 w-full md:bg-prissian" />
          <div className="md:w-5/12 lg:w-2/5 xl:w-5/12 w-full md:bg-beige" />
        </div>

        <div className="md:container md:mx-auto flex flex-col print:flex-row md:flex-row md:justify-between lg:w-10/12 xl:w-8/12">
          <div className="flex flex-col bg-prissian w-full md:w-7/12 lg:w-7/12 p-3 print:p-8 md:mt-6 md:mb-6 md:mr-6 lg:mr-0 z-10">
            <CompanyKindLabel kind={index.kind} />

            <CompanyRankCard
              company={index.companyPretty}
              rank={index.rank}
              score={index.scores.total}
              kind={index.kind}
              counts={ranking.length}
              basicInformation={details.basicInformation}
              className="mt-2"
            />
          </div>

          <div className="w-full md:w-5/12 lg:w-4/12 bg-beige p-3 print:p-8 md:mt-6 md:mb-3 md:ml-12 lg:ml-0 z-10">
            <CompanyRankChart activeCompany={index.id} ranking={ranking} />
          </div>
        </div>
      </div>

      <div className="pt-6 pb-6 mt-6">
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
          <section className="flex flex-col md:flex-row pt-3">
            <div className="w-full md:w-4/6 pr-3">
              <div
                className="mt-6 border-b border-disabled-light print:border-b-0"
                dangerouslySetInnerHTML={{__html: details.keyFindings}}
              />

              <h2 className="text-prissian mt-8 mb-6">Key Takeaways:</h2>
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: details.keyTakeaways,
                }}
              />

              <h2 className="text-prissian mt-8 mb-6">Key Recommendations:</h2>
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: details.keyRecommendation,
                }}
              />
            </div>

            <div className="flex flex-col print:flex-row items-start w-full md:w-2/6 px-3 font-circular text-sm">
              <div className="print:w-1/3">
                <h3 className="font-bold pb-3 mt-3 md:mb-6 md:mt-6 print:whitespace-nowrap">
                  Services evaluated:
                </h3>

                <div className=" border-b border-disabled-light print:border-b-0 w-full pb-6">
                  <ul className="list-none list-outside pl-0">
                    {services
                      .filter(({kind}) => kind !== "Group" && kind !== "OpCom")
                      .map(({id, name, kind}) => (
                        <li key={id} className="pb-0">
                          <EvaluatedService name={name} kind={kind} />
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-b border-disabled-light print:border-b-0 w-full print:w-2/3 py-6">
                <p>
                  The 2020 RDR Index covers policies that were active between
                  February 8, 2019 and September 15, 2020. Policies that came
                  into effect after September 15, 2020 were not evaluated for
                  this Index.
                </p>

                <p className="pb-0">
                  Scores reflect the average score across the services we
                  evaluated, with each service weighted equally.
                </p>
              </div>

              <div className="mt-6 print:hidden">
                <Link passHref href={`/pdf/companies/${index.id}.pdf`}>
                  <a className="flex border rounded-md px-4 py-3 bg-rdr text-white font-circular text-sm text-center">
                    <Download className="mr-2" />
                    Download data and sources
                  </a>
                </Link>
              </div>
            </div>
          </section>

          {index.totalDiffs.diff2020 !== "NA" && (
            <section className="relative flex flex-col md:flex-row print:flex-row pt-3">
              <div className="w-full md:w-4/6 pr-3 border-t border-disabled-light">
                <h2 className="text-prissian mt-8 mb-6">Changes since 2019:</h2>

                <div
                  dangerouslySetInnerHTML={{
                    __html: details.changes,
                  }}
                />
              </div>

              <div className="flex flex-col items-start w-full md:w-2/6 px-3 font-circular text-sm">
                <YearOverYearLabel
                  className="mt-8"
                  value={index.totalDiffs.diff2020}
                  year="2020"
                />
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="border-t border-disabled-dark">
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
          <div className="flex flex-col print:flex-row md:flex-row items-center no-page-break">
            <CompanyScoreChart
              category="governance"
              score={index.scores.governance}
            />
            <CompanyScoreChart
              category="freedom"
              score={index.scores.freedom}
            />
            <CompanyScoreChart
              category="privacy"
              score={index.scores.privacy}
            />
          </div>
          <p className="font-circular text-xs text-center">
            We rank companies on their approach to governance, and their
            policies and practices that affect freedom of expression and
            privacy.
          </p>

          <CompanySection
            category="governance"
            score={index.scores.governance}
            text={details.governance}
            indicators={index.indicators.governance}
            onClick={handleIndicatorClick}
            className="page-break"
          />

          <CompanySection
            category="freedom"
            score={index.scores.freedom}
            text={details.freedom}
            indicators={index.indicators.freedom}
            onClick={handleIndicatorClick}
            className="page-break"
          />

          <CompanySection
            category="privacy"
            score={index.scores.privacy}
            text={details.privacy}
            indicators={index.indicators.privacy}
            onClick={handleIndicatorClick}
            className="page-break"
          />
        </div>

        {details.footnotes && (
          <footer className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
            <h3>Footnotes</h3>
            <div dangerouslySetInnerHTML={{__html: details.footnotes}} />
          </footer>
        )}
      </div>
    </Layout>
  );
};

export default CompanyPage;
