import React, {useEffect, useMemo, useRef} from "react";
import scrollama from "scrollama";

import {setupSpotlight} from "../scrollama-generic";
import ScrollySteps from "./scrolly-steps";

const ScrollyFeature = ({
  id,
  story,
  children,
  stepEnter = () => {},
  stepExit = () => {},
}) => {
  const scrollyEl = useRef(undefined);
  const scroller = useMemo(() => scrollama(), []);

  useEffect(() => {
    const unmount = setupSpotlight(
      scrollyEl,
      scroller,
      `#${id} .step`,
      stepEnter,
      stepExit,
    );

    return () => {
      unmount();
    };
  }, [scroller, scrollyEl, id, stepEnter, stepExit]);

  return (
    <section
      id={id}
      ref={scrollyEl}
      className="scrolly bg-light-grey print:hidden"
    >
      <div id={`canvas-${id}`} className="scrolly-canvas">
        {children}
      </div>
      <ScrollySteps story={story} />
      <noscript>NoScript TEST</noscript>
    </section>
  );
};

export default ScrollyFeature;
