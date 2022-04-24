import c from "clsx";
import React from "react";

import LogoCreativeCommonsBy from "../images/icons/logo-creative-commons-by.svg";
import LogoCreativeCommons from "../images/icons/logo-creative-commons.svg";
import LogoLinkedin from "../images/icons/logo-linkedin.svg";
import LogoTwitter from "../images/icons/logo-twitter.svg";
import LogoLarge from "../images/logo_large.svg";

interface FooterProps {
  className?: string;
}

const Footer = ({className}: FooterProps) => {
  return (
    <footer
      className={c(
        "bg-prissian font-serif text-white text-lg pt-12 pb-20 overflow-x-hidden",
        className,
      )}
    >
      <div className="lg:container lg:mx-auto flex flex-col justify-center ">
        <div className="flex flex-col md:flex-row md:flex-row-reverse md:justify-between">
          <div className="md:w-1/2 py-3 ml-8 md:px-3 lg:py-6 lg:pl-6">
            <LogoLarge className="max-h-10 md:max-h-20 mb-16" />

            <dl>
              <dd className="font-semibold">Media requests:</dd>
              <dt className="mb-16">
                <a
                  className="text-base md:text-lg text-white font-normal"
                  href="mailto:comms@rankingdigitalrights.org"
                >
                  comms@rankingdigitalrights.org
                </a>
              </dt>

              <dd className="font-semibold">Other inquires:</dd>
              <dt>
                <a
                  className="text-base md:text-lg text-white font-normal"
                  href="mailto:info@rankingdigitalrights.org"
                >
                  info@rankingdigitalrights.org
                </a>
              </dt>
            </dl>
          </div>

          <div className="md:w-1/2 py-3 md:px-3 lg:py-6 lg:pl-6 mx-auto text-center md:text-left md:mx-none">
            <ul className="footer list-none mt-8">
              <li>
                <a
                  className="font-sans font-medium font-normal md:text-xl text-white no-underline"
                  href="https://rankingdigitalrights.org/who-we-are/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Who we are
                </a>
              </li>

              <li>
                <a
                  className="font-sans font-medium font-normal md:text-xl text-white no-underline"
                  href="https://rankingdigitalrights.org/news"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  News &amp; Events
                </a>
              </li>

              <li className="pb-2">
                <a
                  className="font-sans font-medium font-normal md:text-xl text-white no-underline"
                  href="https://rankingdigitalrights.org/opportunities"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Opportunities
                </a>
              </li>

              <li>
                <a
                  className="font-normal text-white no-underline"
                  href="https://rankingdigitalrights.org/privacypolicy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>

              <li>
                <a
                  className="font-normal text-white no-underline"
                  href="https://www.classy.org/give/325264/#!/donation/checkout"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support RDR
                </a>
              </li>

              <li className="pb-2">
                <a
                  className="font-normal text-white no-underline"
                  href="https://rankingdigitalrights.org/newsletter/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Subscribe
                </a>
              </li>

              <li className="pb-1 flex flex-row">
                <a
                  className="text-white no-underline flex items-center"
                  href="https://twitter.com/rankingrights"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LogoTwitter
                    className="w-6 h-6 fill-white"
                    aria-label="Twitter Logo"
                  />
                  <span className="ml-2 sr-only">Twitter</span>
                </a>

                <a
                  className="text-white no-underline flex items-center ml-8"
                  href="https://www.linkedin.com/company/ranking-digital-rights"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LogoLinkedin
                    className="w-6 h-6 fill-white"
                    aria-label="Linkedin Logo"
                  />
                  <span className="ml-2 sr-only">Linkedin</span>
                </a>

                <a
                  className="text-white no-underline ml-16"
                  href="https://creativecommons.org/licenses/by/4.0/legalcode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LogoCreativeCommons
                    className="w-6 h-6 fill-white"
                    aria-label="Linkedin Logo"
                  />
                </a>

                <a
                  className="text-white no-underline ml-2"
                  href="https://creativecommons.org/licenses/by/4.0/legalcode"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LogoCreativeCommonsBy
                    className="w-6 h-6 fill-white"
                    aria-label="Creative Commons By Logo"
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
