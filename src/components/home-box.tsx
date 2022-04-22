import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import ArrowRight from "../images/icons/arrow-right.svg";

interface HomeBoxProps {
  title: string;
  href: string;
  theme?: "light" | "dark";
  children?: React.ReactNode;
  className?: string;
}

const HomeBox = ({
  title,
  href,
  theme = "light",
  children,
  className,
}: HomeBoxProps) => {
  const [isHover, setIsHover] = useState(false);

  const textColor = theme === "light" ? "text-white" : "text-prissian";

  const hoverClassName = {
    underline: isHover,
    "no-underline": !isHover,
  };

  const animationClassName = {
    "transition duration-200 ease-out transform translate-x-1": isHover,
    "transition duration-200 ease-out transform translate-x-0": !isHover,
  };

  return (
    <div
      className={c(
        "relative py-4 sm:py-6 xl:py-1 leading-none",
        textColor,
        className,
      )}
    >
      <div className="flex flex-col h-full w-4/5 justify-between">
        <Link passHref href={href}>
          <a className="hover:no-underline">
            <h3
              className={c(
                "cursor-pointer font-bold text-xl leading-9 mt-0",
                hoverClassName,
                textColor,
              )}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              {title}
            </h3>
          </a>
        </Link>

        <div>{children}</div>
      </div>

      <Link passHref href={href}>
        <a
          className="cursor-pointer absolute right-0 bottom-0 w-12 h-12 mb-6 xl:mb-1 2xl:mb-6 mr-6 rounded-full flex items-center justify-center bg-white"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <ArrowRight
            className={c("w-6 h-6 fill-prissian", animationClassName)}
            aria-label="Goto page arrow"
          />
        </a>
      </Link>
    </div>
  );
};

export default HomeBox;
