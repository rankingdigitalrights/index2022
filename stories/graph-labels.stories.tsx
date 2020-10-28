import {Story} from "@storybook/react/types-6-0";
import React from "react";

import GraphLabel from "../src/components/graph-label";

interface GraphLabelStoriesProps {
  text: string;
}

type Sizes = "small" | "regular" | "large";

export default {
  title: "GraphLabel",
  component: GraphLabel,
};

const Template: Story<GraphLabelStoriesProps> = ({text}) => {
  return (
    <div>
      {["small", "regular", "large", "extra-large"].map((size) => {
        return [true, false].map((bold) => (
          <div key={`${size}${bold ? "-bold" : ""}`}>
            <div className="w-32">{`${size}-${bold ? "bold" : "light"}`}:</div>
            <svg version="1" xmlns="http://www.w3.org/2000/svg" height="50">
              <GraphLabel
                value={text}
                size={size as Sizes}
                transform="translate(0,18)"
                bold={bold}
              />
            </svg>
          </div>
        ));
      })}
    </div>
  );
};

export const Chart = Template.bind({});
Chart.args = {
  text: "Freedom of Expression",
};
