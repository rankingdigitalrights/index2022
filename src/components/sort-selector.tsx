/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import Select, {
  components,
  ControlProps,
  InputProps,
  OptionProps,
  SingleValueProps,
  ValueType,
} from "react-select";

import {SelectOption} from "../types";

interface SortSelectorProps {
  strategies: SelectOption[];
  selected: string;
  onSelect: (strategy: string) => void;
}

const Input = (props: InputProps) => {
  return <components.Input {...props} className="text-xxs" />;
};

const IndicatorSeparator = () => {
  return <span />;
};

const ControlComponent = ({
  children,
  innerRef,
  innerProps,
}: ControlProps<SelectOption, false>) => {
  return (
    <div
      className="border-b-2 border-prissian flex flex-row justify-between items-start w-full"
      ref={innerRef}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const SingleValue = (props: SingleValueProps<SelectOption>) => {
  return <components.SingleValue {...props} className="text-xs" />;
};

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<SelectOption, false>) => {
  const className = c("text-xs pl-2 pr-2", {
    "bg-prissian text-white": isSelected,
    "bg-beige text-prissian": isFocused && !isSelected,
    "cursor-pointer": !isSelected,
    "bg-white text-prissian": !isFocused && !isSelected,
  });

  return (
    <div className={className} ref={innerRef} {...innerProps}>
      {data.label}
    </div>
  );
};

const SortSelector = ({strategies, selected, onSelect}: SortSelectorProps) => {
  const handleChange = (value: ValueType<SelectOption, false>) => {
    if (value) onSelect(value.value);
  };

  const selectedOption = strategies.find(({value}) => selected === value);

  return (
    <div className="w-full">
      <Select
        id="indicator-select"
        options={strategies}
        value={selectedOption}
        className="font-circular"
        openMenuOnFocus
        components={{
          Input,
          IndicatorSeparator,
          SingleValue,
          Option,
          Control: ControlComponent,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default SortSelector;
