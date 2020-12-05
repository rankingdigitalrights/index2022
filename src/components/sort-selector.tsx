import c from "clsx";
import React from "react";
import Select, {
  ControlProps,
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

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<SelectOption, false>) => {
  const className = c("text-xs font-circular pl-2 pr-2", {
    "bg-disabled-dark text-white": isSelected,
    "bg-prissian text-white": isFocused,
    "cursor-pointer": !isSelected,
    "bg-white text-prissian": !isFocused && !isSelected,
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
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
        openMenuOnFocus
        components={{
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
