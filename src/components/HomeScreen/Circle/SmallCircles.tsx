import React, { Component } from "react";
import { connect } from "react-redux";

import SmallCircle from "./SmallCircle";
import AppDate from "../../../core/AppDate";
import { State } from "../../../state/store";
import { SettingsState } from "../../../state/reducers/settingsReducer";
import { TimeState } from "../../../state/reducers/timeReducer";
import { DrinkingState } from "../../../state/reducers/drinkingReducer";

class SmallCircles extends React.Component<{
  drinking: DrinkingState;
  //   settings: SettingsState;
  time: TimeState;
}> {
  numberOfCircles: number;
  circleType: number; // circle type - 1 whole, 0.5 half, 0.25 quarter
  radius: string; // distance from center
  circleEnding: number;
  numberOfElements: number;
  slice: number;

  constructor(props) {
    super(props);

    this.numberOfCircles = 32;
    this.circleType = 1; // circle type - 1 whole, 0.5 half, 0.25 quarter
    this.radius = "37vmin"; // distance from center
    this.circleEnding = 180 + (360 / this.numberOfCircles) * 8; // shift end from 0, where last circle is placed
    this.numberOfElements =
      this.circleType === 1 ? this.numberOfCircles : this.numberOfCircles - 1;
    // adj for even distro of elements when not full circle
    this.slice = (360 * this.circleType) / this.numberOfElements;
  }

  circlesCount = () => {
    let currentDayDrinking = this.props.drinking[AppDate.formatCurrentDay()];
    if (typeof currentDayDrinking !== "number") {
      currentDayDrinking = 0;
    }
    return currentDayDrinking + this.props.time.quatersAfterStart;
  };

  render() {
    const smallCircles: JSX.Element[] = [];

    // console.log(this.props);
    for (let i = 0; i < this.numberOfCircles; i++) {
      const rotate = this.slice * i + this.circleEnding;
      const rotateReverse = rotate * -1;

      // let fill =

      const style = {
        transform:
          "rotate(" +
          rotate +
          "deg) translate(" +
          this.radius +
          ") rotate(" +
          rotateReverse +
          "deg)"
      };

      const circle = (
        <SmallCircle
          size={(i + 1) % 8 === 1 ? "bigger" : "smaller"}
          key={i}
          style={style}
          fill={this.circlesCount() >= i}
        />
      );
      smallCircles.push(circle);
    }

    return (
      <div className="small-circles">
        <div className="small-circles-center">{smallCircles}</div>
      </div>
    );
  }
}

export default connect((state: State) => ({
  drinking: state.drinking,
  startTime: state.settings.alarmsStartTime,
  time: state.time
}))(SmallCircles);
