/* eslint react/no-danger: off */
import React, {useCallback, useEffect, useState} from "react";

interface IframeProps {
  title: string;
  src: string;
  initialHeight?: number;
}

const extractDatawrapperId = (src: string): string | void => {
  const re = /https:\/\/datawrapper.dwcdn.net\/(\w*)\//;
  const match = src.match(re);
  if (!match) return undefined;
  return match[1];
};

const Datawrapper = ({title, src, initialHeight = 720}: IframeProps) => {
  const id = extractDatawrapperId(src);

  const [height, setHeight] = useState(initialHeight);

  const onMessage = useCallback(
    ({data = {}}) => {
      if (typeof data === "string" || id === undefined) return;
      const newHeight = data["datawrapper-height"]?.[id];
      if (newHeight && newHeight !== height) setHeight(newHeight);
    },
    [id, height, setHeight],
  );

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [id, height, setHeight, onMessage]);

  // In case the format of the datawrapper src changes in the future.
  if (!id) {
    console.error(`Cannot extract datawrapper id from ${src}`);
    return <div />;
  }

  return (
    <iframe
      scrolling="no"
      frameBorder="0"
      width="100%"
      title={title}
      src={src}
      height={height}
    />
  );
};

export default Datawrapper;
