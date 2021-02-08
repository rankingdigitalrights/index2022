/* eslint react/jsx-props-no-spreading: off */
import c from "clsx";
import React from "react";
import Select, {
  ActionMeta,
  components,
  ControlProps,
  GroupProps,
  InputProps,
  MenuListComponentProps,
  MultiValueProps,
  OptionProps,
  PlaceholderProps,
  ValueType,
} from "react-select";

import {CompanySelectOption} from "../types";
import CompanyKindLabel from "./company-kind-label";
import CompanyTag from "./company-tag";

interface CompanySelectorProps {
  companies: CompanySelectOption[];
  selected: string[];
  onSelect: (companies: string[]) => void;
  className?: string;
}

const Input = (props: InputProps) => {
  return <components.Input {...props} className="text-sm" />;
};

const MenuList = ({
  children,
  innerRef,
}: MenuListComponentProps<CompanySelectOption, true>) => {
  return (
    <div
      className="flex flex-wrap bg-white divide-y divide-light-disabled"
      ref={innerRef}
    >
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

const Placeholder = ({
  children,
  innerProps,
}: PlaceholderProps<CompanySelectOption, true>) => {
  return (
    <div className="text-sm text-black" {...innerProps}>
      {children}
    </div>
  );
};

const ControlComponent = ({
  children,
  innerRef,
  innerProps,
}: ControlProps<CompanySelectOption, true>) => {
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

const GroupHeading = (props: {data: CompanySelectOption}) => {
  const {
    data: {kind},
  } = props;

  return <CompanyKindLabel kind={kind} theme="dark" className="px-2 ml-1" />;
};

const Group = ({
  Heading,
  children,
  ...props
}: GroupProps<CompanySelectOption, true>) => {
  return (
    <div className="py-2 bg-white">
      <Heading {...props} />
      <div className="flex flex-wrap bg-white px-2 mt-1">{children}</div>
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

  const internetCompanies = companies.filter(({kind}) => kind === "internet");
  const telecomCompanies = companies.filter(({kind}) => kind === "telecom");

  const options = [
    {kind: "internet", options: internetCompanies},
    {kind: "telecom", options: telecomCompanies},
  ];

  return (
    <div
      className={c("w-full flex flex-col justify-between h-16 z-10", className)}
    >
      <span className="text-sm font-circular">Select companies:</span>

      <Select
        id="company-select"
        className="font-circular"
        placeholder="All companies"
        options={options}
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
          Group,
          GroupHeading,
          Control: ControlComponent,
        }}
        onChange={handleSelectCompany}
      />
    </div>
  );
};

export default CompanySelector;
