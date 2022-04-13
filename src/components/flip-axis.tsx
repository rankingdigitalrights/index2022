import c from "clsx";
import React, {useState} from "react";

import Down from "../images/icons/axis-down.svg";
import Up from "../images/icons/axis-up.svg";

interface FlipAxisProps {
  label: string;
  onChange: (flip: boolean) => void;
  flip: boolean;
  className?: string;
}

const FlipAxis = ({label, onChange, flip, className}: FlipAxisProps) => {
  // const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    // const newToggle = !toggle;
    onChange(!flip);
    // setToggle(newToggle);
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
        {flip ? <Up /> : <Down />}
      </button>
    </div>
  );
};

export default FlipAxis;
