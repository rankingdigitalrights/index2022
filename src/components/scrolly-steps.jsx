/* eslint react/destructuring-assignment: off */
const ScrollySteps = (props) => {
  return (
    <div className="scrolly-steps z-40">
      {props.story.steps.map(
        ({
          id,
          extraClass = "",
          title,
          content,
          color,
          showLayers = "",
          hideLayers = "",
        }) => {
          return (
            <div
              key={id}
              className={`step ${extraClass}`}
              data-color={color}
              data-show={showLayers}
              data-hide={hideLayers}
            >
              <div className="step-content">
                {title && <h2 className="bg-white-100">{title}</h2>}
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
