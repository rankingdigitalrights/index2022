import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import ArrowRight from "../images/icons/arrow-right.svg";

interface LearnMoreProps {
  href: string;
}

const LearnMore = ({href}: LearnMoreProps) => {
  const [isHover, setIsHover] = useState(false);

  const animationClassName = {
    "transition duration-200 ease-out transform translate-x-1": isHover,
    "transition duration-200 ease-out transform translate-x-0": !isHover,
  };

  return (
    <Link href={href}>
      <a
        className="flex items-center"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <span>Learn more: Explore our data by issue area and service.</span>{" "}
        <ArrowRight
          className={c(
            "flex-none place-self-start ml-3 md:ml-6 w-6 h-6",
            animationClassName,
          )}
          aria-label="Goto page arrow"
        />
      </a>
    </Link>
  );
};

export default LearnMore;
