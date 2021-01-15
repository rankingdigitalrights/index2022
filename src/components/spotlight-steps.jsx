/* eslint react/destructuring-assignment: off */
const ScrollySteps = (props) => {
  // console.log(`props: ${props}`);
  return (
    <div className="scrolly-steps">
      <div
        className="step invisible"
        data-step="-99"
        data-color="bg-gray-400"
      />
      {props.story.steps.map(({title, company, content, color}) => {
        // FIXME: I needed to use something else than the index as the unique key.
        // Not sure if the title is right as a identifier but it works for now.
        return (
          <div
            key={title}
            className="step"
            data-step={company}
            data-color={color}
          >
            <h3>{title}</h3>
            <p>{content}</p>
          </div>
        );
      })}
      <div
        className="step invisible"
        data-step="-99"
        data-color="bg-gray-400"
      />
    </div>
  );
};

export default ScrollySteps;
