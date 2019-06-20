import React, { Component } from "react";

interface Props {
  style?: {};
  move: any;
  stop?: any;
}

export default class WaterContainer extends Component<Props> {
  state = { timeShown: 0 };

  render() {
    return (
      <React.Fragment>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          style={{ display: "none" }}
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z" />
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z" />
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z" />
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z" />
          </symbol>
        </svg>

        <div
          className={
            "water-container " +
            (this.props.move !== undefined ? this.props.move : "")
          }
          style={this.props.style ? this.props.style : {}}
        >
          {/* <!-- Based on http://jsbin.com/pinowufeqe/2/edit?html,css,js,output --> */}
          {/* <div className="water-container"> */}

          {/* </div> */}
          <div className="water ">
            {/* <img src="img/splash.png" className={"splash-image " + (this.state.fadeInImage ? 'block fade-in' : '')} /> */}

            <svg
              viewBox="0 0 560 20"
              className={"water_wave water_wave_back " + this.props.stop}
            >
              <use xlinkHref="#wave" />
            </svg>
            <svg
              viewBox="0 0 560 20"
              className={"water_wave water_wave_front " + this.props.stop}
            >
              <use xlinkHref="#wave" />
            </svg>

            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
