import React from "react";
import Select, {ControlProps, ValueType} from "react-select";

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

const IndicatorControlComponent = ({
  children,
}: ControlProps<IndicatorOption, false>) => {
  return (
    <div className="border-b-2 border-prissian flex flex-row justify-between items-start w-full">
      {children}
    </div>
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
          Control: IndicatorControlComponent,
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default IndicatorSelector;
