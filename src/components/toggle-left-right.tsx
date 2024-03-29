import c from "clsx";
import React from "react";

import ToggleLabel from "./toggle-label";

interface ToggleLeftRightProps {
  id: string;
  labelLeft: string | ((c: string) => React.ReactNode);
  labelRight: string | ((c: string) => React.ReactNode);
  onChange: (toggle: boolean) => void;
  toggle: boolean;
  className?: string;
}

const ToggleLeftRight = ({
  id,
  labelLeft,
  labelRight,
  onChange,
  toggle,
  className,
}: ToggleLeftRightProps) => {
  const leftClassName = {
    "opacity-50": toggle,
  };

  const rightClassName = {
    "opacity-50": !toggle,
  };

  const handleToggle = () => {
    onChange(!toggle);
  };

  return (
    <div className={c("flex items-center font-sans", className)}>
      <ToggleLabel
        id={`${id}-left-label`}
        className={c(leftClassName)}
        label={labelLeft}
        position="left"
      />

      <button
        type="button"
        className={c(
          "relative inline-flex flex-shrink-0 w-7 cursor-pointer",
          "border-2 border-prissian rounded-full hover-colors",
          {
            "bg-prissian": toggle,
          },
        )}
        role="switch"
        onClick={handleToggle}
        aria-checked="false"
        aria-labelledby={`${id}-left-label ${id}-right-label`}
      >
        <span
          aria-hidden="true"
          className={c(
            "pointer-events-none inline-block m-[0.1rem] h-2 w-2 rounded-full shadow ring-0 hover-transform",
            {
              "translate-x-[0.9rem] bg-white": toggle,
              "translate-x-0 bg-prissian": !toggle,
            },
          )}
        />
      </button>

      <ToggleLabel
        id={`${id}-right-label`}
        className={c(rightClassName)}
        label={labelRight}
        position="right"
      />
    </div>
  );
};

export default ToggleLeftRight;
