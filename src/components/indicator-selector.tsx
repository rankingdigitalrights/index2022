import c from "clsx";
import React from "react";
import Select, {
  ControlProps,
  OptionProps,
  SingleValueProps,
  ValueType,
} from "react-select";

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

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
  options,
}: OptionProps<SelectOption, false>) => {
  const isNotFirstOption = options[0]?.value !== data.value;

  const className = c("text-xs font-circular pl-2 pr-2", {
    "bg-disabled-dark text-white": isSelected,
    "bg-prissian text-white": isFocused,
    "cursor-pointer": !isSelected,
    "bg-white text-prissian": !isFocused && !isSelected,
    // We inject a little space before the first option of a new category, but
    // not the very first option of the list of options.
    "mt-3": isNotFirstOption && /^[FGP]+1$/.test(data.value),
  });

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div className={className} ref={innerRef} {...innerProps}>
      {data.label}
    </div>
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
          Option,
          Control: ControlComponent,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default IndicatorSelector;
