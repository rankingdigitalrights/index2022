import c from "clsx";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";

import companies from "../../data/companies.json";
import {useMobileSize} from "../hooks";
import Ads from "../images/icons/ads.svg";
import Cancel from "../images/icons/cancel.svg";
import ChinaCompanies from "../images/icons/china-companies.svg";
import DownloadTheData from "../images/icons/download-the-data.svg";
import ExecutiveSummary from "../images/icons/executive-summary.svg";
import ExploreTheData from "../images/icons/explore-the-data.svg";
import Hamburger from "../images/icons/hamburger.svg";
import KeyFindings from "../images/icons/key-findings.svg";
import Methodology from "../images/icons/methodology.svg";
import ScoresByIndicator from "../images/icons/scores-by-indicator.svg";
import ScoresOverTime from "../images/icons/scores-over-time.svg";
import Shareholders from "../images/icons/shareholders.svg";
import {CompanyKind} from "../types";
import {isMouseEvent} from "../utils";
import MenuBarColumn from "./menu-bar-column";
import Logo from "./rdr-logo";

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
    "absolute top-22 inset-x-0 w-full shadow-md bg-white z-40 text-sm",
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
        <a
          role="menuitem"
          className="flex items-start lg:items-center text-black font-normal"
        >
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

  return (
    <header ref={ref} className={c("font-sans", className)}>
      <div className="relative bg-beige shadow-md py-2 z-50">
        <div className="xl:container md:mx-auto flex justify-between items-center relative px-3 md:px-6">
          {isExpanded ? (
            <button
              tabIndex={0}
              className="float-left w-6 h-12 relative"
              onClick={handleClickHamburger}
              aria-expanded
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
              aria-haspopup="menu"
            >
              <span className="flex justify-around w-full">
                <Hamburger aria-label="Open the navigation menu" />
              </span>
            </button>
          )}

          <Link passHref href="/">
            <a className="flex lg:mx-auto items-center text-black no-underline hover:no-underline">
              <Logo
                className={c("flex-none", {
                  "w-6 h-6": isMobile,
                  "w-12 h-12": !isMobile,
                })}
              />
              <span
                className={c(
                  "flex-none font-bold text-prissian text-md ml-2 md:ml-4",
                  {
                    "whitespace-nowrap": isMobile,
                    "whitespace-pre": !isMobile,
                  },
                )}
              >
                {isMobile
                  ? "RDR Big Tech Scorecard"
                  : `The Ranking Digital Rights
Big Tech Scorecard`}
              </span>
            </a>
          </Link>
        </div>
      </div>

      <nav className={navClassName}>
        <div className="relative xl:container xl:mx-auto mt-6 px-3 lg:px-4 pb-6 h-full flex flex-col md:flex-row justify-between items-start overflow-y-auto">
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
              <ul
                role="menu"
                aria-label="The Report"
                className="menubar list-inside list-none ml-0"
              >
                <li role="none" className="pt-6 pb-6">
                  <IconLink
                    name="Executive Summary"
                    href="/executive-summary"
                    Icon={ExecutiveSummary}
                  />
                </li>
                <li role="none" className="border-b border-disabled pt-3 pb-6">
                  <IconLink
                    name="Key Findings"
                    href="/key-findings"
                    Icon={KeyFindings}
                  />
                </li>

                <li role="none" className="pt-6 pb-0">
                  <span className="font-bold">Featured essays:</span>
                </li>

                <li role="none" className="pt-6 pb-3">
                  <IconLink
                    name="We Must Govern Online Ads"
                    href="https://rankingdigitalrights.org/mini-report/we-must-govern-online-ads"
                    Icon={Ads}
                  />
                </li>
                <li role="none" className="py-3">
                  <IconLink
                    name="Empowering Big Tech Shareholders"
                    href="https://rankingdigitalrights.org/mini-report/its-time-to-bring-down-the-barriers-blocking-shareholders-on-human-rights/"
                    Icon={Shareholders}
                  />
                </li>
                <li role="none" className="border-b border-disabled pt-3 pb-6">
                  <IconLink
                    name="Why Won't Chinese Companies Talk to Us?"
                    href="/"
                    Icon={ChinaCompanies}
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
                ? setExpandedColumn("COMPANY SCORECARDS")
                : setExpandedColumn(undefined)
            }
            isExpanded={expandedColumn === "COMPANY SCORECARDS"}
          >
            <div className="flex justify-between pt-6">
              <ul
                role="menu"
                aria-label="Company Report Cards Digital Platforms"
                className="menubar w-1/2 list-inside list-none ml-0"
              >
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

              <ul
                role="menu"
                aria-label="Company Report Cards Telecommunications Companies"
                className="menubar w-1/2 list-inside list-none"
              >
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
                ? setExpandedColumn("OUR DATA + METHODS")
                : setExpandedColumn(undefined)
            }
            isExpanded={expandedColumn === "OUR DATA + METHODS"}
          >
            <div className="flex flex-col">
              <ul
                role="menu"
                aria-label="Our Data + Methods"
                className="menubar list-inside list-none ml-0"
              >
                <li className="pt-6 pb-3">
                  <IconLink
                    href="/explore"
                    Icon={ExploreTheData}
                    name="Data Explorer"
                  />
                </li>
                <li className="border-b border-disabled pt-3 pb-6">
                  <IconLink
                    href="/explore-indicators"
                    Icon={ScoresByIndicator}
                    name="RDR Indicators"
                  />
                </li>

                <li className="pt-6 pb-6">
                  <IconLink
                    href="/compare"
                    Icon={ScoresOverTime}
                    name="Year-over-year Trends"
                  />
                </li>

                <li className="border-b border-disabled pt-3 pb-6">
                  <IconLink
                    href="https://rankingdigitalrights.org/methods-and-standards"
                    Icon={Methodology}
                    name="RDR Index Methodology"
                  />
                </li>

                <li className="flex items-start border-b border-disabled py-6">
                  <DownloadTheData className="flex-none w-8 h-8" />
                  <div className="flex flex-col ml-3">
                    <span className="font-bold">Download the Data</span>
                    <div className="flex">
                      <Link passHref href="/2022RDRIndexFullDataSet.xlsx">
                        <a role="menuitem" className="text-black font-bold">
                          Excel
                        </a>
                      </Link>
                      <span>/</span>
                      <Link passHref href="/2022RDRIndexCSV.zip">
                        <a role="menuitem" className="text-black font-bold">
                          CSV
                        </a>
                      </Link>
                    </div>
                  </div>
                </li>

                <li className="flex flex-col border-b border-disabled py-3">
                  <span className="font-bold mb-3">Support our Work</span>
                  <a
                    href="https://www.classy.org/give/325264/#!/donation/checkout"
                    role="menuitem"
                    className="w-28 bg-accent-red font-bold text-white no-underline text-sm text-center rounded-md px-4 py-2 uppercase"
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
