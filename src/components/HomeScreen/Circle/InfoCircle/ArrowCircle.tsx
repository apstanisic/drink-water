import React from "react";

import arrowImage from "../../../../appRes/img/circle.png";

const ArrowCircle = (props: { minutesAfterStart: number }) => {
  const circleDurationMinutes = 480;
  let rotation = (1 / circleDurationMinutes) * props.minutesAfterStart;
  rotation = rotation > 1 ? 1 : rotation;
  rotation = rotation - 0.25;
  // const style = { transform: "rotate(" + rotation + "turn)" };
  const style = { transform: `rotate(${rotation}turn)` };
  // const style = {};

  return (
    <div className="circle-arrow-wrapper">
      <img
        src={arrowImage}
        alt="arrow-circle"
        className="circle-arrow"
        style={style}
      />
      {/* <img src="img/circle-arrow.gif" className="circle-arrow" style={style} /> */}
    </div>
  );
};

export default ArrowCircle;
