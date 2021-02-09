/* eslint react/destructuring-assignment: off */
const ScrollySteps = (props) => {
  // console.log("props:\n");
  // console.dir(props);
  return (
    <div className="scrolly-steps">
      <div
        className="step invisible"
        data-step="-99"
        data-color="bg-gray-400"
      />
      {props.story.steps.map(
        ({
          id,
          title,
          company,
          content,
          color,
          queries = "",
          toggle = "fade-out",
        }) => {
          // FIXME: I needed to use something else than the index as the unique key.
          // Not sure if the title is right as a identifier but it works for now.
          return (
            <div
              key={id}
              className="step shadow"
              data-step={company}
              data-color={color}
              data-queries={queries}
              data-toggle={toggle}
            >
              <h2 className="bg-white-100">{title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          );
        },
      )}
      <div
        className="step invisible"
        data-step="-99"
        data-color="bg-gray-400"
      />
    </div>
  );
};

export default ScrollySteps;
