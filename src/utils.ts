import {IndicatorScore, NA, ScoreCategory} from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoize = <T extends (...args: any[]) => any>(
  fn: T,
): ((...funcArgs: Parameters<T>) => ReturnType<T>) => {
  let memoizedFn = (...args: Parameters<T>): ReturnType<T> => {
    const data = fn(...args);

    memoizedFn = (..._args: Parameters<T>): ReturnType<T> => data;
    return memoizedFn(...args);
  };

  return memoizedFn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoizeAsync = <T extends (...args: any[]) => any>(
  fn: T,
): ((...funcArgs: Parameters<T>) => ReturnType<T>) => {
  let memoizedFn = (...args: Parameters<T>): ReturnType<T> => {
    return fn(...args).then((data: ReturnType<T>) => {
      memoizedFn = (..._args: Parameters<T>): ReturnType<T> => data;
      return memoizedFn(...args);
    });
  };

  return memoizedFn;
};

export const isString = (x: unknown): x is string => {
  return typeof x === "string";
};

export const isNumber = (x: unknown): x is number => {
  return typeof x === "number";
};

export const isNA = (x: unknown): x is NA => {
  return x === "NA";
};

/*
 * Denote code paths that won't be reached under normal circumstances.
 */
export const unreachable = (message?: string): never => {
  if (message === undefined) {
    throw new Error("Unreachable code reached.");
  } else {
    throw new Error(`Unreachable code reached: ${message}`);
  }
};

export const mapCategoryName = (category: ScoreCategory): string => {
  switch (category) {
    case "governance":
      return "Governance";
    case "freedom":
      return "Freedom of Expression";
    case "privacy":
      return "Privacy";
    default:
      return unreachable(`Category ${category} couldn't be mapped.`);
  }
};

export const mapScore = (score: IndicatorScore): number => {
  return isNA(score) ? 0 : score;
};
