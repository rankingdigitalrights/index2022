import c from "clsx";
import React from "react";

import LogoEmail from "../images/icons/logo-email.svg";
import LogoFacebook from "../images/icons/logo-facebook.svg";
import LogoRss from "../images/icons/logo-rss.svg";
import LogoTwitter from "../images/icons/logo-twitter.svg";

interface FooterProps {
  className?: string;
}

const Footer = ({className}: FooterProps) => {
  return (
    <footer
      className={c(
        "bg-black font-circular font-bold text-white text-sm",
        className,
      )}
    >
      <div className="md:container md:mx-auto flex flex-col justify-center md:h-48">
        <div className="flex flex-col md:flex-row md:justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-solid divide-white">
          <div className="md:w-1/3 py-6 px-6 md:px-6 md:py-3">
            <ul className="list-none">
              <li className="pb-1">
                <a
                  className="text-white"
                  href="https://rankingdigitalrights.org/about/"
                >
                  About
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white"
                  href="https://rankingdigitalrights.org/methodology-development/"
                >
                  2020 Methodology
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white"
                  href="https://rankingdigitalrights.org/publications/"
                >
                  Publications
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white"
                  href="https://rankingdigitalrights.org/index2020/"
                >
                  2020 Corporate Accountability Index
                </a>
              </li>
            </ul>
          </div>

          <div className="md:w-1/3 py-6 px-6 md:px-6 md:py-3 md:pl-6">
            <ul className="list-none">
              <li className="pb-1">
                <a
                  className="text-white"
                  href="https://rankingdigitalrights.org/privacypolicy"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white"
                  href="https://rankingdigitalrights.org/who/partners/"
                >
                  Funders and partners
                </a>
              </li>
              <li className="pb-1">
                <a
                  rel="license"
                  href="http://creativecommons.org/licenses/by/4.0/"
                >
                  <img
                    alt="Creative Commons License"
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png"
                  />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:w-1/3 py-6 px-6 md:px-6 md:py-3 md:pl-6">
            <ul className="list-none">
              <li className="pb-1">
                <a
                  className="text-white flex items-center"
                  href="https://facebook.com/rankingrights"
                >
                  <LogoFacebook className="w-3 h-3" />
                  <span className="ml-2">RankingRights</span>
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white flex items-center"
                  href="https://twitter.com/rankingrights"
                >
                  <LogoTwitter className="w-3 h-3" />
                  <span className="ml-2">RankingRights</span>
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white flex items-center"
                  href="https://rankingdigitalrights.org/feed/"
                >
                  <LogoRss className="w-3 h-3" />
                  <span className="ml-2">RSS</span>
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white flex items-center"
                  href="mailto:info@rankingdigitalrights.org"
                >
                  <LogoEmail className="w-3 h-3" />
                  <span className="ml-2">info@rankingdigitalrights.org</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
