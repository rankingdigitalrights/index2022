import {promises as fs} from "fs";
import path from "path";
import yargs from "yargs";

import {companyIndices, indicatorIndices} from "../src/csv";
import {companyDetails} from "../src/google";
import generateNav from "../src/navigation";
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
      const companiesDir = "data/companies";
      await fs.mkdir(path.join(process.cwd(), companiesDir), {recursive: true});

      const [scores, indicators, companies] = await Promise.all([
        companyIndices(),
        indicatorIndices(),
        companyDetails(),
      ]);

      const scoresTarget: OutOrFile = {
        target: "file",
        output: "data/scores.json",
      };
      const indicatorsTarget: OutOrFile = {
        target: "file",
        output: "data/indicators.json",
      };

      await Promise.all(
        [
          outOrFile(scoresTarget, scores),
          outOrFile(indicatorsTarget, indicators),
        ].concat(
          companies.map((company) => {
            const target: OutOrFile = {
              target: "file",
              output: path.join(companiesDir, `${company.id}.json`),
            };
            return outOrFile(target, company);
          }),
        ),
      );
    })
    .command("fixtures", "generate test fixtures.", async () => {
      const fixturesDir = "fixtures";
      await fs.mkdir(path.join(process.cwd(), fixturesDir), {recursive: true});

      const [scores, indicators] = await Promise.all([
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
        outOrFile(indicatorsTarget, indicators),
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
