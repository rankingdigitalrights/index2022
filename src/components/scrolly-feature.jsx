import c from "clsx";
import React, {useEffect, useMemo, useRef} from "react";
import {useInView} from "react-intersection-observer";
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

  const [ioHook, inView] = useInView({
    threshold: [0.5],
    triggerOnce: true,
  });

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

  // equivalent to `scrolly-canvas ${inView ? "fade-in" : "fade-out"}`
  const className = c("scrolly-canvas", {
    "fade-in": inView,
    "fade-out": !inView,
  });

  return (
    <section id={id} ref={scrollyEl} className="scrolly">
      <div ref={ioHook} id={`canvas-${id}`} className={className}>
        {children}
      </div>
      <ScrollySteps story={story} />
    </section>
  );
};

export default ScrollyFeature;
