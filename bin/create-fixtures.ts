import {companyIndices} from "../src/data";

(async (): Promise<void> => {
  const data = await companyIndices();
  console.log(JSON.stringify(data, undefined, "  "));
})();
