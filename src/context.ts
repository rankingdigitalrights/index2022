import React from "react";

import {Glossary, ModalEntry} from "./types";

type ModalCtx = {
  title?: string;
  content?: React.ReactNode;
  hasHtmlTitle?: boolean;
  toggleModal: (entry: ModalEntry) => void;
  closeModal: () => void;
};

export const ModalContext = React.createContext<ModalCtx>({
  title: undefined,
  content: undefined,
  hasHtmlTitle: undefined,
  toggleModal: () => {},
  closeModal: () => {},
});

export const GlossaryContext = React.createContext<Record<string, Glossary>>(
  {},
);
