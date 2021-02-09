/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import Select, {
  components,
  ControlProps,
  GroupProps,
  InputProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  ValueType,
} from "react-select";

import {SelectOption} from "../types";

export const Input = (props: InputProps) => {
  return <components.Input {...props} className="text-sm" />;
};

export const LargeInput = (props: InputProps) => {
  return (
    <components.Input
      {...props}
      className="text-lg leading-none text-prissian"
    />
  );
};

export const SingleValue = <T extends SelectOption>(
  props: SingleValueProps<T>,
) => {
  return <components.SingleValue {...props} className="text-sm" />;
};

export const LargeSingleValue = <T extends SelectOption>({
  children,
  innerProps,
}: SingleValueProps<T>) => {
  return (
    <div className="text-lg flex-1 leading-none" {...innerProps}>
      {children}
    </div>
  );
};

export const IndicatorSeparator = () => {
  return <span />;
};

export const Control = <T extends SelectOption, K extends boolean>({
  children,
  innerRef,
  innerProps,
}: ControlProps<T, K>) => {
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

export const Group = <T extends SelectOption, K extends boolean>({
  Heading,
  children,
  isMulti,
  ...props
}: GroupProps<T, K>) => {
  const className = {
    "flex flex-wrap": isMulti,
  };

  return (
    <div className="p-2 bg-white">
      <Heading {...props} />
      <div className={c("bg-white mt-1", className)}>{children}</div>
    </div>
  );
};

export const Placeholder = <T extends SelectOption, K extends boolean>({
  children,
  innerProps,
}: PlaceholderProps<T, K>) => {
  return (
    <div className="text-sm text-black" {...innerProps}>
      {children}
    </div>
  );
};

export const Option = <T extends SelectOption, K extends boolean>({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<T, K>) => {
  const className = c("text-sm pl-2 pr-2 p-1", {
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

interface SelectorProps<T extends SelectOption> {
  options: T[];
  onSelect: (value: T) => void;
  className?: string;
}

const Selector = <T extends SelectOption>({
  options,
  onSelect,
  className,
}: SelectorProps<T>) => {
  const handleChange = (value: ValueType<T, false>) => {
    if (value) onSelect(value);
  };

  return (
    <div className={c("flex flex-col justify-between h-16", className)}>
      <span className="text-sm font-circular">Sort:</span>
      <Select
        instanceId="sort-select"
        options={options}
        className="font-circular text-sm"
        openMenuOnFocus
        components={{
          Input,
          IndicatorSeparator,
          Placeholder,
          SingleValue,
          Option,
          Control,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default Selector;
