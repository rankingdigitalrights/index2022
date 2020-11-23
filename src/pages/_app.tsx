import "../css/index.css";

import {AppProps} from "next/app";
import React, {useEffect, useState} from "react";

const MyApp = ({Component, pageProps}: AppProps) => {
  const [firstTabHandled, setFirstTabHandled] = useState(false);

  // enable form focus rings when tabbing
  useEffect(() => {
    if (firstTabHandled) return;

    const handleFirstTab = (ev: KeyboardEvent) => {
      // the "I am a keyboard user" key
      if (ev.key === "Tab") {
        document.body.classList.add("user-is-tabbing");
        window.removeEventListener("keydown", handleFirstTab);
      }
    };

    window.addEventListener("keydown", handleFirstTab);
    setFirstTabHandled(true);
  });

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
};

export default MyApp;
