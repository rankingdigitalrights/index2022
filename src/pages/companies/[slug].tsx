import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import {MdxRemote} from "next-mdx-remote/types";
import Link from "next/link";

import CompanyKindLabel from "../../components/company-kind-label";
import CompanyRankCard from "../../components/company-rank-card";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import EvaluatedService from "../../components/evaluated-service";
import Footnotes from "../../components/footnotes";
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
import {components} from "../../mdx";
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
  footnotes: MdxRemote.Source | null;
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
  const footnotes = details.footnotes
    ? await renderToString(details.footnotes, {components})
    : // eslint-disable-next-line unicorn/no-null
      null;

  // Map from the input format to the internal type.
  return {
    props: {
      index,
      details,
      meta,
      ranking,
      services,
      footnotes,
    },
  };
};

const CompanyPage = ({
  index,
  details,
  meta,
  ranking,
  services,
  footnotes: mdxFootnotes,
}: CompanyProps) => {
  const footnotes = mdxFootnotes
    ? hydrate(mdxFootnotes, {components})
    : undefined;

  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="md:w-7/12 lg:w-3/5 xl:w-7/12 w-full md:bg-prissian" />
          <div className="md:w-5/12 lg:w-2/5 xl:w-5/12 w-full md:bg-beige" />
        </div>

        <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between lg:w-10/12 xl:w-8/12">
          <div className="flex flex-col bg-prissian w-full p-3 z-10 md:w-7/12 md:p-0 md:mt-6 md:mb-6 md:mr-6 lg:w-7/12 lg:mr-0">
            <CompanyKindLabel className="mt-3 md:mt-0" kind={index.kind} />

            <CompanyRankCard
              company={details.printName}
              rank={index.rank}
              score={index.scores.total}
              basicInformation={details.basicInformation}
              className="mt-2"
            />
          </div>

          <div className="w-full bg-beige p-3 z-10 md:w-5/12 md:p-0 md:mt-6 md:mb-3 md:ml-12 lg:w-4/12 lg:ml-0">
            <RankChart
              ranking={ranking}
              activeCompany={index.id}
              hasHeader={false}
            />
          </div>
        </div>
      </div>

      <div className="md:container md:mx-auto px-3 mt-6 md:py-6 md:mt-12 md:px-0 lg:w-10/12 xl:w-8/12">
        <section className="flex flex-col md:flex-row">
          <div className="md:w-4/6 md:pr-20">
            <div
              className="border-b border-disabled-light"
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

          <div className="flex flex-col items-start w-full md:w-2/6 font-circular text-sm">
            <div>
              <h3 className="font-bold pb-3">Services evaluated:</h3>

              <ul className="list-none list-inside ml-0 pl-0 border-b border-disabled-light w-full pb-6">
                {services
                  .filter(
                    ({kind}) =>
                      kind !== "Group" && kind !== "Operating Company",
                  )
                  .map(({id, name, kind}) => (
                    <li key={id} className="pb-0">
                      <EvaluatedService name={name} kind={kind} />
                    </li>
                  ))}
              </ul>

              <ul className="list-none list-outside ml-0 pl-0 border-b border-disabled-light w-full py-6">
                {meta.operatingCompany && (
                  <li className="flex flex-col pt-0 pb-3">
                    <span className="font-bold">
                      Operating company evaluated:
                    </span>{" "}
                    {meta.operatingCompany}
                    <span className="mt-2">
                      For telecommunications companies, the RDR Index evaluates
                      relevant policies of the parent company, the operating
                      company, and selected services of that operating company.
                    </span>
                  </li>
                )}

                <li className="pb-0">
                  <span className="font-bold">Market cap:</span>{" "}
                  {meta.marketCap} ({meta.marketCapDate})
                </li>

                <li className="pt-3 pb-0">
                  <span className="font-bold">{meta.exchange}:</span>{" "}
                  {meta.stockSymbol}
                </li>

                <li className="pt-3 pb-0">
                  <span className="font-bold">Website:</span>{" "}
                  <a href={meta.website}>{meta.website}</a>
                </li>
              </ul>
            </div>

            <div className="border-b border-disabled-light w-full py-6">
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

              <ul className="list-none list-outside ml-0 pl-0 w-full pt-6">
                <li className="pb-0">
                  <span className="font-bold">Lead researchers:</span>{" "}
                  {meta.researchers.join(", ")}
                </li>
              </ul>
            </div>

            <div className="mt-6">
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
          <section className="relative flex flex-col md:flex-row pt-3">
            <div className="w-full md:w-4/6 pr-12 border-t border-disabled-light">
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

      <div className="border-t border-disabled-dark">
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
          <div className="flex flex-col md:flex-row items-center">
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

          <p className="font-circular text-sm text-center">
            We rank companies on their governance, and on their policies and
            practices affecting freedom of expression and privacy.
          </p>

          <div>
            <CompanySection
              category="governance"
              score={index.scores.governance}
              text={details.governance}
              indicators={index.indicators.governance}
            />
          </div>

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

      {footnotes && (
        <Footnotes
          className="container mx-auto w-11/12 my-12 pt-12 lg:w-8/12 md:w-10/12"
          source={footnotes}
        />
      )}
    </Layout>
  );
};

export default CompanyPage;
