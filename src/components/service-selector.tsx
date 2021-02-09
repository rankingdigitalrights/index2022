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

import {ServiceOption} from "../types";

interface ServiceSelectorProps {
  services: ServiceOption[];
  onSelect: (service?: ServiceOption) => void;
  className?: string;
}

const Input = (props: InputProps) => {
  return <components.Input {...props} className="text-sm" />;
};

const IndicatorSeparator = () => {
  return <span />;
};

const ControlComponent = ({
  children,
  innerRef,
  innerProps,
}: ControlProps<ServiceOption, false>) => {
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

const SingleValue = (props: SingleValueProps<ServiceOption>) => {
  return <components.SingleValue {...props} className="text-sm" />;
};

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<ServiceOption, false>) => {
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

const ServiceSelector = ({
  services,
  onSelect,
  className,
}: ServiceSelectorProps) => {
  const handleChange = (value: ValueType<ServiceOption, false>) => {
    if (value === null) {
      onSelect(undefined);
    } else {
      onSelect(value);
    }
  };

  return (
    <div className={c("flex flex-col justify-between h-16 z-10", className)}>
      <span className="text-sm font-circular">Select service:</span>

      <Select
        instanceId="service-select"
        className="font-circular"
        options={services}
        isClearable
        closeMenuOnSelect
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

export default ServiceSelector;
