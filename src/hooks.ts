import React, {useEffect, useRef, useState} from "react";

export const useChartResize = (): [React.RefObject<HTMLDivElement>, number] => {
  // eslint-disable-next-line unicorn/no-null
  const chartRef = useRef<HTMLDivElement>(null);

  // Set the default width of the indicator chart to 0 to avoid a visible
  // rerender when the page loads the first time. React needs to render the
  // chart once in order to figure out the width of the surrounding div
  // element. Better not to show any graph than a graph with the wrong width
  // before resizing it to the appropriate width.
  const [chartWidth, setChartWidth] = useState(0);

  useEffect(() => {
    const resize = (): void => {
      if (!chartRef?.current?.offsetWidth) return;
      const width = chartRef.current.offsetWidth;
      setChartWidth(width < 0 ? 0 : width);
    };

    window.addEventListener("resize", resize);

    resize();

    return (): void => {
      window.removeEventListener("resize", resize);
    };
  }, [chartRef]);

  return [chartRef, chartWidth];
};
