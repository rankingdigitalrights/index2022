/* eslint no-param-reassign: off */
/* eslint no-unneeded-ternary: off */

const updateBGColor = (figure, color = "bg-light-grey") => {
  figure.classList.remove(
    ...[
      "bg-cat-governance",
      "bg-cat-freedom",
      "bg-cat-privacy",
      "bg-gray-200",
      "bg-light-grey",
      "bg-mint-green",
    ],
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

const resetScene = (figure) => {
  updateBGColor(figure);
};

const handleStepEnter = (figure, steps, {index, direction, element}) => {
  console.log(`Generic enter: ${index} - ${direction}`);
  console.log("payload", element);
  toggleActiveStep(index, steps);
  updateBGColor(figure, element.dataset.color);
};

const handleStepExit = (figure, {index, direction}) => {
  if (
    (index === 0 && direction === "up") ||
    (index === figure.maxStep && direction === "down")
  ) {
    setTimeout(() => resetScene(figure), 300);
  }
};

export const setupSpotlight = (
  ref,
  scroller,
  stepSelector,
  localOnStepEnter = () => {},
  localOnStepExit = () => {},
) => {
  const {current: scrolly} = ref;

  const figure = scrolly.querySelector("figure.scrolly-figure");
  const steps = scrolly.querySelectorAll(".step");
  figure.maxStep = steps.length - 1;

  scroller
    .setup({
      step: stepSelector,
      offset: 0.7,
      debug: false,
    })
    .onStepEnter((...args) => {
      handleStepEnter(figure, steps, ...args);
      localOnStepEnter(...args);
    })
    .onStepExit((...args) => {
      handleStepExit(figure, ...args);
      localOnStepExit(...args);
    });

  return () => {
    scroller.destroy();
  };
};

export const toggleSVGclass = ({
  objId,
  showLayers,
  hideLayers,
  direction = "down",
}) => {
  const directionUp = direction === "down" ? false : true;
  const Obj = document.querySelector(`#${objId} svg`);
  if (showLayers) {
    [...Obj.querySelectorAll(showLayers)].forEach((item) => {
      if (!directionUp) {
        item.classList.remove("fade-out");
        item.classList.add("fade-in");
      } else {
        item.classList.remove("fade-in");
        item.classList.add("fade-out");
      }
    });
  }
  if (hideLayers) {
    [...Obj.querySelectorAll(hideLayers)].forEach((item) => {
      if (!directionUp) {
        item.classList.remove("fade-in");
        item.classList.add("fade-out");
      } else {
        item.classList.remove("fade-out");
        item.classList.add("fade-in");
      }
    });
  }
};

export const resetSVGviewBox = (svgID) => {
  const mySVG = document.querySelector(svgID);
  const bbox = mySVG.getBBox();
  const newView = `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`;
  mySVG.setAttribute("viewBox", newView);
};

export const animateSVGviewBox = (svgID, newRegion, animName) => {
  const SVG = document.querySelector(svgID);
  if (!SVG.querySelector(`animate#${animName}`)) {
    const newBBox = newRegion
      ? SVG.querySelector(newRegion).getBBox()
      : SVG.getBBox();

    const newView = `${newBBox.x} ${newBBox.y} ${newBBox.width} ${newBBox.height}`;

    /* target syntax */
    // <animate attributeName="viewBox" values="0 0 600 400; 250 180 300 200" begin="indefinite" dur="1s" fill="freeze"/>

    const anim = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "animate",
    );
    anim.setAttribute("id", animName);
    anim.setAttribute("attributeName", "viewBox");
    anim.setAttribute("begin", "indefinite");
    // anim.setAttribute("values", `${oldView}; ${newView}`);
    anim.setAttribute("to", `${newView}`);
    anim.setAttribute("fill", "freeze");
    anim.setAttribute("dur", "1s");
    SVG.append(anim);
  }
  SVG.querySelector(`animate#${animName}`).beginElement();
};
