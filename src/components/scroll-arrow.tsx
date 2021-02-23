import c from "clsx";
import React, {useEffect, useState} from "react";

import ScrollArrowIcon from "../images/icons/scroll-arrow.svg";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const className = {
    "opacity-100 transition-opacity delay-300 ease-in-out cursor-pointer": showScroll,
    "opacity-0 transition-opacity delay-300 ease-in-out": !showScroll,
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 500) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 500) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);

    return (): void => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const handleScrollToTop = () => {
    if (showScroll) window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <ScrollArrowIcon
      className={c(
        "fixed bottom-3 right-3 md:bottom-10 md:right-10 w-12 h-12 md:w-14 md:h-14 svg-shadow z-40",
        className,
      )}
      role="button"
      tabIndex={0}
      onClick={handleScrollToTop}
      onKeyDown={handleScrollToTop}
      aria-label="Scroll to Top Button"
    />
  );
};

export default ScrollArrow;
