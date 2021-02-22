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
        "relative pt-8 pb-6 px-6 md:p-6 lg:py-0 lg:pt-10 lg:pb-8 leading-none font-circular",
        textColor,
        className,
      )}
    >
      <div className="flex flex-col h-full w-4/5 justify-between">
        <Link href={href}>
          <h3
            className={c(
              "cursor-pointer font-platform font-bold text-xl mb-3 leading-9",
              hoverClassName,
            )}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {title}
          </h3>
        </Link>

        <div className="flex-grow h-full">{children}</div>
      </div>

      <Link href={href}>
        <span
          className="cursor-pointer absolute right-0 bottom-0 w-12 h-12 mb-6 mr-6 rounded-full flex items-center justify-center bg-white"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <ArrowRight className={c("w-6 h-6", animationClassName)} />
        </span>
      </Link>
    </div>
  );
};

export default HomeBox;
