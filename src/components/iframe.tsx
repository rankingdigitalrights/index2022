/* eslint react/no-danger: off */
import React from "react";

interface IframeProps {
  html: string;
}

const Iframe = ({html}: IframeProps) => {
  return <div dangerouslySetInnerHTML={{__html: html}} />;
};

export default Iframe;
