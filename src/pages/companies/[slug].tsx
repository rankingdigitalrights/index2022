import {useRouter} from "next/router";

import CompanyRankCard from "../../components/company-rank-card";
import CompanyRankChart from "../../components/company-rank-chart";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import Layout from "../../components/layout";
import {allCompanies, companyData, companyRankingData} from "../../data";
import {CompanyDetails, CompanyIndex, CompanyRank} from "../../types";

type Params = {
  params: {
    slug: string;
  };
};

interface CompanyProps {
  index: CompanyIndex;
  details: CompanyDetails;
  ranking: CompanyRank[];
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
  const ranking = await companyRankingData(index.kind);

  // Map from the input format to the internal type.
  return {
    props: {
      index,
      details,
      ranking,
    },
  };
};

const CompanyPage = ({index, details, ranking}: CompanyProps) => {
  const router = useRouter();

  // FIXME: I don't receive the company kind yet as part of the CSV data.
  const companyKind =
    index.kind === "telecom"
      ? "Telecommunications company"
      : "Digital platforms";

  const handleCompanyClick = (id: string) => {
    router.push(`/companies/${id}`);
  };

  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-wrap w-full h-full top-0">
          <div className="md:w-3/5 w-full bg-prissian" />
          <div className="md:w-2/5 w-full bg-beige" />
        </div>

        <div className="container mx-auto flex flex-wrap lg:w-8/12 md:w-10/12 w-11/12">
          <div className="flex flex-col float-right md:w-3/5 w-full pt-6 pb-6 pr-3 z-10">
            <div className="font-circular text-white text-xxs">
              FIXME &gt; Companies &gt; {companyKind} &gt; {index.companyPretty}
            </div>

            <CompanyRankCard
              company={index.companyPretty}
              rank={index.rank}
              score={index.scores.total}
              kind={index.kind}
              counts={ranking.length}
              className="mt-2"
            />
          </div>

          <div className="md:w-2/5 w-full pt-6 pb-3 md:pl-20 pl-0 z-10">
            <CompanyRankChart
              activeCompany={index.id}
              ranking={ranking}
              onClick={handleCompanyClick}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 pb-6 mt-6">
        <div className="container mx-auto lg:w-8/12 md:w-10/12 w-11/12">
          <section className="flex flex-wrap pt-3">
            <div className="w-4/6 pr-3">
              <h2 className="text-prissian mb-6">Highlights:</h2>
              <div
                className="mt-6 font-circular text-sm"
                dangerouslySetInnerHTML={{__html: details.keyFindings}}
              />

              <h2 className="text-prissian mt-8 mb-6">Recommendations:</h2>
              <div
                className="mt-6 font-circular text-sm"
                dangerouslySetInnerHTML={{
                  __html: details.keyRecommendation,
                }}
              />
            </div>

            <div className="w-2/6 pl-3">
              <div className="pb-3 mb-6">Services evaluated</div>
            </div>
          </section>

          <section className="flex flex-col mt-4">
            <h2 className="text-prissian mb-6">Changes since 2019:</h2>

            <div className="flex pt-3">
              <div className="w-4/6 pr-3">
                <div
                  className="font-circular text-sm"
                  dangerouslySetInnerHTML={{
                    __html: details.analysis,
                  }}
                />
              </div>

              <div className="w-2/6 pl-3" />
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-disabled-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap place-content-center center">
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

          <CompanySection
            category="governance"
            text={details.governance}
            indicators={index.indicators.governance}
          />

          <CompanySection
            category="freedom"
            text={details.freedom}
            indicators={index.indicators.freedom}
          />

          <CompanySection
            category="privacy"
            text={details.privacy}
            indicators={index.indicators.privacy}
          />
        </div>

        {details.footnotes && (
          <footer className="container mx-auto">
            <h3>Footnotes</h3>
            <div dangerouslySetInnerHTML={{__html: details.footnotes}} />
          </footer>
        )}
      </div>
    </Layout>
  );
};

export default CompanyPage;
