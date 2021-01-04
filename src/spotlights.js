export const updateBGColor = (figure, color = "bg-gray-200") => {
  figure.classList.remove(
    ...["bg-cat-governance", "bg-cat-freedom", "bg-cat-privacy", "bg-gray-400"],
  );
  figure.classList.add(color);
};

const toggleActiveStep = (index, steps) => {
  // Make current step active and de-activate all others..
  steps.forEach((el, i) =>
    i === index ?
    el.classList.add("is-active") :
    el.classList.remove("is-active"),
  );
};

export const resetScene = (figure) => {
  updateBGColor(figure);
  figure.querySelector("p#scene-counter").innerText = "Off"
  figure.querySelector("p#index-counter").innerText = "Off"
};

export const handleStepEnter = (figure, steps) => ({
  index,
  element,
  direction
}) => {
  toggleActiveStep(index, steps);
  // eslint-disable-next-line no-param-reassign
  figure.querySelector("p#scene-counter").innerText = "On"
  figure.querySelector("p#index-counter").innerText = index
  updateBGColor(figure, element.dataset.color);
};

export const handleStepExit = (figure) => ({
  index,
  direction
}) => {
  if (
    (index === 0 && direction === "up") ||
    (index === figure.maxStep && direction === "down")
  ) {
    setTimeout(() => resetScene(figure), 300);
  }
};

// TODO: remove upon arrival of content
// export const handleResize = (scroller, figure, steps) => () => {
//   const stepHeight = Math.floor(window.innerHeight * 0.75);

//   steps.forEach((el) =>
//     Object.assign(el.style, {
//       height: `${stepHeight}px`,
//     }),
//   );

//   scroller.resize();
// };

export const setupSpotlight = (ref, scroller, stepSelector) => {
  const {
    current: scrolly
  } = ref;

  const figure = scrolly.querySelector("figure");
  const steps = scrolly.querySelectorAll(".step");
  figure.maxStep = steps.length - 1

  scroller
    .setup({
      step: stepSelector,
      offset: 0.8,
    })
    .onStepEnter(handleStepEnter(figure, steps))
    .onStepExit(handleStepExit(figure));

  // const resize = handleResize(scroller, figure, steps);

  // window.addEventListener("resize", resize);

  // resize();

  return () => {
    scroller.destroy();
    // window.removeEventListener("resize", resize);
  };
};
