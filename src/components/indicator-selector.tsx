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

export interface IndicatorSelectOption extends SelectOption {
  isParent: boolean;
  hasParent: boolean;
}

interface IndicatorSelectorProps {
  indicators: IndicatorSelectOption[];
  selected: IndicatorSelectOption;
  onSelect: (indicator: string) => void;
}

const Input = (props: InputProps) => {
  return <components.Input {...props} className="text-lg text-prissian" />;
};

const IndicatorSeparator = () => {
  return <span />;
};

const ControlComponent = ({
  children,
  innerRef,
  innerProps,
}: ControlProps<IndicatorSelectOption, false>) => {
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

const SingleValue = ({
  children,
  innerProps,
}: SingleValueProps<IndicatorSelectOption>) => {
  return (
    <div className="text-lg" {...innerProps}>
      {children}
    </div>
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
      <div className={className} ref={innerRef}>
        {data.label}
      </div>
    );

  return (
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
        className="text-xs font-platform text-prissian"
        options={indicators}
        value={selected}
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

export default IndicatorSelector;
