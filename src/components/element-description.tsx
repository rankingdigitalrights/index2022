import hydrate from "next-mdx-remote/hydrate";
import {MdxRemote} from "next-mdx-remote/types";
import React from "react";

import {components} from "../mdx";

interface ElementDescriptionProps {
  description: MdxRemote.Source;
}

const ElementDescription = ({description}: ElementDescriptionProps) => {
  const desc = hydrate(description, {components});
  return <span>{desc}</span>;
};

export default ElementDescription;
