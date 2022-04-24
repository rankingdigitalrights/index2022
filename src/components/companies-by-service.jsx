import React from "react";

import CompanyServiceChart from "./company-service-chart";
import {mapIcon} from "./evaluated-service";
import PillHeader from "./pill-header";

const serviceIcon = (serviceKind) => {
  return mapIcon(serviceKind, false, "white");
};

const CompaniesByService = ({scores, category}) => {
  const divider = Math.ceil(scores.length / 2);

  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row font-sans">
      <div className="w-full md:w-1/2">
        <div className="flex flex-col items-start space-y-12">
          {scores
            .slice(0, divider)
            .map(({serviceCategory, serviceCategoryName, rankings}) => {
              return (
                <div
                  key={`chartBlock-${serviceCategory}`}
                  className="flex flex-col space-y-4 w-full"
                >
                  <PillHeader className="flex items-center w-full">
                    {serviceIcon(serviceCategory)}
                    <div>{serviceCategoryName}</div>
                  </PillHeader>

                  <CompanyServiceChart ranking={rankings} category={category} />
                </div>
              );
            })}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="flex flex-col items-start space-y-12">
          {scores
            .slice(divider)
            .map(({serviceCategory, serviceCategoryName, rankings}) => {
              return (
                <div
                  key={`chartBlock-${serviceCategory}`}
                  className="flex flex-col space-y-4 w-full"
                >
                  <PillHeader className="flex items-center w-full">
                    {serviceIcon(serviceCategory)}
                    <div>{serviceCategoryName}</div>
                  </PillHeader>

                  <CompanyServiceChart ranking={rankings} category={category} />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompaniesByService;
