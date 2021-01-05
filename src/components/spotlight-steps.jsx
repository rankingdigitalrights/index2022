import story from "../../data/spotlights/spotlight-1.json";

const ScrollySteps = () => {
  return story.steps.map(({title, content, color}, index) => {
    // FIXME: I needed to use something else than the index as the unique key.
    // Not sure if the title is right as a identifier but it works for now.
    return (
      <div
        key={title}
        className="step"
        data-step={index + 1}
        data-color={color}
      >
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  });
};
export default ScrollySteps;
