import React from "react";

import {Glossary} from "./types";

export type ModalEntry = {
  title: string;
  hasHtmlTitle?: boolean;
  content?: React.ReactNode;
};

type ModalCtx = {
  // entry?: ModalEntry;
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
