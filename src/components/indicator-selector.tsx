import c from "clsx";
import React from "react";
import Select, {
  ControlProps,
  OptionProps,
  SingleValueProps,
  ValueType,
} from "react-select";

import {SelectOption} from "../types";

export interface IndicatorSelectOption extends SelectOption {
  isParent: boolean;
  hasParent: boolean;
}

interface IndicatorSelectorProps {
  indicators: IndicatorSelectOption[];
  selected: IndicatorSelectOption;
  onSelect: (indicator: string) => void;
}

const IndicatorSeparator = () => {
  return <span />;
};

const ControlComponent = ({
  children,
}: ControlProps<IndicatorSelectOption, false>) => {
  return (
    <div className="border-b-2 border-prissian flex flex-row justify-between items-start w-full">
      {children}
    </div>
  );
};

const SingleValue = ({children}: SingleValueProps<IndicatorSelectOption>) => {
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
}: OptionProps<IndicatorSelectOption, false>) => {
  const {value, isParent, hasParent} = data;
  const isNotFirstOption = options[0]?.value !== value;

  const className = c("text-xs font-circular pl-2 pr-2", {
    "bg-prissian text-white": isSelected,
    "bg-beige text-prissian": isFocused && !isSelected,
    "text-disabled-dark": isParent,
    "cursor-pointer": !isSelected && !isParent,
    "bg-white text-prissian": !isFocused && !isSelected && !isParent,
    "pl-4": hasParent,
    // We inject a little space before the first option of a new category, but
    // not the very first option of the list of options.
    "mt-3": isNotFirstOption && /^[FGP]+1$/.test(data.value),
  });

  if (isParent)
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <div className={className} ref={innerRef}>
        {data.label}
      </div>
    );

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
  const handleChange = (value: ValueType<IndicatorSelectOption, false>) => {
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
