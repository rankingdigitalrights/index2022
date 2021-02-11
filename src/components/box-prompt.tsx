import c from "clsx";
import Link from "next/link";
import React from "react";

import ReadMore from "../images/icons/read-more.svg";

interface BoxPromptProps {
  readmore: string;
  className?: string;
}

const BoxPrompt = ({readmore, className}: BoxPromptProps) => {
  const match = readmore.match(/(.*)(\/indicators\/.*)$/);
  const [text, href] = match ? [match[1], match[2]] : ["XXX", "YYY"];

  return (
    <div
      className={c(
        "flex justify-end bg-accent-gold rounded-full px-6 py-4",
        className,
      )}
    >
      <Link passHref href={href}>
        <a className="flex items-center font-circular text-black text-right">
          {text}
          <ReadMore className="w-6 h-6 ml-6" />
        </a>
      </Link>
    </div>
  );
};

export default BoxPrompt;
