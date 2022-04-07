import c from "clsx";
import React, {useState} from "react";

import Down from "../images/icons/axis-down.svg";
import Up from "../images/icons/axis-up.svg";

interface FlipAxisProps {
  label: string;
  onChange: (toggle: boolean) => void;
  className?: string;
}

const FlipAxis = ({label, onChange, className}: FlipAxisProps) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    const newToggle = !toggle;
    onChange(newToggle);
    setToggle(newToggle);
  };

  return (
    <div className={c("flex items-center self-end", className)}>
      <label htmlFor="toggle" className="font-circular text-sm mr-2">
        {label}
      </label>
      <button
        className="relative inline-block w-5 align-middle select-none transition duration-200 ease-in"
        onClick={handleToggle}
        aria-label="Flip-Axis"
      >
        {/* <label
          htmlFor="toggle"
          // className={c(
            // "overflow-hidden h-5 rounded-full border-2 border-prissian cursor-pointer flex items-center",
            toggle ? Up : Down,
          // )}
        > */}
        {/* </label> */}
        {toggle ? <Up /> : <Down />}
      </button>
    </div>
  );
};

export default FlipAxis;
