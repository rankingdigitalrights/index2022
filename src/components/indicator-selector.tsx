import React from "react";
import Select, {SingleValueProps, ControlProps, ValueType} from "react-select";

export type IndicatorOption = {
  value: string;
  label: string;
};

interface IndicatorSelectorProps {
  indicators: IndicatorOption[];
  selected: IndicatorOption;
  onSelect: (indicator: string) => void;
}

const IndicatorSeparator = () => {
  return <span />;
};

const ControlComponent = ({children, props}: ControlProps<IndicatorOption, false>) => {
  return (
    <div className="border-b-2 border-prissian flex flex-row justify-between items-start w-full">
      {children}
    </div>
  );
}

const SingleValue = ({
  children,
}: SingleValueProps<IndicatorOption>) => {
  return (
    <span className="text-lg text-prissian font-platform">
      {children}
    </span>
  );
};

const IndicatorSelector = ({
  indicators,
  selected,
  onSelect,
}: IndicatorSelectorProps) => {
  const handleChange = (value: ValueType<IndicatorOption, false>) => {
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
