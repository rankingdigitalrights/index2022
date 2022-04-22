import c from "clsx";
import React from "react";

interface PillHeaderProps {
  className?: string;
}

const PillHeader = ({
  children,
  className,
}: React.PropsWithChildren<PillHeaderProps>) => {
  return (
    <div
      className={c(
        "rounded-full bg-beige text-sm font-sans font-bold py-3 px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default PillHeader;
