import story from "../../data/spotlights/spotlight-1.json";

const ScrollySteps = () => {
  return story.steps.map(({title, content, color}, index) => {
    return (
      <div
        key={index}
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
