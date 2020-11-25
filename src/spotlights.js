export const resetColor = (figure, color = "bg-offset-gray") => {
  figure.classList.remove(
    ...["bg-cat-governance", "bg-cat-freedom", "bg-cat-privacy", "bg-gray-400"],
  );
  figure.classList.add(color);
};

const toggleActiveStep = (index, steps) => {
  // Make current step active and de-activate all others..
  steps.forEach((el, i) =>
    i === index
      ? el.classList.add("is-active")
      : el.classList.remove("is-active"),
  );
};

export const resetScene = (figure) => {
  resetColor(figure);
};

export const handleStepEnter = (figure, steps) => ({index, element}) => {
  toggleActiveStep(index, steps);
  resetColor(figure, element.dataset.color);
  // eslint-disable-next-line no-param-reassign
  figure.querySelector("p").textContent = element.dataset.step;
};

export const handleStepExit = (figure) => ({index, direction}) => {
  if (
    (index === 1 && direction === "up") ||
    (index === 4 && direction === "down")
  ) {
    setTimeout(() => resetScene(figure), 300);
  }
};

export const handleResize = (scroller, figure, steps) => () => {
  const stepHeight = Math.floor(window.innerHeight * 0.75);
  const figureHeight = window.innerHeight / 2;
  const figureMarginTop = (window.innerHeight - figureHeight) / 2;

  // I normally try to use CSS classes over directly manipulating styles. In
  // this case I find it okay though, since it relates to dynamic positioning.
  steps.forEach((el) => Object.assign(el.style, {height: `${stepHeight}px`}));
  Object.assign(figure.style, {
    height: `${figureHeight}px`,
    top: `${figureMarginTop}px`,
  });

  scroller.resize();
};

export const setupSpotlight = (ref, scroller, stepSelector) => {
  const {current: scrolly} = ref;

  const figure = scrolly.querySelector("figure");
  const steps = scrolly.querySelectorAll(".step");

  scroller
    .setup({step: stepSelector, offset: 0.66})
    .onStepEnter(handleStepEnter(figure, steps))
    .onStepExit(handleStepExit(figure));

  const resize = handleResize(scroller, figure, steps);

  window.addEventListener("resize", resize);

  resize();

  return () => {
    scroller.destroy();
    window.removeEventListener("resize", resize);
  };
};
