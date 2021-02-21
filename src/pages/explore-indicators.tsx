import c from "clsx";
import Link from "next/link";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer, {
  containerWidth,
} from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {allIndicators} from "../data";
import {IndicatorCategory, IndicatorSelectOption} from "../types";

interface IndicatorsProps {
  indicators: IndicatorSelectOption[];
}

export const getStaticProps = async () => {
  const indicators = (await allIndicators()).map(
    ({name: value, label, isParent, parent, category}) => ({
      value,
      isParent,
      category,
      hasParent: !!parent,
      label: `${value}. ${label}`,
    }),
  );

  return {props: {indicators}};
};

const IndicatorHeading = ({
  category,
  className,
}: {
  category: IndicatorCategory;
  className?: string;
}) => {
  let title;
  switch (category) {
    case "governance": {
      title = "G: Governance";
      break;
    }
    case "freedom": {
      title = "F: Freedom of expression";
      break;
    }
    case "privacy": {
      title = "P: Privacy";
      break;
    }
    default: {
      title = "";
    }
  }
  const colorClassName = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
  };

  return (
    <h2
      className={c(
        "font-circular font-bold text-md",
        colorClassName,
        className,
      )}
    >
      {title}
    </h2>
  );
};

const IndicatorLink = ({option}: {option: IndicatorSelectOption}) => {
  const {isParent, hasParent, label, value} = option;

  const className = c("text-sm text-black font-circular font-normal py-1", {
    "font-bold": isParent,
    "pl-6": hasParent,
  });

  if (isParent) return <div className={c(className)}>{label}</div>;

  return (
    <Link passHref href={`/indicators/${value}`}>
      <a className={className}>{label}</a>
    </Link>
  );
};

const Indicators = ({indicators}: IndicatorsProps) => {
  const governanceIndicators = indicators.filter(
    ({category}) => category === "governance",
  );
  const freedomIndicators = indicators.filter(
    ({category}) => category === "freedom",
  );
  const privacyIndicators = indicators.filter(
    ({category}) => category === "privacy",
  );

  return (
    <Layout>
      <NarrativeContainer transparent>
        {({Container}) => {
          return (
            <div>
              <Container>
                <NarrativeTitle title="Explore the data: Indicators for the 2020 RDR Index" />

                <p className="font-circular mt-6">
                  We conduct our research using human rights-based indicators
                  organized under three top-level categories: governance,
                  freedom of expression and information, and privacy.
                </p>
              </Container>

              <div
                className={c(
                  "flex flex-col self-center mx-auto xl:justify-center w-full md:flex-row mt-12 max-w-6xl",
                  containerWidth,
                )}
              >
                <div className="flex flex-col w-full mx-3 md:w-1/2 xl:w-2/5 md:mr-3 md:ml-0 lg:mr-6">
                  <IndicatorHeading category="governance" />
                  {governanceIndicators.map((option) => (
                    <IndicatorLink key={option.value} option={option} />
                  ))}
                  <IndicatorHeading className="mt-6" category="freedom" />
                  {freedomIndicators.map((option) => (
                    <IndicatorLink key={option.value} option={option} />
                  ))}
                </div>

                <div className="flex flex-col w-full mx-3 md:w-1/2 xl:w-2/5 md:ml-3 md:mr-0 lg:ml-6">
                  <IndicatorHeading category="privacy" />
                  {privacyIndicators.map((option) => (
                    <IndicatorLink key={option.value} option={option} />
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default Indicators;
