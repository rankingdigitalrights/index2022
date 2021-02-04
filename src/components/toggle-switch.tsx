import c from "clsx";
import React, {useState} from "react";

interface ToggleSwitchProps {
  label: string;
  onChange: (toggle: boolean) => void;
  className?: string;
}

const ToggleSwitch = ({label, onChange, className}: ToggleSwitchProps) => {
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
      <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
        <label
          htmlFor="toggle"
          className={c(
            "overflow-hidden h-5 rounded-full border-2 border-prissian cursor-pointer flex items-center",
            toggle ? "bg-prissian" : "bg-beige",
          )}
        >
          <input
            type="checkbox"
            name="toggle"
            defaultChecked={toggle}
            className={c(
              "toggle-checkbox absolute block w-3 h-3 rounded-full appearance-none cursor-pointer",
              toggle ? "bg-beige" : "bg-prissian",
            )}
            onChange={handleToggle}
          />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
