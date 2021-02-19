import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

import ReadMore from "../images/icons/read-more.svg";

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

  const match = readmore.match(/(\/.*)$/);
  const href = match ? match[1] : "#";

  return (
    <div
      className={c(
        "flex justify-end bg-boxprompt rounded-full pl-6 pr-3 py-3 lg:py-4",
        className,
      )}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Link passHref href={href}>
        <a className="flex items-center font-circular text-black font-normal text-right leading-none">
          How did we calculate these scores?
          <ReadMore className={c("w-6 h-6 ml-3 mr-3", animationClassName)} />
        </a>
      </Link>
    </div>
  );
};

export default BoxPrompt;
