import {Story} from "@storybook/react/types-6-0";
import React from "react";

import fixtures from "../fixtures/scores.json";
import CompanyIndicatorChart from "../src/components/company-indicator-chart";
import {IndicatorCategory, IndicatorNested} from "../src/types";

interface CompanyIndicatorChartStoryProps {
  company: string;
  category: IndicatorCategory;
}

export default {
  title: "CompanyIndicatorChart",
  component: CompanyIndicatorChart,
  argTypes: {
    company: {
      control: {
        type: "select",
        options: fixtures.map(({companyPretty}) => companyPretty),
      },
    },
    category: {
      control: {
        type: "inline-radio",
        options: ["governance", "freedom", "privacy"],
      },
    },
  },
};

const Template: Story<CompanyIndicatorChartStoryProps> = ({
  category,
  company,
}) => {
  const selectedCompany = fixtures.find(
    (fixture) => fixture.companyPretty === company,
  );

  console.log(selectedCompany);

  if (!selectedCompany) throw new Error(`${company} not found in fixtures.`);

  const indicators: IndicatorNested[] = selectedCompany.indicators[
    category
  ] as IndicatorNested[];

  return <CompanyIndicatorChart indicators={indicators} />;
};

export const Chart = Template.bind({});
Chart.args = {
  category: "governance",
  company: "Ooredoo",
};
