import {useRouter} from "next/router";
import React, {useState} from "react";
import Select, {
  ActionMeta,
  ControlProps,
  MenuListComponentProps,
  MultiValueProps,
  ValueType,
} from "react-select";

import CompanyElements from "../../components/company-elements";
import CompanyTag from "../../components/company-tag";
import IndicatorSelector, {
  IndicatorOption,
} from "../../components/indicator-selector";
import Layout from "../../components/layout";
import ToggleSwitch from "../../components/toggle-switch";
import {companyIndices, indicatorData, indicatorIndices} from "../../data";
import {IndicatorIndex} from "../../types";

type CompanyOption = {
  value: string;
  label: string;
};

type Params = {
  params: {
    id: string;
  };
};

interface IndicatorPageProps {
  index: IndicatorIndex;
  indicators: IndicatorOption[];
  companies: CompanyOption[];
}

export const getStaticPaths = async () => {
  const data = await indicatorIndices();
  const paths = data.map(({id}) => ({
    params: {id},
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({params: {id: indicatorId}}: Params) => {
  const index = (await indicatorData(indicatorId)) as IndicatorIndex;
  const indicators = (await indicatorIndices()).map(({id: value, label}) => ({
    value,
    label: `${value}. ${label}`,
  }));
  const companyIndex = await companyIndices();
  const companies = companyIndex.map(({id: value, companyPretty: label}) => ({
    value,
    label,
  }));

  return {
    props: {
      index,
      indicators,
      companies,
    },
  };
};

const MenuList = ({
  options,
  getValue,
  setValue,
}: MenuListComponentProps<CompanyOption, true>) => {
  const selectedCompanies = new Set((getValue() || []).map(({value}) => value));

  return (
    <div className="flex flex-wrap bg-white">
      {options
        .filter(({value}) => !selectedCompanies.has(value))
        .map(({label, value}) => (
          <CompanyTag
            key={value}
            className="m-1"
            company={label}
            onClick={() => setValue([{label, value}], "select-option")}
          />
        ))}
    </div>
  );
};

const MultiValue = ({
  data: {value, label},
  setValue,
}: MultiValueProps<CompanyOption>) => {
  return (
    <CompanyTag
      key={value}
      active
      className="m-1"
      company={label}
      onClick={() => setValue([{label, value}], "deselect-option")}
    />
  );
};

const Placeholder = () => {
  return <span className="text-xxs font-circular">All companies</span>;
};

const ControlComponent = ({children}: ControlProps<IndicatorOption, true>) => {
  return (
    <div className="bg-beige border-b-2 border-prissian flex flex-row justify-between items-start w-full">
      {children}
    </div>
  );
};

const IndicatorSeparator = () => {
  return <span />;
};

const IndicatorPage = ({index, indicators, companies}: IndicatorPageProps) => {
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(
    new Set(),
  );
  const [literalValues, setLiteralValues] = useState(false);

  const router = useRouter();

  const activeSelector: IndicatorOption = {
    value: index.id,
    label: `${index.id}. ${index.label}`,
  };

  const handleSelectIndicator = (id: string) => {
    router.push(`/indicators/${id}`);
  };

  const handleSelectCompany = (
    value: ValueType<CompanyOption, true>,
    {action}: ActionMeta<CompanyOption>,
  ) => {
    // eslint-disable-next-line default-case
    switch (action) {
      case "select-option": {
        if (value)
          setSelectedCompanies(
            new Set([...selectedCompanies, ...value.map(({value: v}) => v)]),
          );
        break;
      }
      case "deselect-option": {
        if (value) value.forEach(({value: v}) => selectedCompanies.delete(v));
        setSelectedCompanies(new Set(selectedCompanies));
        break;
      }
      case "clear": {
        setSelectedCompanies(new Set());
        break;
      }
    }
  };

  const handleToggleSwitch = (toggle: boolean) => {
    setLiteralValues(toggle);
  };

  const dataGrids =
    selectedCompanies.size === 0
      ? index.companies
      : index.companies.filter((company) => selectedCompanies.has(company));

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex flex-col w-9/12 mx-auto">
          <IndicatorSelector
            indicators={indicators}
            selected={activeSelector}
            onSelect={handleSelectIndicator}
          />

          <section className="w-full mt-6 mx-auto">{index.description}</section>
        </div>
      </div>

      <div className="bg-beige pt-6 pb-6 mt-6">
        <div className="container mx-auto">
          <div className="flex flex-row w-9/12 mx-auto justify-between items-center">
            <div className="w-1/2 flex flex-col justify-between h-14">
              <span className="text-xs font-circular">Select companies:</span>

              <Select
                id="company-select"
                options={companies}
                value={companies.filter((obj) =>
                  selectedCompanies.has(obj.value),
                )}
                isMulti
                isClearable
                closeMenuOnSelect={false}
                components={{
                  MenuList,
                  MultiValue,
                  Placeholder,
                  IndicatorSeparator,
                  Control: ControlComponent,
                }}
                onChange={handleSelectCompany}
              />
            </div>

            <div className="w-1/4 flex flex-col justify-between h-14 mx-6">
              <span className="text-xs font-circular">Sort:</span>
              <span>&nbsp;</span>
            </div>

            <div className="w-1/4 flex flex-col justify-between h-14">
              <span className="text-xs font-circular">&nbsp;</span>

              <div>
                <ToggleSwitch
                  label="Literal values"
                  onChange={handleToggleSwitch}
                />
              </div>
            </div>
          </div>

          {dataGrids.map((company) => (
            <CompanyElements
              key={`company-element-${company}`}
              indicatorLabel={index.label}
              company={company}
              companyElements={index.elements[company] || {}}
              literalValues={literalValues}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndicatorPage;
