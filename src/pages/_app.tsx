/* eslint react/jsx-props-no-spreading: off */
import "../css/index.css";

import {AppProps} from "next/app";
import React, {useEffect, useState} from "react";
import smoothscroll from "smoothscroll-polyfill";
import SwiperCore, {Pagination} from "swiper";

import glossary from "../../data/glossary.json";
import {GlossaryContext, ModalContext} from "../context";
import {initMatomo} from "../matomo";
import {ModalEntry} from "../types";

SwiperCore.use([Pagination]);

const ModalWrapper = ({children}: {children?: React.ReactNode}) => {
  const [title, setTitle] = useState<string | undefined>();
  const [content, setContent] = useState<React.ReactNode | undefined>();
  const [hasHtmlTitle, setHasHtmlTitle] = useState<boolean | undefined>();

  const toggleModal = (entry: ModalEntry) => {
    setTitle(entry.title);
    setContent(entry.content);
    setHasHtmlTitle(entry.hasHtmlTitle);
  };

  const closeModal = () => {
    setTitle(undefined);
    setContent(undefined);
    setHasHtmlTitle(undefined);
  };

  return (
    <ModalContext.Provider
      value={{title, content, hasHtmlTitle, toggleModal, closeModal}}
    >
      {children}
    </ModalContext.Provider>
  );
};

const GlossaryWrapper = ({children}: {children?: React.ReactNode}) => {
  const glossaryEntries = glossary.reduce(
    (memo, entry) => ({...memo, [entry.id]: entry}),
    {},
  );

  return (
    <GlossaryContext.Provider value={glossaryEntries}>
      {children}
    </GlossaryContext.Provider>
  );
};

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
  }, [firstTabHandled]);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // Initialize site tracking
  useEffect(() => {
    initMatomo({
      siteId: "3",
      piwikUrl: "https://piwik.opentechinstitute.org",
    });
  }, []);

  return (
    <GlossaryWrapper>
      <ModalWrapper>
        <Component {...pageProps} />
      </ModalWrapper>
    </GlossaryWrapper>
  );
};

export default MyApp;
