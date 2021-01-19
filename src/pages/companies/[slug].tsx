import {useRouter} from "next/router";

import CompanyKindLabel from "../../components/company-kind-label";
import CompanyRankCard from "../../components/company-rank-card";
import CompanyRankChart from "../../components/company-rank-chart";
import CompanyScoreChart from "../../components/company-score-chart";
import CompanySection from "../../components/company-section";
import EvaluatedService from "../../components/evaluated-service";
import Layout from "../../components/layout";
import {
  allCompanies,
  companyData,
  companyRankingData,
  companyServices,
} from "../../data";
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

  const handleCompanyClick = (id: string) => {
    router.push(`/companies/${id}`);
  };

  const handleIndicatorClick = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  return (
    <Layout>
      <div className="relative">
        <div className="absolute flex flex-row w-full h-full top-0">
          <div className="md:w-3/5 xl:w-7/12 w-full md:bg-prissian" />
          <div className="md:w-2/5 xl:w-5/12 w-full md:bg-beige" />
        </div>

        <div className="md:container md:mx-auto flex flex-col md:flex-row md:justify-between md:w-10/12 lg:w-8/12">
          <div className="flex flex-col bg-prissian w-full md:w-7/12 p-3 md:mt-6 md:mb-6 z-10">
            <CompanyKindLabel kind={index.kind} />

            <CompanyRankCard
              company={index.companyPretty}
              rank={index.rank}
              score={index.scores.total}
              kind={index.kind}
              counts={ranking.length}
              className="mt-2"
            />
          </div>

          <div className="w-full md:w-4/12 bg-beige p-3 md:mt-6 md:mb-3 z-10">
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
          <section className="flex flex-col md:flex-row pt-3">
            <div className="w-full md:w-4/6 pr-3">
              <h2 className="text-prissian mb-6">Highlights:</h2>
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{__html: details.keyFindings}}
              />

              <h2 className="text-prissian mt-8 mb-6">Recommendations:</h2>
              <div
                className="mt-6"
                dangerouslySetInnerHTML={{
                  __html: details.keyRecommendation,
                }}
              />
            </div>

            <div className="w-full md:w-2/6 pl-3">
              <h3 className="pb-3 md:mb-6 mt-6 md:mt-16">
                Services evaluated:
              </h3>
              <ul className="list-inside">
                {services
                  .filter(({kind}) => kind !== "Group" && kind !== "OpCom")
                  .map(({id, name, kind}) => (
                    <li key={id} className="font-circular text-sm pb-0">
                      <EvaluatedService name={name} kind={kind} />
                    </li>
                  ))}
              </ul>
            </div>
          </section>

          <section className="flex flex-col mt-6 md:mt-4">
            <h2 className="text-prissian mb-6">Changes since 2019:</h2>

            <div className="flex flex-col md:flex-row pt-3">
              <div className="w-full md:w-4/6 pr-3">
                <div
                  dangerouslySetInnerHTML={{
                    __html: details.analysis,
                  }}
                />
              </div>

              <div className="md:w-2/6 pl-3" />
            </div>
          </section>
        </div>
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

          <CompanySection
            category="governance"
            text={details.governance}
            indicators={index.indicators.governance}
            onClick={handleIndicatorClick}
          />

          <CompanySection
            category="freedom"
            text={details.freedom}
            indicators={index.indicators.freedom}
            onClick={handleIndicatorClick}
          />

          <CompanySection
            category="privacy"
            text={details.privacy}
            indicators={index.indicators.privacy}
            onClick={handleIndicatorClick}
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
