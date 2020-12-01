import {promises as fs} from "fs";
import path from "path";
import yargs from "yargs";

import {companyIndices, indicatorIndices} from "../src/data";
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
    .command(
      "fixtures",
      "generate data fixtures.",
      {
        write: {
          type: "boolean",
          alias: "w",
          default: false,
        },
      },
      async (argv) => {
        const scores = await companyIndices();
        const indicators = await indicatorIndices();

        const scoresTarget: OutOrFile = argv.write
          ? {target: "file", output: "stories/scores-fixtures.json"}
          : {target: "stdout"};

        const indicatorsTarget: OutOrFile = argv.write
          ? {target: "file", output: "stories/indicator-fixtures.json"}
          : {target: "stdout"};

        await Promise.all([
          outOrFile(scoresTarget, scores),
          outOrFile(indicatorsTarget, indicators),
        ]);
      },
    )
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
