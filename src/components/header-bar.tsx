import c from "clsx";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";

import companies from "../../data/companies.json";
import {useMobileSize} from "../hooks";
import Cancel from "../images/icons/cancel.svg";
import ChinaTechGiants from "../images/icons/china-tech-giants.svg";
import ContextBeforeCode from "../images/icons/context-before-code.svg";
import DownloadTheData from "../images/icons/download-the-data.svg";
import ExecutiveSummary from "../images/icons/executive-summary.svg";
import ExploreTheData from "../images/icons/explore-the-data.svg";
import Hamburger from "../images/icons/hamburger.svg";
import IntroEssay from "../images/icons/intro-essay.svg";
import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import MovingFast from "../images/icons/moving-fast.svg";
import PolicyRecommendations from "../images/icons/policy-recommendations.svg";
import ScoresByIndicator from "../images/icons/scores-by-indicator.svg";
import ScoresOverTime from "../images/icons/scores-over-time.svg";
import Logo from "../images/logo.svg";
import {CompanyKind} from "../types";
import {isMouseEvent} from "../utils";
import MenuBarColumn from "./menu-bar-column";

interface HeaderBarProps {
  className?: string;
}

interface CompanyLinkProps {
  href: string;
  name: string;
  kind: CompanyKind;
}

interface IconLinkProps {
  href: string;
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface SpotlightLinkProps {
  href: string;
  name: string;
  desc: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const HeaderBar = ({className}: HeaderBarProps) => {
  const router = useRouter();
  const isMobile = useMobileSize(768);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedColumn, setExpandedColumn] = useState<string | undefined>();
  // eslint-disable-next-line unicorn/no-null
  const ref = useRef<HTMLDivElement>(null);

  const handleClickHamburger = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickOutside = (ev: Event) => {
    if (isMouseEvent(ev) && !ref.current?.contains(ev.target as Node)) {
      setIsExpanded(false);
    }
  };

  // Ensure the menu collapses if we route to a page.
  useEffect(() => {
    const handleRouteChange = () => {
      setIsExpanded(false);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // Collapse the menu when we click outside the menu.
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

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

  const CompanyLink = ({href, name, kind}: CompanyLinkProps) => {
    const dotClassName = {
      "bg-accent-orange": kind === "telecom",
      "bg-diff-del": kind === "internet",
    };

    return (
      <Link passHref href={href} as={href}>
        <a className="flex items-start lg:items-center text-black font-normal">
          <span
            className={c(
              "flex-none rounded-full w-2.5 h-2.5 mt-1 lg:mt-0",
              dotClassName,
            )}
          />
          <span className="ml-2">{name}</span>
        </a>
      </Link>
    );
  };

  const IconLink = ({href, name, Icon}: IconLinkProps) => {
    return (
      <Link passHref href={href}>
        <a
          role="menuitem"
          className="flex items-center font-bold text-black no-underline"
        >
          <Icon className="flex-none w-8 h-8" />
          <span className="ml-3">{name}</span>
        </a>
      </Link>
    );
  };

  const SpotlightLink = ({href, name, desc, Icon}: SpotlightLinkProps) => {
    return (
      <Link passHref href={href}>
        <a
          role="menuitem"
          className="flex items-start font-bold text-black no-underline"
        >
          <Icon className="flex-none w-8 h-8" />
          <div className="ml-3">
            <span className="font-bold">{name}:</span>{" "}
            <span className="font-normal">{desc}</span>
          </div>
        </a>
      </Link>
    );
  };

  return (
    <header ref={ref} className={c(className)}>
      <div className="relative bg-beige shadow-md py-2 z-50">
        <div className="lg:container lg:mx-auto flex justify-between items-center relative px-6">
          <Link passHref href="/">
            <a className="flex items-center text-black no-underline hover:no-underline">
              <Logo
                aria-label="Ranking Digital Rights Logo"
                className="flex-none"
              />
              <span className="flex-none font-platform font-bold text-lg ml-4 whitespace-nowrap">
                {isMobile
                  ? "2020 RDR Index"
                  : "2020 Ranking Digital Rights Corporate Accountability Index"}
              </span>
            </a>
          </Link>

          {isExpanded ? (
            <button
              tabIndex={0}
              className="float-right w-6 h-12 relative"
              onClick={handleClickHamburger}
            >
              <span className="flex justify-around w-full">
                <Cancel
                  className="w-4 h-4 text-black fill-current"
                  aria-label="Close menu"
                />
              </span>
            </button>
          ) : (
            <button
              tabIndex={0}
              className="float-right w-6 h-12 relative"
              onClick={handleClickHamburger}
            >
              <span className="flex justify-around w-full">
                <Hamburger aria-label="Open the navigation menu" />
              </span>
            </button>
          )}
        </div>
      </div>

      <nav className={navClassName}>
        <div className="relative xl:container xl:mx-auto mt-6 px-3 lg:px-4 pb-6 h-full flex flex-col md:flex-row justify-between items-start overflow-y-scroll">
          <MenuBarColumn
            className="w-full md:w-1/3 px-1 lg:px-4"
            title="THE REPORT"
            isExpandable={isMobile}
            onExpand={(toggle: boolean) =>
              toggle
                ? setExpandedColumn("THE REPORT")
                : setExpandedColumn(undefined)
            }
            isExpanded={expandedColumn === "THE REPORT"}
          >
            <div className="flex flex-col">
              <ul role="menubar" className="menubar list-inside list-none ml-0">
                <li role="none" className="border-b border-disabled pt-6 pb-6">
                  <IconLink
                    name="Executive summary"
                    href="/executive-summary"
                    Icon={ExecutiveSummary}
                  />
                </li>
                <li role="none" className="pt-6 pb-3">
                  <IconLink
                    name="Introduction"
                    href="/intro-essay"
                    Icon={IntroEssay}
                  />
                </li>
                <li role="none" className="py-3">
                  <IconLink
                    name="Key findings"
                    href="/key-findings"
                    Icon={KeyFindings}
                  />
                </li>
                <li role="none" className="border-b border-disabled pt-3 pb-6">
                  <IconLink
                    name="Policy recommendations"
                    href="/recommendations"
                    Icon={PolicyRecommendations}
                  />
                </li>

                <li role="none" className="pt-6 pb-0">
                  <span className="font-bold">Featured essays:</span>
                </li>
                <li role="none" className="py-3">
                  <SpotlightLink
                    name="Context before code"
                    desc="Protecting human rights in a state of emergency"
                    href="/spotlights/context-before-code"
                    Icon={ContextBeforeCode}
                  />
                </li>
                <li role="none" className="py-3">
                  <SpotlightLink
                    name="Moving fast and breaking us all"
                    desc="Big Tech’s unaccountable algorithms"
                    href="/spotlights/unaccountable-algorithms"
                    Icon={MovingFast}
                  />
                </li>
                <li role="none" className="pt-3">
                  <SpotlightLink
                    name="China’s tech giants can change"
                    desc="But the state is still their number one stakeholder"
                    href="/spotlights/china-tech-giants"
                    Icon={ChinaTechGiants}
                  />
                </li>
              </ul>
            </div>
          </MenuBarColumn>

          <MenuBarColumn
            className="w-full md:w-1/3 px-1 lg:px-4"
            title="Company Report Cards"
            isExpandable={isMobile}
            onExpand={(toggle: boolean) =>
              toggle
                ? setExpandedColumn("Company Report Cards")
                : setExpandedColumn(undefined)
            }
            isExpanded={expandedColumn === "Company Report Cards"}
          >
            <div className="flex justify-between pt-6">
              <ul className="menubar w-1/2 list-inside list-none ml-0">
                {internetCompanies.map(({id, name, kind}, idx) => {
                  const companyClassName = {
                    "pb-1": idx === 0,
                    "py-1": idx !== 0,
                  };
                  return (
                    <li
                      key={`nav-company-${id}`}
                      className={c(companyClassName)}
                    >
                      <CompanyLink
                        href={`/companies/${id}`}
                        name={name}
                        kind={kind as CompanyKind}
                      />
                    </li>
                  );
                })}
              </ul>

              <ul className="menubar w-1/2 list-inside list-none">
                {telecomCompanies.map(({id, name, kind}, idx) => {
                  const companyClassName = {
                    "pb-1": idx === 0,
                    "py-1": idx !== 0,
                  };

                  return (
                    <li
                      key={`nav-company-${id}`}
                      className={c(companyClassName)}
                    >
                      <CompanyLink
                        href={`/companies/${id}`}
                        name={name}
                        kind={kind as CompanyKind}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </MenuBarColumn>

          <MenuBarColumn
            className="w-full md:w-1/3 px-1 md:px-4"
            title="Our Data + Methods"
            isExpandable={isMobile}
            onExpand={(toggle: boolean) =>
              toggle
                ? setExpandedColumn("Our Data + Methods")
                : setExpandedColumn(undefined)
            }
            isExpanded={expandedColumn === "Our Data + Methods"}
          >
            <div className="flex flex-col">
              <ul className="menubar list-inside list-none ml-0">
                <li role="none" className="pt-6 pb-0">
                  <span className="font-bold">Explore the data:</span>
                </li>
                <li className="py-3">
                  <IconLink
                    href="/explore-services"
                    Icon={ExploreTheData}
                    name="Platforms & services"
                  />
                </li>

                <li className="py-3">
                  <IconLink
                    href="/explore-indicators"
                    Icon={ScoresByIndicator}
                    name="Issue areas & indicators"
                  />
                </li>
                <li className="border-b border-disabled pt-3 pb-6">
                  <IconLink
                    href="/compare"
                    Icon={ScoresOverTime}
                    name="Year-over-year trends"
                  />
                </li>

                <li className="border-b border-disabled py-6">
                  <IconLink
                    href="/methodology"
                    Icon={Methodology}
                    name="RDR Index methodology"
                  />
                </li>

                <li className="flex items-start border-b border-disabled py-6">
                  <DownloadTheData className="flex-none w-8 h-8" />
                  <div className="flex flex-col ml-3">
                    <span className="font-bold">Download the data</span>
                    <div className="flex">
                      <Link passHref href="/2020RDRIndexFullDataSet.xlsx">
                        <a className="text-black font-bold">Excel</a>
                      </Link>
                      <span>/</span>
                      <Link passHref href="/2020RDRIndexFullDataSet.csv.zip">
                        <a className="text-black font-bold">CSV</a>
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="flex flex-col border-b border-disabled py-3">
                  <span className="font-bold mb-3">Support our work</span>
                  <a
                    href="https://www.classy.org/give/325264/#!/donation/checkout"
                    role="menuitem"
                    className="w-28 bg-accent-red font-circular font-bold text-white no-underline text-sm text-center rounded-md px-4 py-2 uppercase"
                  >
                    Donate
                  </a>
                </li>

                <li className="flex items-start pt-3">
                  <Link passHref href="/acknowledgements">
                    <a
                      role="menuitem"
                      className="flex items-start font-bold text-black no-underline"
                    >
                      Acknowledgments
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </MenuBarColumn>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
