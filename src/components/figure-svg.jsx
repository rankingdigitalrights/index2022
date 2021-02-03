import React from "react";
import {useInView} from "react-intersection-observer";

const toggleFade = (inView) => {
  return inView ? "fade-in" : "fade-out";
};

const FigureSvg = ({id, alt, svg, caption}) => {
  const [ioHook, inView] = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  return (
    <figure
      id={id}
      aria-label={alt}
      ref={ioHook}
      className={`figure-svg spot-figure ${toggleFade(inView)}`}
      dangerouslySetInnerHTML={{
        __html: [`${svg}<figcaption>${caption}</figcaption>`],
      }}
    />
  );
};

export default FigureSvg;
