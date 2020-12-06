/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import Select, {
  ActionMeta,
  components,
  ControlProps,
  InputProps,
  MenuListComponentProps,
  MultiValueProps,
  OptionProps,
  PlaceholderProps,
  ValueType,
} from "react-select";

import {SelectOption} from "../types";
import CompanyTag from "./company-tag";

interface CompanySelectorProps {
  companies: SelectOption[];
  selected: string[];
  onSelect: (companies: string[]) => void;
}

const Input = (props: InputProps) => {
  return <components.Input {...props} className="text-xxs" />;
};

const MenuList = ({
  children,
  ...props
}: MenuListComponentProps<SelectOption, true>) => {
  return (
    <div className="flex flex-wrap bg-white" {...props}>
      {children}
    </div>
  );
};

const MultiValue = ({
  data: {value, label},
  setValue,
}: MultiValueProps<SelectOption>) => {
  return (
    <CompanyTag
      key={value}
      active
      className="m-1 bg-prissian text-white"
      company={label}
      onClick={() => setValue([{label, value}], "deselect-option")}
    />
  );
};
const Placeholder = ({
  children,
  innerProps,
}: PlaceholderProps<SelectOption, true>) => {
  return (
    <div className="text-xs text-black" {...innerProps}>
      {children}
    </div>
  );
};

const ControlComponent = ({
  children,
  innerRef,
  innerProps,
}: ControlProps<SelectOption, true>) => {
  return (
    <div
      className="bg-beige border-b-2 border-prissian flex flex-row justify-between items-start w-full"
      ref={innerRef}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const IndicatorSeparator = () => {
  return <span />;
};

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<SelectOption, true>) => {
  const {value, label} = data;

  const className = c("m-1", {
    "bg-prissian text-white": isFocused && !isSelected,
    "bg-beige text-prissian": !isFocused && !isSelected,
  });

  return (
    <div ref={innerRef} {...innerProps}>
      <CompanyTag key={value} className={className} company={label} />
    </div>
  );
};

const CompanySelector = ({
  companies,
  selected,
  onSelect,
}: CompanySelectorProps) => {
  const handleSelectCompany = (
    value: ValueType<SelectOption, true>,
    {action}: ActionMeta<SelectOption>,
  ) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case "select-option": {
        if (value) {
          const nextSelectedCompanies = new Set([
            ...selected,
            ...value.map(({value: v}) => v),
          ]);
          onSelect([...nextSelectedCompanies]);
        }

        break;
      }
      case "deselect-option": {
        if (value) {
          const nextSelectedCompanies = new Set(selected);
          value.forEach(({value: v}) => nextSelectedCompanies.delete(v));
          onSelect([...nextSelectedCompanies]);
        }

        break;
      }
      case "clear": {
        onSelect([]);
        break;
      }
    }
  };

  return (
    <div className="w-full">
      <Select
        id="company-select"
        className="font-circular"
        placeholder="All companies"
        options={companies}
        value={companies.filter((obj) => selected.includes(obj.value))}
        isMulti
        isClearable
        closeMenuOnSelect={false}
        components={{
          Input,
          MenuList,
          MultiValue,
          Placeholder,
          IndicatorSeparator,
          Option,
          Control: ControlComponent,
        }}
        onChange={handleSelectCompany}
      />
    </div>
  );
};

export default CompanySelector;
