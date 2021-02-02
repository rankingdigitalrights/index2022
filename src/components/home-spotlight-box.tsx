import c from "clsx";
import Link from "next/link";
import React from "react";

interface HomeSpotlightBoxProps {
  title: string;
  text: string;
  href: string;
  className?: string;
}

const HomeSpotlightBox = ({
  title,
  text,
  href,
  className,
}: HomeSpotlightBoxProps) => {
  return (
    <div
      className={c("flex flex-col items-center justify-center p-3", className)}
    >
      <Link passHref href={href}>
        <a className="flex flex-col items-center justify-center text-white no-underline hover:no-underline">
          <span className="relative font-circular text-center text-white font-bold text-lg leading-5">
            {title}
          </span>
          <span className="relative font-circular text-center text-white leading-none mt-3">
            {text}
          </span>
        </a>
      </Link>
    </div>
  );
};

export default HomeSpotlightBox;
