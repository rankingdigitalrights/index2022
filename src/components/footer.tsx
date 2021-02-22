import c from "clsx";
import React from "react";

import LogoEmail from "../images/icons/logo-email.svg";
import LogoLinkedin from "../images/icons/logo-linkedin.svg";
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
      <div className="lg:container lg:mx-auto flex flex-col justify-center md:h-48">
        <div className="flex flex-col md:flex-row md:justify-between divide-y-2 md:divide-y-0 md:divide-x-2 divide-solid divide-white">
          <div className="md:w-1/3 py-3 md:px-3 lg:py-6 lg:pl-6">
            <ul className="footer list-none">
              <li className="pb-1">
                <a
                  className="text-white no-underline"
                  href="https://rankingdigitalrights.org/about/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  About RDR
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white no-underline"
                  href="https://rankingdigitalrights.org/methodology-development/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2020 RDR Index methodology
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white no-underline"
                  href="https://rankingdigitalrights.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ranking Digital Rights main site
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white no-underline"
                  href="https://rankingdigitalrights.org/index2020/"
                >
                  2020 RDR Corporate Accountability Index
                </a>
              </li>
            </ul>
          </div>

          <div className="md:w-1/3 py-3 md:px-3 lg:py-6 lg:pl-6">
            <ul className="footer list-none">
              <li className="pb-1">
                <a
                  className="text-white no-underline flex items-center"
                  href="https://twitter.com/rankingrights"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LogoTwitter className="flex-none w-3 h-3" />
                  <span className="ml-2">RankingRights</span>
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white no-underline flex items-center"
                  href="https://www.linkedin.com/company/ranking-digital-rights"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LogoLinkedin className="flex-none w-3 h-3" />
                  <span className="ml-2">Linkedin</span>
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white no-underline flex items-center mt-1"
                  href="mailto:comms@rankingdigitalrights.org"
                >
                  <LogoEmail className="flex-none place-self-start w-3 h-3" />
                  <span className="ml-2 leading-none">Media inquiries</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="md:w-1/3 py-3 md:px-3 lg:py-6 lg:pl-6">
            <ul className="footer list-none">
              <li className="pb-1">
                <a
                  className="text-white no-underline"
                  href="https://rankingdigitalrights.org/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>
              <li className="pb-1">
                <a
                  className="text-white no-underline"
                  href="https://rankingdigitalrights.org/who/partners/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Funders and partners
                </a>
              </li>
              <li className="pb-1">
                <a
                  href="http://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="license noopener noreferrer"
                >
                  <img
                    alt="Creative Commons License"
                    src="https://i.creativecommons.org/l/by/4.0/88x31.png"
                  />
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
