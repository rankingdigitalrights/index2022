/* eslint no-console: off */
import {promises as fs} from "fs";
import path from "path";
import yargs from "yargs";

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
import {companyDetails, policyRecommendations} from "../src/google";
import generateNav from "../src/navigation";
import {CompanyKind} from "../src/types";

const dataDir = "data";

const writeJsonFile = (
  target: string,
): ((d: unknown) => Promise<void>) => async (data: unknown): Promise<void> => {
  await fs.writeFile(path.join(process.cwd(), target), JSON.stringify(data));
};

const writeHtmlFile = (
  target: string,
): ((d: string) => Promise<void>) => async (d: string): Promise<void> => {
  await fs.writeFile(path.join(process.cwd(), target), d);
};

(async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  yargs
    .scriptName("indexctl")
    .command("data", "generate data structures.", async () => {
      const companiesDir = "data/companies";
      const indicatorsDir = "data/indicators";

      const [
        allCompanies,
        allIndicators,
        allElements,
        scores,
        details,
      ] = await Promise.all([
        companies(),
        indicators(),
        elements(),
        companyIndices(),
        companyDetails(),
      ]);

      await fs.mkdir(path.join(process.cwd(), dataDir), {recursive: true});

      const companiesTarget = path.join(dataDir, "companies.json");
      const indicatorsTarget = path.join(dataDir, "indicators.json");
      const elementsTarget = path.join(dataDir, "elements.json");
      const policyRecommendationsTarget = path.join(
        dataDir,
        "policy-recommendations.html",
      );

      console.log(`Generating ${policyRecommendationsTarget}`);

      await policyRecommendations().then(
        writeHtmlFile(policyRecommendationsTarget),
      );

      console.log(
        `Generating ${companiesTarget}, ${indicatorsTarget} and ${elementsTarget}`,
      );

      await Promise.all([
        writeJsonFile(companiesTarget)(allCompanies),
        writeJsonFile(indicatorsTarget)(allIndicators),
        writeJsonFile(elementsTarget)(allElements),
      ]);

      console.log("Generating company details.");

      await Promise.all(
        details.map(async (company) => {
          const companyDir = path.join(companiesDir, company.id);
          await fs.mkdir(path.join(process.cwd(), companyDir), {
            recursive: true,
          });

          const target = path.join(companyDir, "details.json");
          return writeJsonFile(target)(company);
        }),
      );

      console.log("Generating company scores data");
      await Promise.all(
        scores.map(async (score) => {
          const companyDir = path.join(companiesDir, score.id);
          await fs.mkdir(path.join(process.cwd(), companyDir), {
            recursive: true,
          });
          const target = path.join(companyDir, "scores.json");
          return writeJsonFile(target)(score);
        }),
      );

      await allCompanies.reduce(async (memo, company) => {
        await memo;

        // Ensure company data directory.
        const companyDir = path.join(companiesDir, company.id);
        await fs.mkdir(path.join(process.cwd(), companyDir), {
          recursive: true,
        });

        console.log(`Generating company data for ${company.name}`);

        const target = path.join(companyDir, "services.json");
        const validCompanyServices = await companyServices(company.id);
        return writeJsonFile(target)(validCompanyServices);
      }, Promise.resolve());

      // Generate companies for every indicator.
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

        console.log(`Generating indicator data for ${indicator.name}`);

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

      console.log("Generating ranking scores data.");

      await Promise.all(
        (["telecom", "internet"] as CompanyKind[]).map(
          async (kind: CompanyKind) => {
            const target = path.join(dataDir, `ranking-${kind}.json`);
            const ranking = await companyRanking(kind);
            return writeJsonFile(target)(ranking);
          },
        ),
      );
    })
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
    .command("navigation", "generate navigation structure.", async () => {
      const data = await generateNav();
      const outTarget = path.join(dataDir, "navigation.json");
      await writeJsonFile(outTarget)(data);
    })
    .demandCommand(1)
    .help()
    .alias("help", "h")
    .hide("version").argv;
})();
