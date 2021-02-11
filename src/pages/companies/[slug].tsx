import Link from "next/link";
import {useRouter} from "next/router";

import CompanyKindLabel from "../../components/company-kind-label";
import CompanyRankCard from "../../components/company-rank-card";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import EvaluatedService from "../../components/evaluated-service";
import Layout from "../../components/layout";
import RankChart from "../../components/rank-chart";
import YearOverYearLabel from "../../components/year-over-year-label";
import {
  allCompanies,
  companyData,
  companyMeta,
  companyRankingData,
  companyServices,
} from "../../data";
import Download from "../../images/icons/download.svg";
import {
  CompanyDetails,
  CompanyIndex,
  CompanyMeta,
  CompanyRank,
  Service,
} from "../../types";

type Params = {
  params: {
    slug: string;
  };
};

interface CompanyProps {
  index: CompanyIndex;
  details: CompanyDetails;
  meta: CompanyMeta;
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
  const meta = await companyMeta(slug);
  const ranking = await companyRankingData(index.kind, "total");
  const services = await companyServices(slug);

  // Map from the input format to the internal type.
  return {
    props: {
      index,
      details,
      meta,
      ranking,
      services,
    },
  };
};

const CompanyPage = ({
  index,
  details,
  meta,
  ranking,
  services,
}: CompanyProps) => {
  const router = useRouter();

  const isPrint = router.query?.print !== undefined;

  return (
    <Layout>
      <div className="relative print:static">
        <div className="absolute flex flex-row w-full h-full top-0 print:hidden">
          <div className="md:w-7/12 lg:w-3/5 xl:w-7/12 w-full md:bg-prissian" />
          <div className="md:w-5/12 lg:w-2/5 xl:w-5/12 w-full md:bg-beige" />
        </div>

        <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between lg:w-10/12 xl:w-8/12 print:flex-row">
          <div className="flex flex-col bg-prissian w-full p-3 z-10 md:w-7/12 md:p-0 md:mt-6 md:mb-6 md:mr-6 lg:w-7/12 lg:mr-0 print:pt-20 print:pb-8 print:pr-10 print:pl-32">
            <CompanyKindLabel kind={index.kind} />

            <CompanyRankCard
              company={details.printName}
              rank={index.rank}
              score={index.scores.total}
              kind={index.kind}
              counts={ranking.length}
              basicInformation={details.basicInformation}
              className="mt-2"
            />
          </div>

          <div className="w-full bg-beige p-3 z-10 md:w-5/12 md:p-0 md:mt-6 md:mb-3 md:ml-12 lg:w-4/12 lg:ml-0 print:pt-20 print:pb-8 print:pl-8 print:pr-32">
            <RankChart
              ranking={ranking}
              activeCompany={index.id}
              hasHeader={false}
              isPrint={isPrint}
            />
          </div>
        </div>
      </div>

      <div className="md:container md:mx-auto px-3 mt-6 md:py-6 md:mt-12 md:px-0 lg:w-10/12 xl:w-8/12">
        <section className="flex flex-col md:flex-row print:flex-col">
          <div className="md:w-4/6 md:pr-20 printer print:px-20">
            <div
              className="border-b border-disabled-light print:border-b-0"
              dangerouslySetInnerHTML={{__html: details.keyFindings}}
            />

            <h2 className="text-prissian mt-8 mb-6">
              {details.keyTakeawaysTitle}
            </h2>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{
                __html: details.keyTakeaways,
              }}
            />

            <h2 className="text-prissian mt-8 mb-6">
              {details.keyRecommendationTitle}
            </h2>
            <div
              className="mt-6"
              dangerouslySetInnerHTML={{
                __html: details.keyRecommendation,
              }}
            />
          </div>

          <div className="flex flex-col items-start w-full md:w-2/6 font-circular text-sm printer print:flex-row printer print:w-full print:px-20 print:pt-8 print:pb-3">
            <div>
              <h3 className="font-bold pb-3 print:whitespace-nowrap">
                Services evaluated:
              </h3>

              <ul className="list-none list-inside ml-0 pl-0 border-b border-disabled-light print:border-b-0 w-full pb-6">
                {services
                  .filter(({kind}) => kind !== "Group" && kind !== "OpCom")
                  .map(({id, name, kind}) => (
                    <li key={id} className="pb-0 print:py-3">
                      <EvaluatedService name={name} kind={kind} />
                    </li>
                  ))}
              </ul>

              <ul className="list-none list-outside ml-0 pl-0 border-b border-disabled-light print:border-b-0 w-full py-6">
                {meta.operatingCompany && (
                  <li className="pt-0 pb-3 print:py-3">
                    <span className="font-bold">
                      Operating company evaluated:
                    </span>{" "}
                    {meta.operatingCompany}
                  </li>
                )}

                <li className="pb-0 print:py-3">
                  <span className="font-bold">Market cap:</span>{" "}
                  {meta.marketCap} ({meta.marketCapDate})
                </li>

                <li className="pt-3 pb-0 print:py-3">
                  <span className="font-bold">{meta.exchange}:</span>{" "}
                  {meta.stockSymbol}
                </li>

                <li className="pt-3 pb-0 print:py-3">
                  <span className="font-bold">Website:</span>{" "}
                  <a href={meta.website}>{meta.website}</a>
                </li>
              </ul>
            </div>

            <div className="border-b border-disabled-light print:border-b-0 w-full py-6 print:pt-8 print:pr-20">
              <p>
                The 2020 RDR Index covers policies that were active between
                February 8, 2019 and September 15, 2020. Policies that came into
                effect after September 15, 2020 were not evaluated for this
                Index.
              </p>

              <p className="pb-0">
                Scores reflect the average score across the services we
                evaluated, with each service weighted equally.
              </p>

              <ul className="list-none list-outside ml-0 pl-0 print:border-b-0 w-full pt-6">
                <li className="pb-0 print:py-3">
                  <span className="font-bold">Lead researchers:</span>{" "}
                  {meta.researchers.join(", ")}
                </li>
              </ul>
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
          <section className="relative flex flex-col md:flex-row print:flex-row pt-3 printer print:px-20">
            <div className="w-full md:w-4/6 pr-12 border-t border-disabled-light print:border-t-0">
              <h2 className="text-prissian mt-8 mb-6">
                {details.changesTitle}
              </h2>

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

      <div className="border-t border-disabled-dark print:border-t-0">
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
          <div className="flex flex-col print:flex-row md:flex-row items-center print:justify-center no-page-break">
            <CompanyScoreChart
              category="governance"
              score={index.scores.governance}
              isPrint={isPrint}
            />
            <CompanyScoreChart
              category="freedom"
              score={index.scores.freedom}
              isPrint={isPrint}
            />
            <CompanyScoreChart
              category="privacy"
              score={index.scores.privacy}
              isPrint={isPrint}
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
          />

          <CompanySection
            category="freedom"
            score={index.scores.freedom}
            text={details.freedom}
            indicators={index.indicators.freedom}
          />

          <CompanySection
            category="privacy"
            score={index.scores.privacy}
            text={details.privacy}
            indicators={index.indicators.privacy}
          />
        </div>
      </div>

      {details.footnotes && (
        <div className="container mx-auto w-11/12 lg:w-8/12 md:w-10/12 printer print:px-20">
          <section className="flex flex-col pt-3">
            <h3>Footnotes</h3>
            <div dangerouslySetInnerHTML={{__html: details.footnotes}} />
          </section>
        </div>
      )}
    </Layout>
  );
};

export default CompanyPage;
