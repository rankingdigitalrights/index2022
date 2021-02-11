/* eslint no-param-reassign: off */
const updateBGColor = (figure, color = "bg-gray-200") => {
  figure.classList.remove(
    ...["bg-cat-governance", "bg-cat-freedom", "bg-cat-privacy", "bg-gray-400"],
  );
  figure.classList.add(color);
};

const toggleActiveStep = (index, steps) => {
  // Make current step active and de-activate all others..
  console.log(`Active step ${index}`);
  steps.forEach((el, i) =>
    i === index
      ? el.classList.add("is-active")
      : el.classList.remove("is-active"),
  );
};

const resetScene = (figure) => {
  updateBGColor(figure);
  figure.querySelector("p#scene-counter").textContent = "Off";
  figure.querySelector("p#index-counter").textContent = "Off";
};

const handleStepEnter = (figure, steps, {index, direction, element}) => {
  console.log(`Generic enter: ${index} - ${direction}`);
  console.log("payload", element);
  toggleActiveStep(index, steps);
  figure.querySelector("p#scene-counter").textContent = "On";
  figure.querySelector("p#index-counter").textContent = index;
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
  console.log(figure);
  const steps = scrolly.querySelectorAll(".step");
  figure.maxStep = steps.length - 1;

  scroller
    .setup({
      step: stepSelector,
      offset: 0.8,
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

export const toggleSVGclass = ({objId, query, toggleClassName}) => {
  console.log(toggleClassName); // TODO
  const Obj = document.querySelector(`#${objId} svg`);
  [...Obj.querySelectorAll(query)].forEach((item) => {
    item.classList.toggle("fade-out");
    item.classList.toggle("fade-in");
  });
};

export const resetSVGviewBox = function (svgID, oldRegion, newRegion) {
  const mySVG = document.querySelector(svgID);
  const initialbox = mySVG.getBBox();
  const shutdownbox = mySVG.querySelector(newRegion).getBBox();
  const oldView = `${initialbox.x} ${initialbox.y} ${initialbox.width} ${initialbox.height}`;
  const newView = `${shutdownbox.x} ${shutdownbox.y} ${shutdownbox.width} ${shutdownbox.height}`;

  /* target syntax */
  // <animate attributeName="viewBox" values="0 0 600 400; 250 180 300 200" begin="indefinite" dur="1s" fill="freeze"/>

  const anim = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate",
  );
  anim.setAttribute("id", "zoom-1");
  anim.setAttribute("attributeName", "viewBox");
  anim.setAttribute("begin", "indefinite");
  anim.setAttribute("values", `${oldView}; ${newView}`);
  anim.setAttribute("fill", "freeze");
  anim.setAttribute("dur", "1s");
  mySVG.append(anim);
  mySVG.querySelector("animate#zoom-1").beginElement();
};

export const animateSVGviewBox = function (
  SVG,
  oldRegion,
  newRegion,
  animName,
) {
  console.log("ZOOMINg");
  let oldBBox;
  if (oldRegion) {
    oldBBox = SVG.querySelector(oldRegion).getBBox();
  } else {
    oldBBox = SVG.getBBox();
  }

  const newBBox = SVG.querySelector(newRegion).getBBox();
  const oldView = `${oldBBox.x} ${oldBBox.y} ${oldBBox.width} ${oldBBox.height}`;
  const newView = `${newBBox.x * 0.9} ${newBBox.y * 0.9} ${
    newBBox.width * 1.2
  } ${newBBox.height * 1.1}`;

  /* target syntax */
  // <animate attributeName="viewBox" values="0 0 600 400; 250 180 300 200" begin="indefinite" dur="1s" fill="freeze"/>

  const anim = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "animate",
  );
  anim.setAttribute("id", animName);
  anim.setAttribute("attributeName", "viewBox");
  anim.setAttribute("begin", "indefinite");
  anim.setAttribute("values", `${oldView}; ${newView}`);
  anim.setAttribute("fill", "freeze");
  anim.setAttribute("dur", "1s");
  SVG.append(anim);
  SVG.querySelector(`animate#${animName}`).beginElement();
};
