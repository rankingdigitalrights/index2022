import Link from "next/link";
import React from "react";

import PillHeader from "./pill-header";
import ServiceCompanyChart from "./service-company-chart";

const ServicesByCompany = ({category, scores}) => {
  const divider = Math.ceil(scores.length / 2);

  return (
    <div className="flex flex-col space-y-5 md:space-y-0 md:space-x-8 md:flex-row font-sans">
      <div className="w-full md:w-1/2">
        <div className="space-y-12">
          {scores.slice(0, divider).map(({id, name, services}) => {
            return (
              <div
                key={`services-by-company-${name}`}
                className="flex flex-col space-y-5"
              >
                <PillHeader>
                  <Link passHref href={`/companies/${id}`}>
                    <a>{name}</a>
                  </Link>
                </PillHeader>

                <ServiceCompanyChart
                  ranking={services.map((service) => {
                    return {
                      service: service.name,
                      kind: service.kind,
                      score: service.categoryScore[category],
                    };
                  })}
                  category={category}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="space-y-12">
          {scores.slice(divider).map(({id, name, services}) => {
            return (
              <div
                key={`services-by-company-${name}`}
                className="flex flex-col space-y-5"
              >
                <PillHeader>
                  <Link passHref href={`/companies/${id}`}>
                    <a>{name}</a>
                  </Link>
                </PillHeader>

                <ServiceCompanyChart
                  ranking={services.map((service) => {
                    return {
                      service: service.name,
                      kind: service.kind,
                      score: service.categoryScore[category],
                    };
                  })}
                  category={category}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesByCompany;
