import React from "react";

interface IndicatorSelectorProps {
  indicators: Array<{id: string; label: string}>;
  selected: string;
  onSelect: (id: string) => void;
}

const IndicatorSelector = ({
  indicators,
  selected,
  onSelect,
}: IndicatorSelectorProps) => {
  return (
    <div className="w-full">
      <select
        className="w-full text-lg text-prissian font-black font-platform"
        name="indicator-selector"
        value={selected}
        onChange={(event) => onSelect(event.target.value)}
      >
        {indicators.map(({id, label}) => (
          <option key={id} value={id}>
            {id}. {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IndicatorSelector;
