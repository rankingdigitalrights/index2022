import {IndicatorLens, IndicatorScore} from "./types";
import {isNA} from "./utils";

type SortOrder = "asc" | "desc";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const byScore = (order?: SortOrder) => <
  T extends Required<{score: IndicatorScore}>
>(
  a: T,
  b: T,
) => {
  // The default is to sort ascending.
  let left = -1;
  let right = 1;

  if (order && order === "desc") {
    left = 1;
    right = -1;
  }

  // In order to locate scores with NA last in line we set it to -1 to sort it
  // below the real 0 scores.
  const aScore = isNA(a.score) ? -1 : a.score;
  const bScore = isNA(b.score) ? -1 : b.score;

  if (aScore < bScore) return left;
  if (aScore > bScore) return right;
  return 0;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const byRankAndName = (order?: SortOrder) => <
  T extends Required<{rank: number; companyPretty: string}>
>(
  a: T,
  b: T,
) => {
  // The default is to sort ascending.
  let left = -1;
  let right = 1;

  if (order && order === "desc") {
    left = 1;
    right = -1;
  }

  // First we sort the ranking by the actual rank.
  if (a.rank < b.rank) return left;
  if (a.rank > b.rank) return right;

  // If two companies have the same rank we sort alphabetically.
  if (a.companyPretty < b.companyPretty) return left;
  if (a.companyPretty > b.companyPretty) return right;

  return 0;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const byLens = (order?: SortOrder) => <
  T extends Required<{lens: IndicatorLens}>
>(
  a: T,
  b: T,
) => {
  // The default is to sort ascending.
  let left = -1;
  let right = 1;

  if (order && order === "desc") {
    left = 1;
    right = -1;
  }

  if (a.lens.localeCompare(b.lens) < 0) return left;
  if (a.lens.localeCompare(b.lens) > 0) return right;

  return 0;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const byCompany = (order?: SortOrder) => <
  T extends Required<{company: string}>
>(
  a: T,
  b: T,
) => {
  // The default is to sort ascending.
  let left = -1;
  let right = 1;

  if (order && order === "desc") {
    left = 1;
    right = -1;
  }

  if (a.company.localeCompare(b.company) < 0) return left;
  if (a.company.localeCompare(b.company) > 0) return right;

  return 0;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const byYear = (order?: SortOrder) => <
  T extends Required<{year: number}>
>(
  a: T,
  b: T,
) => {
  // The default is to sort ascending.
  let left = -1;
  let right = 1;

  if (order && order === "desc") {
    left = 1;
    right = -1;
  }

  if (a.year < b.year) return left;
  if (a.year > b.year) return right;
  return 0;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const byServiceKind = (order?: SortOrder) => <
  T extends Required<{kindName: string}>
>(
  a: T,
  b: T,
) => {
  // The default is to sort ascending.
  let left = -1;
  let right = 1;

  if (order && order === "desc") {
    left = 1;
    right = -1;
  }

  if (a.kindName.localeCompare(b.kindName) < 0) return left;
  if (a.kindName.localeCompare(b.kindName) > 0) return right;

  return 0;
};
