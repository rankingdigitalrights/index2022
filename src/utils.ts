import {
  CompanyKind,
  ElementValue,
  IndicatorCategory,
  IndicatorCategoryExt,
  IndicatorScore,
  NA,
  ServiceKind,
} from "./types";

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

export const identity = (): void => {};

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

/*
 * Some utility functions to parse the CSV data.
 */
export const floatOrNA = (value: string): number | NA =>
  isNA(value) ? "NA" : Number.parseFloat(value);

export const stringOrNil = (value: string): string | undefined =>
  value === "NA" ? undefined : value;

export const mapBoolean = (value: string): boolean => {
  switch (value) {
    case "TRUE":
      return true;
    case "FALSE":
      return false;
    default:
      return unreachable(`Failed to parse ${value} as boolean`);
  }
};

export const mapCategory = (value: string): IndicatorCategory => {
  switch (value) {
    case "G":
      return "governance";
    case "F":
      return "freedom";
    case "P":
      return "privacy";
    default: {
      throw new Error("Unknown score category.");
    }
  }
};

export const mapExtCategory = (value: string): IndicatorCategoryExt => {
  switch (value) {
    case "G":
    case "Governance":
      return "governance";
    case "F":
    case "Freedom":
      return "freedom";
    case "P":
    case "Privacy":
      return "privacy";
    case "Total":
      return "total";
    default: {
      throw new Error("Unknown score category.");
    }
  }
};

const telecomCompanyKinds = new Set(["telcos", "telecom"]);
const platformCompanyKinds = new Set(["platforms", "internet"]);

export const mapCompanyKindOrNil = (value: string): CompanyKind | void => {
  if (telecomCompanyKinds.has(value)) return "telecom";
  if (platformCompanyKinds.has(value)) return "internet";
  return undefined;
};

export const mapCompanyKind = (value: string): CompanyKind => {
  if (telecomCompanyKinds.has(value)) return "telecom";
  if (platformCompanyKinds.has(value)) return "internet";
  return unreachable(`Failed to map ${value} to a company kind`);
};

export const mapElementValue = (value: string): ElementValue => {
  switch (value) {
    case "NA":
      return "NA";
    case "New / Revised Element":
      return "New / Revised Element";
    case "No disclosure found":
    case "no disclosure found":
      return "No Disclosure Found";
    case "No":
    case "no":
      return "No";
    case "Yes":
    case "yes":
      return "Yes";
    case "not selected":
      return "Not Selected";
    case "Partial":
    case "partial":
      return "Partial";
    default: {
      throw new Error("Unknown element value.");
    }
  }
};

export const isIndicatorFamily = (value: string): boolean => value === "TRUE";

export const mapCategoryName = (category: IndicatorCategory): string => {
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

export const mapServiceKind = (value: string): ServiceKind => {
  if (
    [
      "Group",
      "OpCom",
      "broadband",
      "cloud",
      "eCommerce",
      "email",
      "messagingVoip",
      "mobile",
      "mobileEcosystem",
      "pda",
      "photoVideo",
      "search",
      "socialNetworkBlogs",
    ].includes(value)
  )
    return value as ServiceKind;

  return unreachable(`${value} could not be mapped to a valid service kind.`);
};

export const enumerate = (value: string | number): string => {
  switch (value) {
    case "1":
    case 1:
      return `${value}st`;
    case "2":
    case 2:
      return `${value}nd`;
    case "3":
    case 3:
      return `${value}rd`;
    default:
      return `${value}th`;
  }
};

export const isValidService = (
  serviceId: string,
  indicatorId: string,
  companyId: string,
  companyKind: CompanyKind,
): boolean => {
  // Indicators G1 and G5 only have elements of Group and OpCom (Company), with
  // the exception of AT&T and digital platforms, which only have Group.
  if (["G01", "G05"].includes(indicatorId)) {
    if (serviceId === "Group") return true;
    if (
      serviceId === "OpCom" &&
      companyKind === "telecom" &&
      companyId !== "ATT"
    )
      return true;

    // All other services are skipped.
    return false;
  }

  // Indicators G2, G3 and G4x have services and Group and OpCom (Full) with the
  // exception of AT&T digital platforms.
  if (
    indicatorId.startsWith("G02") ||
    indicatorId.startsWith("G03") ||
    indicatorId.startsWith("G04")
  ) {
    if (serviceId !== "OpCom") return true;
    if (
      serviceId === "OpCom" &&
      companyId !== "ATT" &&
      companyKind === "telecom"
    )
      return true;
  }

  // All F and P indicators, and G6x (the rest) only have service elements
  // (Services).
  if (!["OpCom", "Group"].includes(serviceId)) return true;

  return false;
};
