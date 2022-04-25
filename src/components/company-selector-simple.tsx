/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import Select, {
  ActionMeta,
  MenuListComponentProps,
  MultiValueProps,
  OptionProps,
  ValueType,
} from "react-select";

import {CompanySelectOption} from "../types";
import CompanyTag from "./company-tag";
import {Control, IndicatorSeparator, Input, Placeholder} from "./selector";

// FIXME: This is the same component as company-selector, but with label commented out. Eventually it would be better to add a 'label' property to the original selector, by which the label can optionally be displayed depending on which page is employing the selector component

interface CompanySelectorProps {
  companies: CompanySelectOption[];
  selected: string[];
  onSelect: (companies: string[]) => void;
  className?: string;
}

const MenuList = ({
  children,
  innerRef,
}: MenuListComponentProps<CompanySelectOption, true>) => {
  return (
    <div className="flex flex-wrap bg-white" ref={innerRef}>
      {children}
    </div>
  );
};

const MultiValue = ({
  data: {value, label, score, kind},
  setValue,
}: MultiValueProps<CompanySelectOption>) => {
  return (
    <CompanyTag
      key={value}
      active
      className="bg-prissian text-white m-1"
      company={label}
      onClick={() => setValue([{label, value, score, kind}], "deselect-option")}
    />
  );
};

const Option = ({
  isSelected,
  isFocused,
  innerRef,
  innerProps,
  data,
}: OptionProps<CompanySelectOption, true>) => {
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
  className,
}: CompanySelectorProps) => {
  const handleSelectCompany = (
    value: ValueType<CompanySelectOption, true>,
    {action}: ActionMeta<CompanySelectOption>,
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
    <div
      className={c(
        "w-full flex flex-col justify-between z-20 font-sans",
        className,
      )}
    >
      <Select
        instanceId="company-select"
        placeholder="Select companies"
        options={companies}
        value={companies.filter((obj) => selected.includes(obj.value))}
        isMulti
        isClearable
        isSearchable={false}
        closeMenuOnSelect={false}
        components={{
          Input,
          MenuList,
          MultiValue,
          Placeholder,
          IndicatorSeparator,
          Option,
          Control,
        }}
        onChange={handleSelectCompany}
      />
    </div>
  );
};

export default CompanySelector;
