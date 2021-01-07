/* eslint no-console: off */
import {promises as fs} from "fs";
import path from "path";
import yargs from "yargs";

import {
  companies,
  companyIndices,
  companyRanking,
  indicatorIndices,
  indicators,
} from "../src/csv";
import {companyDetails} from "../src/google";
import generateNav from "../src/navigation";
import {CompanyKind} from "../src/types";
import {unreachable} from "../src/utils";

type OutOrFile =
  | {
      target: "stdout";
    }
  | {
      target: "file";
      output: string;
    };

const outOrFile = async (opts: OutOrFile, data: unknown): Promise<void> => {
  switch (opts.target) {
    case "stdout": {
      console.log(JSON.stringify(data, undefined, "  "));
      return;
    }
    case "file": {
      await fs.writeFile(
        path.join(process.cwd(), opts.output),
        JSON.stringify(data),
      );
      return;
    }
    default:
      unreachable("Unknown output target.");
  }
};

(async (): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  yargs
    .scriptName("indexctl")
    .command("data", "generate data structures.", async () => {
      const dataDir = "data";
      const companiesDir = "data/companies";
      const indicatorsDir = "data/indicators";

      const [
        allCompanies,
        allIndicators,
        scores,
        indicatorScores,
        details,
      ] = await Promise.all([
        companies(),
        indicators(),
        companyIndices(),
        indicatorIndices(),
        companyDetails(),
      ]);

      await fs.mkdir(path.join(process.cwd(), dataDir), {recursive: true});

      const companiesTarget: OutOrFile = {
        target: "file",
        output: path.join(dataDir, "companies.json"),
      };

      const indicatorsTarget: OutOrFile = {
        target: "file",
        output: path.join(dataDir, "indicators.json"),
      };

      await Promise.all([
        outOrFile(companiesTarget, allCompanies),
        outOrFile(indicatorsTarget, allIndicators),
        Promise.all(
          details.map(async (company) => {
            const companyDir = path.join(companiesDir, company.id);
            await fs.mkdir(path.join(process.cwd(), companyDir), {
              recursive: true,
            });

            const target: OutOrFile = {
              target: "file",
              output: path.join(companyDir, "details.json"),
            };
            return outOrFile(target, company);
          }),
        ),
        Promise.all(
          scores.map(async (score) => {
            const companyDir = path.join(companiesDir, score.id);
            await fs.mkdir(path.join(process.cwd(), companyDir), {
              recursive: true,
            });
            const target: OutOrFile = {
              target: "file",
              output: path.join(companyDir, "scores.json"),
            };
            return outOrFile(target, score);
          }),
        ),
        Promise.all(
          indicatorScores.map(async (indicator) => {
            const indicatorDir = path.join(indicatorsDir, indicator.id);
            await fs.mkdir(path.join(process.cwd(), indicatorDir), {
              recursive: true,
            });
            const target: OutOrFile = {
              target: "file",
              output: path.join(indicatorDir, "scores.json"),
            };
            return outOrFile(target, indicator);
          }),
        ),
        (["telecom", "internet"] as CompanyKind[]).map(
          async (kind: CompanyKind) => {
            const target: OutOrFile = {
              target: "file",
              output: path.join(dataDir, `ranking-${kind}.json`),
            };
            const ranking = await companyRanking(kind);
            return outOrFile(target, ranking);
          },
        ),
      ]);
    })
    .command("fixtures", "generate test fixtures.", async () => {
      const fixturesDir = "fixtures";
      await fs.mkdir(path.join(process.cwd(), fixturesDir), {recursive: true});

      const [scores, indicatorScores] = await Promise.all([
        companyIndices(),
        indicatorIndices(),
      ]);

      const scoresTarget: OutOrFile = {
        target: "file",
        output: path.join(fixturesDir, "scores.json"),
      };
      const indicatorsTarget: OutOrFile = {
        target: "file",
        output: path.join(fixturesDir, "indicators.json"),
      };

      await Promise.all([
        outOrFile(scoresTarget, scores),
        outOrFile(indicatorsTarget, indicatorScores),
      ]);
    })
    .command(
      "navigation",
      "generate navigation structure.",
      {
        write: {
          type: "boolean",
          alias: "w",
          default: false,
        },
      },
      async (argv) => {
        const data = await generateNav();
        const outTarget: OutOrFile = argv.write
          ? {target: "file", output: "data/navigation.json"}
          : {target: "stdout"};
        await outOrFile(outTarget, data);
      },
    )
    .demandCommand(1)
    .help()
    .alias("help", "h")
    .hide("version").argv;
})();
