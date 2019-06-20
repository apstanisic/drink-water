import React, { Component } from 'react';
import { wait } from '../core/helpers';
import WaterContainer from './WaterContainer';
import { hideSplashScreen } from '../state/actions/uiActions';

import splashImage from '../appRes/img/splash.png';

export default class SplashScreen extends Component {
  state = {
    fadeInImage: false,
    moveWater: ''
  };

  async componentDidMount() {
    await wait(400);
    this.setState({ fadeInImage: true });
    await wait(3500);
    this.setState({ moveWater: 'move-water' });
    await wait(5000);
    hideSplashScreen();
  }

  render() {
    return (
      <WaterContainer
        style={{ transform: 'translate(0, 0%)' }}
        move={this.state.moveWater}
      >
        <img
          alt="splash screen"
          src={splashImage}
          className={
            'splash-image ' + (this.state.fadeInImage ? 'block fade-in' : '')
          }
        />
      </WaterContainer>
    );
  }
}
