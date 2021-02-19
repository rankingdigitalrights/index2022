/* eslint react/destructuring-assignment: off */
const ScrollySteps = (props) => {
  // console.log("props:\n");
  // console.dir(props);
  return (
    <div className="scrolly-steps">
      {/* <div
        className="step invisible"
        data-step="-99"
        data-color="bg-gray-400"
      /> */}
      {props.story.steps.map(
        ({
          id,
          title,
          company,
          content,
          color,
          showLayers = "",
          hideLayers = "",
        }) => {
          return (
            <div
              key={id}
              className="step"
              data-step={company}
              data-color={color}
              data-show={showLayers}
              data-hide={hideLayers}
            >
              <div className="step-content">
                <h2 className="bg-white-100">{title}</h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                />
              </div>
            </div>
          );
        },
      )}
      <div
        className="step invisible"
        data-step="-99"
        data-color="bg-light-grey"
      />
    </div>
  );
};

export default ScrollySteps;
