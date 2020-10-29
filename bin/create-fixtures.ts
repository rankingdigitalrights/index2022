import {loadData} from "../src/data";

(async (): Promise<void> => {
  const data = await loadData();
  console.log(JSON.stringify(data, undefined, "  "));
})();
