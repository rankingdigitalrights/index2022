import c from "clsx";
import React from "react";

interface NarrativeTitleProps {
  title: React.ReactNode;
  byLine?: string;
  Logo?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const NarrativeTitle = ({title, byLine, Logo}: NarrativeTitleProps) => {
  const hasLogo = Logo !== undefined;

  const titleClassName = {
    "md:ml-6": hasLogo,
  };

  return (
    <>
      <div className="mb-6 border-b border-prissian pt-12 pb-6">
        <h1 className="flex flex-col md:flex-row md:items-start font-platform bold text-xl leading-none">
          {Logo && <Logo className="flex-none h-8 w-8 mt-1" />}
          <span className={c("mt-3 md:mt-0", titleClassName)}>{title}</span>
        </h1>

        {byLine && (
          <span className="font-platform text-sm mb-6">By {byLine}</span>
        )}
      </div>
    </>
  );
};

export default NarrativeTitle;
