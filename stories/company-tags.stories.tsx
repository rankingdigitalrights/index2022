import {Story} from "@storybook/react/types-6-0";
import React from "react";

import CompanyTag, {CompanyTagProps} from "../src/components/company-tag";
import fixtures from "./scores-fixtures.json";

export default {
  title: "CompanyTag",
  component: CompanyTag,
  argTypes: {
    company: {
      control: {
        type: "select",
        options: fixtures.map(({company}) => company).sort(),
      },
    },
    active: false,
  },
};

const Template: Story<CompanyTagProps> = ({company, active}) => (
  <CompanyTag company={company} active={active} onClick={() => {}} />
);

export const Component = Template.bind({});
Component.args = {
  company: "ATT",
  active: false,
};
