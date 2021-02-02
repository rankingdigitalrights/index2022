import c from "clsx";
import Link from "next/link";
import React from "react";

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
  const textColor = theme === "light" ? "text-white" : "text-prissian";

  return (
    <div
      className={c(
        "relative h-full px-6 md:px-10 lg:px-12 py-10 md:py-16 lg:py-0 lg:pt-20 lg:pb-8 leading-none font-circular",
        textColor,
        className,
      )}
    >
      <div className="flex flex-col h-full w-4/5 justify-between">
        <Link href={href}>
          <h3 className="cursor-pointer font-platform font-bold text-lg xl:text-xl mb-3">
            {title}
          </h3>
        </Link>

        <div className="flex-grow h-full text-sm">{children}</div>
      </div>

      <Link href={href}>
        <span className="cursor-pointer absolute right-0 bottom-0 w-12 h-12 mb-6 mr-6 rounded-full flex items-center justify-center bg-white">
          <ArrowRight />
        </span>
      </Link>
    </div>
  );
};

export default HomeBox;
