import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import ArrowRight from "../images/icons/arrow-right.svg";
import Logo from "./rdr-logo";

interface HomeTeaserBoxProps {
  href: string;
  theme?: "light" | "dark";
  className?: string;
}

const HomeTeaserBox = ({
  href,
  theme = "light",
  className,
}: HomeTeaserBoxProps) => {
  const [isHover, setIsHover] = useState(false);

  const textColor = theme === "light" ? "text-white" : "text-prissian";

  const animationClassName = {
    "transition duration-200 ease-out transform translate-x-1": isHover,
    "transition duration-200 ease-out transform translate-x-0": !isHover,
  };

  return (
    <div
      className={c(
        "relative px-6 py-4 sm:py-6 leading-none",
        textColor,
        className,
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <Link passHref href={href}>
          <a className="hover:no-underline flex space-x-2">
            <Logo className="flex-none w-12 h-12" theme={theme} />
            <h3
              className={c(
                "cursor-pointer font-bold text-xl leading-9 mt-0 flex flex-col",
                textColor,
              )}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <span className="whitespace-pre">2022 Big Tech</span>
              <span className="whitespace-pre">Scorecard</span>
            </h3>
          </a>
        </Link>

        <p>
          Each year, Ranking Digital Rights evaluates and ranks 14 of the
          world’s most powerful digital platforms on their policies and
          practices affecting people’s rights to freedom of expression and
          privacy.
        </p>
      </div>

      <Link passHref href={href}>
        <a
          className="flex items-center justify-between hover:no-underline"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span className="text-white whitespace-pre">Executive summary</span>
          <span className="cursor-pointer w-12 h-12 mr-6 rounded-full flex items-center justify-center bg-white">
            <ArrowRight
              className={c("w-6 h-6", animationClassName)}
              aria-label="Goto page arrow"
            />
          </span>
        </a>
      </Link>
    </div>
  );
};

export default HomeTeaserBox;
