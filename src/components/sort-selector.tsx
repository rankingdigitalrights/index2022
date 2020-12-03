import React from "react";
import Select, {ControlProps, SingleValueProps, ValueType} from "react-select";

import {SelectOption} from "../types";

interface SortSelectorProps {
  strategies: SelectOption[];
  selected: string;
  onSelect: (strategy: string) => void;
}

const IndicatorSeparator = () => {
  return <span />;
};

const ControlComponent = ({children}: ControlProps<SelectOption, false>) => {
  return (
    <div className="border-b-2 border-prissian flex flex-row justify-between items-start w-full">
      {children}
    </div>
  );
};

const SingleValue = ({children}: SingleValueProps<SelectOption>) => {
  return <span className="text-xxs font-circular">{children}</span>;
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
        openMenuOnFocus
        components={{
          IndicatorSeparator,
          SingleValue,
          Control: ControlComponent,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default SortSelector;
