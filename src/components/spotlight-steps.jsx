const ScrollySteps = (props) => {
  console.log(`props: ${props}`);
  return (
    <div className="scrolly-steps">
      <div
        className="step invisible"
        data-step="-99"
        data-color="bg-gray-400"
      />
      {props.story.steps.map(({title, content, color}, index) => {
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
      })}
    </div>
  );
};

export default ScrollySteps;
