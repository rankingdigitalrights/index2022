import React from "react";
import Select, {ControlProps, SingleValueProps, ValueType} from "react-select";

import {SelectOption} from "../types";

interface IndicatorSelectorProps {
  indicators: SelectOption[];
  selected: SelectOption;
  onSelect: (indicator: string) => void;
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
  return (
    <span className="text-lg text-prissian font-platform">{children}</span>
  );
};

const IndicatorSelector = ({
  indicators,
  selected,
  onSelect,
}: IndicatorSelectorProps) => {
  const handleChange = (value: ValueType<SelectOption, false>) => {
    if (value) onSelect(value.value);
  };

  return (
    <div className="w-full">
      <Select
        id="indicator-select"
        options={indicators}
        value={selected}
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

export default IndicatorSelector;
