/* eslint no-console: off, no-restricted-syntax: off */
import {promises as fs} from "fs";
import path from "path";
import yargs from "yargs";

import browser, {BrowserApi} from "../src/browser";
import {
  companies,
  companyDiffs,
  companyIndices,
  companyMeta,
  companyRanking,
  companyServiceRanking,
  companyServices,
  elements,
  glossary,
  indicatorAverages,
  indicatorCompanies,
  indicatorDetails,
  indicatorElements,
  indicators,
  indicatorScores,
  services,
} from "../src/csv";
import {companyDetails, comparePage, narrativePage} from "../src/google";
import {companyPdf} from "../src/pdf";
import {CompanyKind, CompanyYear, IndicatorCategoryExt} from "../src/types";
import {uniqueBy} from "../src/utils";

const dataDir = "data";

const writeJsonFile = (
  target: string,
): ((d: unknown) => Promise<void>) => async (data: unknown): Promise<void> => {
  await fs.writeFile(path.join(process.cwd(), target), JSON.stringify(data));
};

(async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  yargs
    .scriptName("indexctl")
    .command("csv", "generate data structures from CSV sources.", async () => {
      const companiesDir = "data/companies";
      const indicatorsDir = "data/indicators";
      const rankingsDir = "data/rankings";
      const diffScoresDir = "data/diffs";

      const [
        allCompanies,
        allIndicators,
        allElements,
        allServices,
        scores,
      ] = await Promise.all([
        companies(),
        indicators(),
        elements(),
        services(),
        companyIndices(),
      ]);

      await fs.mkdir(path.join(process.cwd(), companiesDir), {recursive: true});
      await fs.mkdir(path.join(process.cwd(), indicatorsDir), {
        recursive: true,
      });
      await fs.mkdir(path.join(process.cwd(), rankingsDir), {
        recursive: true,
      });
      await fs.mkdir(path.join(process.cwd(), diffScoresDir), {
        recursive: true,
      });

      const companiesTarget = path.join(dataDir, "companies.json");
      const indicatorsTarget = path.join(dataDir, "indicators.json");
      const elementsTarget = path.join(dataDir, "elements.json");
      const servicesTarget = path.join(dataDir, "services.json");
      const glossaryTarget = path.join(dataDir, "glossary.json");

      console.log(`Generating glossary at ${glossaryTarget}`);

      await glossary().then(writeJsonFile(glossaryTarget));

      console.log(
        `Generating spec data: ${companiesTarget}, ${indicatorsTarget}, ${elementsTarget} and ${servicesTarget}`,
      );

      await Promise.all([
        writeJsonFile(companiesTarget)(allCompanies),
        writeJsonFile(indicatorsTarget)(allIndicators),
        writeJsonFile(elementsTarget)(allElements),
        writeJsonFile(servicesTarget)(allServices),
      ]);

      /*
       * Company scores, e.g. ./data/companies/Amazon/scores.json
       */
      await Promise.all(
        scores.map(async (score) => {
          const companyDir = path.join(companiesDir, score.id);
          await fs.mkdir(path.join(process.cwd(), companyDir), {
            recursive: true,
          });

          console.log(`Generating company scores for: ${score.id}`);

          const target = path.join(companyDir, "scores.json");
          return writeJsonFile(target)(score);
        }),
      );

      /*
       * Company services, e.g. ./data/companies/services,json
       */
      await allCompanies.reduce(async (memo, company) => {
        await memo;

        // Ensure company data directory.
        const companyDir = path.join(companiesDir, company.id);
        await fs.mkdir(path.join(process.cwd(), companyDir), {
          recursive: true,
        });

        console.log(`Generating company services for: ${company.name}`);

        const target = path.join(companyDir, "services.json");
        const validCompanyServices = await companyServices(company.id);
        return writeJsonFile(target)(validCompanyServices);
      }, Promise.resolve());

      /*
       * Company meta, e.g. ./data/companies/meta,json
       */
      await allCompanies.reduce(async (memo, company) => {
        await memo;

        // Ensure company data directory.
        const companyDir = path.join(companiesDir, company.id);
        await fs.mkdir(path.join(process.cwd(), companyDir), {
          recursive: true,
        });

        console.log(`Generating company meta for: ${company.name}`);

        const target = path.join(companyDir, "meta.json");
        const meta = await companyMeta(company.id);
        return writeJsonFile(target)(meta);
      }, Promise.resolve());

      /*
       * Indicator data structures, e.g. ./data/indicators/G1/averages.json
       */
      await allIndicators.reduce(async (memo, indicator) => {
        await memo;

        // Ensure indicators directory.
        const indicatorDir = path.join(indicatorsDir, indicator.name);
        await fs.mkdir(path.join(process.cwd(), indicatorDir), {
          recursive: true,
        });
        const indicatorDetailsTarget = path.join(indicatorDir, "details.json");
        const indicatorCompaniesTarget = path.join(
          indicatorDir,
          "companies.json",
        );
        const indicatorScoresTarget = path.join(
          indicatorDir,
          "company-scores.json",
        );
        const indicatorElementsTarget = path.join(
          indicatorDir,
          "elements.json",
        );
        const indicatorAveragesTarget = path.join(
          indicatorDir,
          "averages.json",
        );

        console.log(`Generating indicator data for: ${indicator.name}`);

        await indicatorDetails(indicator.id).then(
          writeJsonFile(indicatorDetailsTarget),
        );
        await indicatorCompanies(indicator.id).then(
          writeJsonFile(indicatorCompaniesTarget),
        );
        await indicatorScores(indicator.id).then(
          writeJsonFile(indicatorScoresTarget),
        );
        await indicatorElements(indicator.id).then(
          writeJsonFile(indicatorElementsTarget),
        );
        await indicatorAverages(indicator.id).then(
          writeJsonFile(indicatorAveragesTarget),
        );
      }, Promise.resolve());

      /*
       * Ranking scores, e.g. ./data/rankings/internet-freedom.json
       */
      await Promise.all(
        (["telecom", "internet"] as CompanyKind[]).map(async (kind) => {
          await Promise.all(
            ([
              "total",
              "governance",
              "freedom",
              "privacy",
            ] as IndicatorCategoryExt[]).map(
              async (category: IndicatorCategoryExt) => {
                const target = path.join(
                  rankingsDir,
                  `${kind}-${category}.json`,
                );

                console.log(
                  `Generating ranking scores for: ${kind}/${category}`,
                );

                const ranking = await companyRanking(kind, category);
                return writeJsonFile(target)(ranking);
              },
            ),
          );
        }),
      );

      /*
       * Service ranking scores, e.g. ./data/rankings/email/internet-freedom.json
       */
      const serviceKinds = uniqueBy("kind", allServices)
        .filter(({kind}) => kind !== "Group" && kind !== "Operating Company")
        .map(({kind}) => kind);

      await Promise.all(
        serviceKinds.map(async (serviceKind) => {
          await Promise.all(
            (["telecom", "internet"] as CompanyKind[]).map(async (kind) => {
              await Promise.all(
                ([
                  "total",
                  "governance",
                  "freedom",
                  "privacy",
                ] as IndicatorCategoryExt[]).map(
                  async (category: IndicatorCategoryExt) => {
                    const ranking = await companyServiceRanking(
                      serviceKind,
                      kind,
                      category,
                    );

                    if (ranking.length === 0) return;

                    const serviceRankingsDir = path.join(
                      rankingsDir,
                      serviceKind,
                    );
                    await fs.mkdir(
                      path.join(process.cwd(), serviceRankingsDir),
                      {
                        recursive: true,
                      },
                    );

                    const target = path.join(
                      serviceRankingsDir,
                      `${kind}-${category}.json`,
                    );

                    console.log(
                      `Generating service ranking scores for: ${serviceKind}/${category}`,
                    );

                    await writeJsonFile(target)(ranking);
                  },
                ),
              );
            }),
          );
        }),
      );

      /*
       * Year over year diff scores, e.g. ./data/2020-diff.json
       */
      await Promise.all(
        (["2020"] as CompanyYear[]).map(async (year) => {
          await Promise.all(
            (["total"] as IndicatorCategoryExt[]).map(
              async (category: IndicatorCategoryExt) => {
                const target = path.join(
                  diffScoresDir,
                  `${category}-${year}.json`,
                );
                const diffScores = await companyDiffs(year, category);
                return writeJsonFile(target)(diffScores);
              },
            ),
          );
        }),
      );
    })
    .command("google", "pull content from Google docs.", async () => {
      const companiesDir = "data/companies";
      const narrativesDir = "data/narratives";

      const details = await companyDetails();

      await fs.mkdir(path.join(process.cwd(), dataDir), {recursive: true});
      await fs.mkdir(path.join(process.cwd(), narrativesDir), {
        recursive: true,
      });

      const executiveSummaryTarget = path.join(
        narrativesDir,
        "executive-summary.json",
      );
      const introEssayTarget = path.join(narrativesDir, "intro-essay.json");
      const acknowledgementsTarget = path.join(
        narrativesDir,
        "acknowledgements.json",
      );
      const keyFindingsTarget = path.join(narrativesDir, "key-findings.json");
      const methodologyTarget = path.join(narrativesDir, "methodology.json");
      const policyRecommendationsTarget = path.join(
        narrativesDir,
        "policy-recommendations.json",
      );
      const algorithmsTarget = path.join(narrativesDir, "algorithms.json");
      const chinaTechGiantsTarget = path.join(
        narrativesDir,
        "china-tech-giants.json",
      );
      const compareTarget = path.join(narrativesDir, "compare.json");

      console.log(`Pull content for: ${executiveSummaryTarget}`);

      await narrativePage("Executive Summary").then(
        writeJsonFile(executiveSummaryTarget),
      );

      console.log(`Pull content for: ${introEssayTarget}`);

      await narrativePage("Intro Essay").then(writeJsonFile(introEssayTarget));

      console.log(`Pull content for: ${acknowledgementsTarget}`);

      await narrativePage("Acknowledgements").then(
        writeJsonFile(acknowledgementsTarget),
      );

      console.log(`Pull content for: ${keyFindingsTarget}`);

      await narrativePage("Key Findings").then(
        writeJsonFile(keyFindingsTarget),
      );

      console.log(`Pull content for: ${methodologyTarget}`);

      await narrativePage("Methodology").then(writeJsonFile(methodologyTarget));

      console.log(`Pull content for: ${policyRecommendationsTarget}`);

      await narrativePage("Policy Recommendations").then(
        writeJsonFile(policyRecommendationsTarget),
      );

      console.log(`Pull content for: ${algorithmsTarget}`);

      await narrativePage("Algorithms").then(writeJsonFile(algorithmsTarget));

      console.log(`Pull content for: ${chinaTechGiantsTarget}`);

      await narrativePage("China Tech Giants").then(
        writeJsonFile(chinaTechGiantsTarget),
      );

      console.log(`Pull content for: ${compareTarget}`);

      await comparePage("Compare").then(writeJsonFile(compareTarget));

      await Promise.all(
        details.map(async (company) => {
          const companyDir = path.join(companiesDir, company.id);
          await fs.mkdir(path.join(process.cwd(), companyDir), {
            recursive: true,
          });

          console.log(`Pull company details for: ${company.id}.`);

          const target = path.join(companyDir, "details.json");
          return writeJsonFile(target)(company);
        }),
      );

      console.log(`


As a last step you have to still place the illustration for the algorithms
spotlight in place. Probably the target is \`data/images/algorithms/image3.png\`.
You can verify the target by running one of the two commands:

On Linux: xdg-open data/images/algorithms/image3.png
On macOS: open data/images/algorithms/image3.png

To copy the illustration in place run the following command and make sure that
target matches the real illustration.

cp csv/algorithm-illustration.png data/images/algorithms/image3.png
`);
    })
    .command(
      "pdf",
      "generate pdf's.",
      {
        headless: {
          type: "boolean",
          default: true,
        },
      },
      async (argv) => {
        const pdfDir = "public/pdf/companies";

        const allCompanies = await companies();

        await fs.mkdir(path.join(process.cwd(), pdfDir), {recursive: true});

        let {browse, dispose} = await browser(argv.headless);
        let restartBrowser = false;

        // FIXME: This will not restart pdf generation for a company if it
        // fails.
        for await (const {id: companyId} of allCompanies) {
          if (restartBrowser) {
            await dispose();
            const newBrowser = await browser(argv.headless);
            browse = newBrowser.browse;
            dispose = newBrowser.dispose;
            restartBrowser = false;
          }

          const href = `http://localhost:3000/index2020/pdf/${companyId}`;
          const target = path.join(process.cwd(), pdfDir, `${companyId}.pdf`);

          console.log(`Generate company PDF for: ${companyId}.`);

          try {
            await browse(
              async (browserApi: BrowserApi): Promise<void> => {
                await companyPdf(href, target, browserApi);
              },
            );
          } catch (error) {
            console.error(error);
            console.error("Restarting browser.");
            restartBrowser = true;
          }
        }

        await dispose();
      },
    )
    .demandCommand(1)
    .help()
    .alias("help", "h")
    .hide("version").argv;
})();
