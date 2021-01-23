import c from "clsx";
import React, {useState} from "react";

import companies from "../../data/companies.json";
import Cancel from "../images/icons/cancel.svg";
import Download from "../images/icons/download.svg";
import ExploreTheData from "../images/icons/explore-the-data.svg";
import Hamburger from "../images/icons/hamburger.svg";
import IntroEssay from "../images/icons/intro-essay.svg";
import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import PolicyRecommendations from "../images/icons/policy-recommendations.svg";
import ScoresByIndicator from "../images/icons/scores-by-indicator.svg";
import ScoresOverTime from "../images/icons/scores-over-time.svg";
import Logo from "../images/logo.svg";
import {CompanyKind} from "../types";

interface HeaderBarProps {
  className?: string;
}

interface CompanyLinkProps {
  href: string;
  name: string;
  kind: CompanyKind;
}

const CompanyLink = ({href, name, kind}: CompanyLinkProps) => {
  const dotClassName = {
    "bg-accent-orange": kind === "telecom",
    "bg-diff-del": kind === "internet",
  };

  return (
    <a className="flex items-center text-black whitespace-nowrap" href={href}>
      <div
        className={c("rounded-full border border-white w-3 h-3", dotClassName)}
      />
      <span className="ml-2">{name}</span>
    </a>
  );
};

const HeaderBar = ({className}: HeaderBarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClickHamburger = () => {
    setIsExpanded(!isExpanded);
  };

  const basePath = process.env.BASE_PATH;

  const telecomCompanies = companies.filter(
    (company) => company.kind === "telecom",
  );
  const internetCompanies = companies.filter(
    (company) => company.kind === "internet",
  );

  const navClassName = c(
    "absolute top-22 inset-x-0 w-full shadow-md bg-white z-40 font-circular text-sm",
    {
      hidden: !isExpanded,
    },
  );

  return (
    <header className={c(className)}>
      <div className="relative bg-beige shadow-md py-4 z-50">
        <div className="container mx-auto flex justify-between items-center relative px-6">
          <a
            href={`${basePath}`}
            className="flex items-center text-black hover:no-underline"
          >
            <Logo className="flex-none" />
            <span className="flex-none font-platform font-bold text-lg ml-4 whitespace-nowrap">
              Ranking Digital Rights
            </span>
          </a>

          <button
            className="float-right h-12 relative"
            onClick={handleClickHamburger}
          >
            <Hamburger />
          </button>
        </div>
      </div>

      <nav className={navClassName}>
        <div className="relative container mx-auto mt-6 px-32 pb-6 h-full flex justify-between items-start">
          <div className="flex flex-col w-1/3 px-8">
            <div className="uppercase font-bold border-b-2 border-disabled-dark w-full pb-1">
              Stories + Insights
            </div>

            <div className="flex flex-col divide-y divide-disabled">
              <div className="flex flex-col py-3">
                <ul className="list-inside list-none">
                  <li>
                    <a
                      className="flex items-center font-bold text-black"
                      href={`${basePath}/intro`}
                    >
                      <IntroEssay className="mr-3" />
                      Intro essay
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex items-center font-bold text-black"
                      href={`${basePath}/key-findings`}
                    >
                      <KeyFindings className="mr-3" />
                      Key Findings: Flying Blind
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col pl-4 pr-3">
                <span className="font-bold pt-6 pb-3">Spotlights:</span>

                <ul className="list-inside list-none ml-0">
                  <li>
                    <a
                      className="text-black"
                      href={`${basePath}/spotlights/spotlight-one`}
                    >
                      Context before code: How companies should protect human
                      rights in crisis essay
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black"
                      href={`${basePath}/spotlights/spotlight-two`}
                    >
                      Unaccountable Algorithms
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-black"
                      href={`${basePath}/spotlights/spotlight-three`}
                    >
                      Digital rights in China
                    </a>
                  </li>
                </ul>
              </div>

              <a
                className="flex items-center font-bold text-black pl-4 pr-3 py-6"
                href={`${basePath}/policy-recommendations`}
              >
                <PolicyRecommendations className="mr-3" />
                Policy Recommendations
              </a>

              <a
                className="font-bold text-black pr-3 py-3"
                href={`${basePath}/about-us`}
              >
                About Us
              </a>
            </div>
          </div>

          <div className="w-1/3 px-8">
            <div className="uppercase font-bold border-b-2 border-disabled-dark w-full pb-1">
              Companies
            </div>

            <div className="flex justify-between">
              <ul className="w-1/2 list-inside list-none">
                {internetCompanies.map(({id, name, kind}) => (
                  <li key={`nav-company-${id}`} className="py-1">
                    <CompanyLink
                      href={`${basePath}/companies/${id}`}
                      name={name}
                      kind={kind as CompanyKind}
                    />
                  </li>
                ))}
              </ul>

              <ul className="w-1/2 list-inside list-none">
                {telecomCompanies.map(({id, name, kind}) => (
                  <li key={`nav-company-${id}`} className="py-1">
                    <CompanyLink
                      href={`${basePath}/companies/${id}`}
                      name={name}
                      kind={kind as CompanyKind}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-1/3 px-8">
            <div className="uppercase font-bold border-b-2 border-disabled-dark w-full pb-1">
              Data + Methods
            </div>

            <div className="flex flex-col divide-y divide-disabled">
              <div className="flex flex-col py-3">
                <ul className="list-inside list-none">
                  <li className="py-6">
                    <a
                      className="flex items-center font-bold text-black"
                      href={`${basePath}/indicators/G1`}
                    >
                      <ScoresByIndicator className="mr-3" />
                      Scores by indicator
                    </a>
                  </li>
                  <li className="py-6">
                    <a
                      className="flex items-center font-bold text-black"
                      href={`${basePath}/key-findings`}
                    >
                      <ExploreTheData className="mr-3" />
                      Explore the data
                    </a>
                  </li>
                  <li className="py-6">
                    <a
                      className="flex items-center font-bold text-black"
                      href="/methodology-development"
                    >
                      <Methodology className="mr-3" />
                      Methodology
                    </a>
                  </li>
                </ul>
              </div>

              <a
                className="flex items-center font-bold text-black pl-4 pr-3 py-6"
                href={`${basePath}/policy-recommendations`}
              >
                <ScoresOverTime className="mr-3" />
                RDR scores over time
              </a>

              <div className="flex justify-around py-6">
                <button
                  className="flex border rounded-md px-4 py-3 bg-rdr text-white font-circular text-sm text-center"
                  onClick={() => {}}
                >
                  <Download className="mr-2" />
                  Download raw data
                </button>
              </div>
            </div>
          </div>

          <div className="absolute right-12 top-1 cursor-pointer">
            <Cancel onClick={handleClickHamburger} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
