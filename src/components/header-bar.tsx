import c from "clsx";
import Link from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useRef, useState} from "react";

import companies from "../../data/companies.json";
import {useMobileSize} from "../hooks";
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
  icon: React.ReactNode;
}

// Due to the behavior of the --strictFunctionTypes compiler flag added in
// TypeScript v2.6. A function of type (e: CustomEvent) => void is no longer
// considered to be a valid instance of EventListener, which takes an Event
// parameter, not a CustomEvent.
// So one way to fix it is to turn off --strictFunctionTypes. Another way is to
// pass in a function that takes an Event and then narrows to CustomEvent via a
// type guard:
const isMouseEvent = (event: Event): event is MouseEvent => {
  return "detail" in event;
};

const HeaderBar = ({className}: HeaderBarProps) => {
  const router = useRouter();
  const isMobile = useMobileSize(768);
  const [isExpanded, setIsExpanded] = useState(false);
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
        <a className="flex items-center text-black whitespace-nowrap">
          <span
            className={c(
              "rounded-full border border-white w-3 h-3",
              dotClassName,
            )}
          />
          <span className="ml-2">{name}</span>
        </a>
      </Link>
    );
  };

  const IconLink = ({href, name, icon}: IconLinkProps) => {
    return (
      <Link passHref href={href}>
        <a
          role="menuitem"
          className="flex items-center font-bold text-black pointer-cursor"
        >
          {icon}
          <span className="ml-3">{name}</span>
        </a>
      </Link>
    );
  };

  return (
    <header ref={ref} className={c(className)}>
      <div className="relative bg-beige shadow-md py-4 z-50">
        <div className="lg:container lg:mx-auto flex justify-between items-center relative px-6">
          <Link passHref href="/">
            <a className="flex items-center text-black hover:no-underline">
              <Logo
                aria-label="Ranking Digital Rights Logo"
                className="flex-none"
              />
              <span className="flex-none font-platform font-bold text-lg ml-4 whitespace-nowrap">
                Ranking Digital Rights
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
        <div className="relative lg:container lg:mx-auto mt-6 px-3 lg:px-4 pb-6 h-full flex flex-col md:flex-row justify-between items-start  overflow-y-scroll">
          <MenuBarColumn
            className="w-full md:w-3/12 md:px-4"
            title="Stories + Insights"
            isExpandable={isMobile}
          >
            <div className="flex flex-col divide-y divide-disabled">
              <div className="flex flex-col py-3">
                <ul role="menubar" className="list-inside list-none">
                  <li role="none">
                    <IconLink
                      name="Intro essay"
                      href="/intro-essay"
                      icon={<IntroEssay className="flex-none w-6 h-6" />}
                    />
                  </li>
                  <li>
                    <IconLink
                      name="Key Findings: Flying Blind"
                      href="/key-findings"
                      icon={<KeyFindings className="flex-none w-6 h-6" />}
                    />
                  </li>
                </ul>
              </div>

              <div className="flex flex-col pl-4 pr-3">
                <span className="font-bold pt-6 pb-3">Spotlights:</span>

                <ul role="menubar" className="list-inside list-none ml-0">
                  <li>
                    <Link passHref href="/spotlights/spotlight-one">
                      <a className="text-black">
                        Context over code: Protecting human rights in times of
                        crisis
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link passHref href="/spotlights/spotlight-two">
                      <a className="text-black">
                        Unaccountable Algorithms: Will company policies ever see
                        the light of day?
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link passHref href="/spotlights/china-tech-giants">
                      <a className="text-black">
                        China’s tech giants have proven they can change: But the
                        state is still their number one stakeholder.
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pl-4 pr-3 py-6">
                <IconLink
                  href="/policy-recommendations"
                  icon={<PolicyRecommendations className="flex-none w-6 h-6" />}
                  name="Policy Recommendations"
                />
              </div>

              <div className="font-bold pr-3 py-3">
                <Link passHref href="/about-us">
                  <a className="text-black">About us</a>
                </Link>
              </div>
            </div>
          </MenuBarColumn>

          <MenuBarColumn
            className="w-full md:w-6/12 md:px-4 lg:px-12"
            title="Companies"
            isExpandable={isMobile}
          >
            <div className="flex justify-between">
              <ul className="w-1/2 list-inside list-none">
                {internetCompanies.map(({id, name, kind}) => (
                  <li key={`nav-company-${id}`} className="py-1">
                    <CompanyLink
                      href={`/companies/${id}`}
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
                      href={`/companies/${id}`}
                      name={name}
                      kind={kind as CompanyKind}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </MenuBarColumn>

          <MenuBarColumn
            className="w-full md:w-3/12 md:px-4"
            title="Data + Methods"
            isExpandable={isMobile}
          >
            <div className="flex flex-col divide-y divide-disabled">
              <div className="flex flex-col py-3">
                <ul className="list-inside list-none">
                  <li className="py-6">
                    <IconLink
                      href="/indicators/G1"
                      icon={<ScoresByIndicator className="flex-none w-6 h-6" />}
                      name="Scores by indicator"
                    />
                  </li>
                  <li className="py-6">
                    <IconLink
                      href="/"
                      icon={<ExploreTheData className="flex-none w-6 h-6" />}
                      name="Explore the data"
                    />
                  </li>
                  <li className="py-6">
                    <IconLink
                      href="/methodology"
                      icon={<Methodology className="flex-none w-6 h-6" />}
                      name="Methodology"
                    />
                  </li>
                </ul>
              </div>

              <div className="flex flex-col py-3">
                <ul className="list-inside list-none">
                  <li className="py-3">
                    <IconLink
                      href="/"
                      icon={<ScoresOverTime className="flex-none w-6 h-6" />}
                      name="RDR scores over time"
                    />
                  </li>
                </ul>
              </div>

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
          </MenuBarColumn>
        </div>
      </nav>
    </header>
  );
};

export default HeaderBar;
