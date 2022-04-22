import c from "clsx";
import React from "react";

interface ToggleLeftRightProps {
  labelLeft: string;
  labelRight: string;
  onChange: (toggle: boolean) => void;
  toggle: boolean;
  className?: string;
}

const ToggleLeftRight = ({
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
    <div className={c("flex items-center self-end font-sans", className)}>
      <label htmlFor="toggle" className={c("text-sm mr-2", leftClassName)}>
        {labelLeft}
      </label>
      <button
        className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in"
        onClick={handleToggle}
        aria-label="Toggle switch"
      >
        <label
          htmlFor="toggle"
          className={c(
            "overflow-hidden h-5 rounded-full border-2 border-prissian cursor-pointer flex items-center",
            toggle ? "bg-prissian" : undefined,
          )}
        >
          <input
            type="checkbox"
            name="toggle"
            checked={toggle}
            className={c(
              "toggle-checkbox absolute block w-3 h-3 rounded-full appearance-none cursor-pointer",
              toggle ? "bg-beige" : "bg-prissian",
            )}
            onChange={handleToggle}
            aria-label="Toggle switch check mark"
          />
        </label>
      </button>
      <label htmlFor="toggle" className={c("text-sm ml-2", rightClassName)}>
        {labelRight}
      </label>
    </div>
  );
};

export default ToggleLeftRight;
