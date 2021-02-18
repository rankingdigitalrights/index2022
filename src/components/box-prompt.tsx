import c from "clsx";
import React, {useState} from "react";

import ReadMore from "../images/icons/read-more.svg";
import Link from "./link";

interface BoxPromptProps {
  readmore: string;
  className?: string;
}

const BoxPrompt = ({readmore, className}: BoxPromptProps) => {
  const [isHover, setIsHover] = useState(false);

  const animationClassName = {
    "transition duration-200 ease-in-out transform translate-x-2": isHover,
    "transition duration-200 ease-in-out transform translate-x-0": !isHover,
  };

  const match = readmore.match(/(.*)(\/indicators\/.*)$/);
  const [text, href] = match ? [match[1], match[2]] : ["XXX", "YYY"];

  return (
    <div
      className={c(
        "flex justify-end bg-accent-gold rounded-full pl-6 pr-3 py-3 lg:py-4",
        className,
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link
        className="flex items-center font-circular text-black font-normal text-right leading-none"
        href={href}
      >
        {text}
        <ReadMore className={c("w-6 h-6 ml-3 mr-3", animationClassName)} />
      </Link>
    </div>
  );
};

export default BoxPrompt;
