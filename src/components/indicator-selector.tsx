/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import Select, {OptionProps, ValueType} from "react-select";

import {IndicatorSelectOption} from "../types";
import {
  Control,
  Group,
  IndicatorSeparator,
  LargeInput as Input,
  LargeSingleValue as SingleValue,
} from "./selector";

interface IndicatorSelectorProps {
  indicators: IndicatorSelectOption[];
  selected: IndicatorSelectOption;
  onSelect: (indicator: string) => void;
}

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<IndicatorSelectOption, false>) => {
  const {isParent, hasParent} = data;

  const className = c("text-sm text-black font-circular p-1 pl-2 pr-2", {
    "bg-prissian text-white": isSelected || isFocused,
    "font-bold": isParent,
    "cursor-pointer": !isSelected && !isParent,
    "pl-6": hasParent,
  });

  if (isParent)
    return (
      <div className={c(className)} ref={innerRef}>
        {data.label}
      </div>
    );

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      {data.label}
    </div>
  );
};

const GroupHeading = (props: {data: IndicatorSelectOption}) => {
  const {
    data: {label, category},
  } = props;

  const className = {
    "text-cat-governance": category === "governance",
    "text-cat-freedom": category === "freedom",
    "text-cat-privacy": category === "privacy",
  };

  return (
    <span className={c("font-circular font-bold text-md ml-2", className)}>
      {label}
    </span>
  );
};

const IndicatorSelector = ({
  indicators,
  selected,
  onSelect,
}: IndicatorSelectorProps) => {
  const handleChange = (value: ValueType<IndicatorSelectOption, false>) => {
    if (value) onSelect(value.value);
  };

  const governanceIndicators = indicators.filter(
    ({category}) => category === "governance",
  );
  const freedomIndicators = indicators.filter(
    ({category}) => category === "freedom",
  );
  const privacyIndicators = indicators.filter(
    ({category}) => category === "privacy",
  );

  const options = [
    {
      category: "governance",
      label: "G: Governance",
      options: governanceIndicators,
    },
    {
      category: "freedom",
      label: "F: Freedom of expression",
      options: freedomIndicators,
    },
    {category: "privacy", label: "P: Privacy", options: privacyIndicators},
  ];

  return (
    <div className="w-full">
      <Select
        instanceId="indicator-select"
        className="text-xs font-platform text-prissian"
        options={options}
        value={selected}
        openMenuOnFocus
        isSearchable={false}
        components={{
          Group,
          GroupHeading,
          IndicatorSeparator,
          Input,
          Option,
          SingleValue,
          Control,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default IndicatorSelector;
