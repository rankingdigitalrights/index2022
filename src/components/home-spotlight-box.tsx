import c from "clsx";
import React from "react";

interface HomeSpotlightBoxProps {
  title: string;
  text: string;
  className?: string;
}

const HomeSpotlightBox = ({title, text, className}: HomeSpotlightBoxProps) => {
  return (
    <div
      className={c("flex flex-col items-center justify-center p-3", className)}
    >
      <span className="relative font-circular text-center text-white font-bold text-lg leading-5">
        {title}
      </span>
      <span className="relative font-circular text-center text-white leading-none mt-3">
        {text}
      </span>
    </div>
  );
};

export default HomeSpotlightBox;
