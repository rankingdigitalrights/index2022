/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import {OptionProps, SingleValueProps} from "react-select";

import {ServiceOption} from "../types";
import {mapIcon} from "./evaluated-service";

export const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<ServiceOption, false>) => {
  const icon = mapIcon(data.kind, false);

  const className = c("text-sm pl-2 pr-2 p-1 flex items-center", {
    "bg-prissian text-white": isSelected,
    "bg-beige text-prissian": isFocused && !isSelected,
    "cursor-pointer": !isSelected,
    "bg-white text-prissian": !isFocused && !isSelected,
  });

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      {icon} {data.label}
    </div>
  );
};

export const SingleValue = ({
  innerProps,
  data,
}: SingleValueProps<ServiceOption>) => {
  const icon = mapIcon(data.kind, false);
  return (
    <div className="text-sm flex items-center" {...innerProps}>
      {icon} {data.label}
    </div>
  );
};
