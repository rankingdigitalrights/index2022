import {promises as fs} from "fs";
import path from "path";

import generateNav from "../src/navigation";

(async (): Promise<void> => {
  const navigation = await generateNav();
  await fs.writeFile(
    path.join(process.cwd(), "data/navigation.json"),
    JSON.stringify(navigation),
  );
})();
