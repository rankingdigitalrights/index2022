import c from "clsx";
import Link from "next/link";
import React, {useState} from "react";

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
  const [isHover, setIsHover] = useState(false);

  const hoverClassName = {
    underline: isHover,
    "no-underline": !isHover,
  };

  return (
    <div
      className={c("flex flex-col items-center justify-center p-3", className)}
    >
      <Link passHref href={href}>
        <a
          className="flex flex-col items-center justify-center text-white no-underline hover:no-underline"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <span className="relative font-circular font-normal text-white mb-3">
            Featured essay
          </span>
          <span
            className={c(
              "relative font-circular text-center text-white font-bold text-lg leading-5",
              hoverClassName,
            )}
          >
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
