import React from "react";
import {useInView} from "react-intersection-observer";

const toggleFade = (inView) => {
  return inView ? "fade-in" : "fade-out";
};

const FigureImg = ({img, id, extraClass = "", alt, caption}) => {
  const [ioHook, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  return (
    <figure
      id={id}
      ref={ioHook}
      className={`spot-figure ${toggleFade(inView)} ${extraClass}`}
    >
      <img src={img} alt={alt} />
      <figcaption
        dangerouslySetInnerHTML={{
          __html: caption,
        }}
      />
    </figure>
  );
};

export default FigureImg;
