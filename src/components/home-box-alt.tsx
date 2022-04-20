import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import ArrowRight from "../images/icons/arrow-right.svg";

interface HomeBoxAltProps {
  title: string;
  linkTitle: string;
  href: string;
  theme?: "light" | "dark";
  className?: string;
}

const HomeBoxAlt = ({
  title,
  linkTitle,
  href,
  theme = "light",
  children,
  className,
}: React.PropsWithChildren<HomeBoxAltProps>) => {
  const [isHover, setIsHover] = useState(false);

  const textColor = theme === "light" ? "text-white" : "text-prissian";

  const animationClassName = {
    "transition duration-200 ease-out transform translate-x-1": isHover,
    "transition duration-200 ease-out transform translate-x-0": !isHover,
  };

  return (
    <div className={c("relative leading-none", textColor, className)}>
      <div className="flex flex-col h-full justify-between space-y-8">
        <Link passHref href={href}>
          <a className="hover:no-underline flex space-x-2">
            <h3
              className={c(
                "cursor-pointer font-bold text-xl leading-9 mt-0 flex flex-col",
                textColor,
              )}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {title}
            </h3>
          </a>
        </Link>

        {children}
      </div>

      <Link passHref href={href}>
        <a
          className="flex items-center justify-between hover:no-underline"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span className="font-sans text-lg whitespace-pre">{linkTitle}</span>
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

export default HomeBoxAlt;
