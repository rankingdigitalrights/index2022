import c from "clsx";
import React, {useState} from "react";

interface ToggleSwitchProps {
  label: string;
  onChange: (toggle: boolean) => void;
}

const ToggleSwitch = ({label, onChange}: ToggleSwitchProps) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    const newToggle = !toggle;
    onChange(newToggle);
    setToggle(newToggle);
  };

  return (
    <>
      <label
        htmlFor="toggle"
        className="font-circular text-xxs text-prissian mr-3"
      >
        {label}
      </label>
      <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <label
          htmlFor="toggle"
          className={c(
            "toggle-label block overflow-hidden h-5 rounded-full border-2 border-prissian cursor-pointer flex items-center",
            toggle ? "toggle-checked" : undefined,
          )}
        >
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            defaultChecked={toggle}
            className="toggle-checkbox absolute block w-3 h-3 rounded-full bg-prissian appearance-none cursor-pointer"
            onChange={handleToggle}
          />
        </label>
      </div>
    </>
  );
};

export default ToggleSwitch;
