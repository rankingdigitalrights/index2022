/* eslint react/no-danger: off */
import React, {useEffect, useRef} from "react";

import Cancel from "../images/icons/cancel.svg";
import {isMouseEvent} from "../utils";

export type ModalEntry = {
  title: string;
  content?: React.ReactNode;
  hasHtmlTitle?: boolean;
};

interface ModalProps {
  title: string;
  hasHtmlTitle?: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
}

const Modal = ({
  title,
  hasHtmlTitle = false,
  onCancel,
  children,
}: ModalProps) => {
  // eslint-disable-next-line unicorn/no-null
  const ref = useRef<HTMLDivElement>(null);

  // Collapse the modal when we click outside the menu.
  useEffect(() => {
    const handleClickOutside = (ev: Event) => {
      if (isMouseEvent(ev) && !ref.current?.contains(ev.target as Node)) {
        onCancel();
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  // Collapse the modal when we press the escape key.
  useEffect(() => {
    const handleEscapeKey = (ev: KeyboardEvent) => {
      const key = ev.key || ev.keyCode;
      if (key === "Escape" || key === "Esc" || key === 27) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscapeKey, false);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey, false);
    };
  }, []);

  // Disable background scrolling.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex max-h-screen py-6 px-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-black opacity-25" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          ref={ref}
          className="inline-block align-bottom bg-white text-left overflow-y-scroll shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
                <div className="flex items-start justify-between">
                  <h3
                    className="font-circular font-bold text-prissian w-10/12"
                    id="modal-headline"
                  >
                    {hasHtmlTitle ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: title,
                        }}
                      />
                    ) : (
                      title
                    )}
                  </h3>

                  <button tabIndex={0} onClick={onCancel}>
                    <span className="flex justify-around w-full">
                      <Cancel
                        className="w-3 h-3 text-black fill-current"
                        aria-label="Close modal"
                      />
                    </span>
                  </button>
                </div>

                <div className="mt-2 mb-4">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
