import React, {useContext} from "react";

import {ModalContext} from "../context";
import Footer from "./footer";
import HeaderBar from "./header-bar";
import HtmlHead from "./html-head";
import Modal from "./modal";
import ScrollArrow from "./scroll-arrow";

interface LayoutProps {
  hideScrollArrow?: boolean;
  children: React.ReactNode;
}

const Layout = ({hideScrollArrow, children}: LayoutProps) => {
  /* const modal = useModalCtx(); */
  const modal = useContext(ModalContext);

  return (
    <div>
      <HtmlHead />

      <HeaderBar />

      {modal?.title && (
        <Modal
          title={modal.title}
          hasHtmlTitle={modal.hasHtmlTitle}
          onCancel={modal.closeModal}
        >
          {modal.content}
        </Modal>
      )}

      {children}

      {!hideScrollArrow && <ScrollArrow />}

      <Footer />
    </div>
  );
};

export default Layout;
