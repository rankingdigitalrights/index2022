import c from "clsx";
import Link from "next/link";
import React from "react";

import Layout from "../components/layout";
import NarrativeContainer from "../components/narrative-container";
import NarrativeTitle from "../components/narrative-title";
import {allIndicators} from "../data";
import ScoresByIndicator from "../images/icons/scores-by-indicator.svg";
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
      title = "F: Freedom";
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
    "pl-5": hasParent,
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
                <NarrativeTitle
                  title="Explore the data: Issue areas & Indicators"
                  Logo={ScoresByIndicator}
                />
              </Container>

              <main className="mx-auto md:w-10/12 lg:w-8/12 xl:w-8/12 2xl:w-7/12 mt-6 pt-12">
                <section className="flex flex-col mb-3 md:mb-12 md:flex-row">
                  <div className="flex flex-col md:w-1/2">
                    <IndicatorHeading category="governance" />
                    {governanceIndicators.map((option) => (
                      <IndicatorLink key={option.value} option={option} />
                    ))}
                    <IndicatorHeading className="mt-6" category="freedom" />
                    {freedomIndicators.map((option) => (
                      <IndicatorLink key={option.value} option={option} />
                    ))}
                  </div>

                  <div className="flex flex-col md:w-1/2">
                    <IndicatorHeading category="privacy" />
                    {privacyIndicators.map((option) => (
                      <IndicatorLink key={option.value} option={option} />
                    ))}
                  </div>
                </section>
              </main>
            </div>
          );
        }}
      </NarrativeContainer>
    </Layout>
  );
};

export default Indicators;
