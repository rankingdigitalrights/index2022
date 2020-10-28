import fs from "fs";
import path from "path";
import {loadData} from "../src/data";

(async () => {
  const data = await loadData();
  console.log(JSON.stringify(data, null, "  "));
})();
