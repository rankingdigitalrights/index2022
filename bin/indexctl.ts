/* eslint no-console: off, no-restricted-syntax: off */
import {promises as fs} from "fs";
import path from "path";
import yargs from "yargs";

import browser, {BrowserApi} from "../src/browser";
import {
  companies,
  companyIndices,
  companyRanking,
  companyServices,
  elements,
  indicatorAverages,
  indicatorCompanies,
  indicatorDetails,
  indicatorElements,
  indicatorIndices,
  indicators,
  indicatorScores,
} from "../src/csv";
import {companyDetails, narrativeContent} from "../src/google";
import {companyPdf} from "../src/pdf";
import {CompanyKind, IndicatorCategoryExt} from "../src/types";

const dataDir = "data";

const writeJsonFile = (
  target: string,
): ((d: unknown) => Promise<void>) => async (data: unknown): Promise<void> => {
  await fs.writeFile(path.join(process.cwd(), target), JSON.stringify(data));
};

const writeFile = (target: string): ((d: string) => Promise<void>) => async (
  d: string,
): Promise<void> => {
  await fs.writeFile(path.join(process.cwd(), target), d);
};

(async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  yargs
    .scriptName("indexctl")
    .command("csv", "generate data structures from CSV sources.", async () => {
      const companiesDir = "data/companies";
      const indicatorsDir = "data/indicators";
      const rankingsDir = "data/rankings";

      const [
        allCompanies,
        allIndicators,
        allElements,
        scores,
      ] = await Promise.all([
        companies(),
        indicators(),
        elements(),
        companyIndices(),
      ]);

      await fs.mkdir(path.join(process.cwd(), companiesDir), {recursive: true});
      await fs.mkdir(path.join(process.cwd(), indicatorsDir), {
        recursive: true,
      });
      await fs.mkdir(path.join(process.cwd(), rankingsDir), {
        recursive: true,
      });

      const companiesTarget = path.join(dataDir, "companies.json");
      const indicatorsTarget = path.join(dataDir, "indicators.json");
      const elementsTarget = path.join(dataDir, "elements.json");

      console.log(
        `Generating spec data: ${companiesTarget}, ${indicatorsTarget} and ${elementsTarget}`,
      );

      await Promise.all([
        writeJsonFile(companiesTarget)(allCompanies),
        writeJsonFile(indicatorsTarget)(allIndicators),
        writeJsonFile(elementsTarget)(allElements),
      ]);

      /*
       * Company scores, e.g. ./data/companies/Amazon.scores.json
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

                console.log(`Generating ranking scores for: ${category}`);

                const ranking = await companyRanking(kind, category);
                return writeJsonFile(target)(ranking);
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

      const introEssayTarget = path.join(narrativesDir, "intro-essay.mdx");

      const aboutUsTarget = path.join(narrativesDir, "about-us.mdx");

      const keyFindingsTarget = path.join(narrativesDir, "key-findings.mdx");

      const methodologyTarget = path.join(narrativesDir, "methodology.mdx");

      const policyRecommendationsTarget = path.join(
        narrativesDir,
        "policy-recommendations.mdx",
      );

      const chinaTechGiantsTarget = path.join(
        narrativesDir,
        "china-tech-giants.mdx",
      );

      console.log(`Pull content for: ${introEssayTarget}`);

      await narrativeContent("Intro Essay").then(writeFile(introEssayTarget));

      console.log(`Pull content for: ${aboutUsTarget}`);

      await narrativeContent("About Us").then(writeFile(aboutUsTarget));

      console.log(`Pull content for: ${keyFindingsTarget}`);

      await narrativeContent("Key Findings").then(writeFile(keyFindingsTarget));

      console.log(`Pull content for: ${methodologyTarget}`);

      await narrativeContent("Methodology").then(writeFile(methodologyTarget));

      console.log(`Pull content for: ${policyRecommendationsTarget}`);

      await narrativeContent("Policy Recommendations").then(
        writeFile(policyRecommendationsTarget),
      );

      console.log(`Pull content for: ${chinaTechGiantsTarget}`);

      await narrativeContent("China Tech Giants").then(
        writeFile(chinaTechGiantsTarget),
      );

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

          const href = `http://localhost:3000/index2020/companies/${companyId}?print`;
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
    .command("fixtures", "generate test fixtures.", async () => {
      const fixturesDir = "fixtures";
      await fs.mkdir(path.join(process.cwd(), fixturesDir), {recursive: true});

      const [scores, indicatorIndexScores] = await Promise.all([
        companyIndices(),
        indicatorIndices(),
      ]);

      const scoresTarget = path.join(fixturesDir, "scores.json");
      const indicatorsTarget = path.join(fixturesDir, "indicators.json");

      await Promise.all([
        writeJsonFile(scoresTarget)(scores),
        writeJsonFile(indicatorsTarget)(indicatorIndexScores),
      ]);
    })
    .demandCommand(1)
    .help()
    .alias("help", "h")
    .hide("version").argv;
})();
