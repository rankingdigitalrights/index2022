import c from "clsx";
import React, {useEffect, useState} from "react";

import ScrollArrowIcon from "../images/icons/scroll-arrow.svg";

const ScrollArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  const className = {
    flex: showScroll,
    hidden: !showScroll,
  };

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 600) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 600) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  return (
    <ScrollArrowIcon
      className={c(
        "fixed bottom-10 right-10 w-14 h-14 svg-shadow z-50 ml-auto",
        className,
      )}
      onClick={() => {
        window.scrollTo({top: 0, behavior: "smooth"});
      }}
    />
  );
};

export default ScrollArrow;
