import React, { Component } from 'react';
import moment from 'moment';

export default class CurrentTime extends React.Component {
  state = {
    currentTime: this.currentTime()
  };

  timeUpdater;

  currentTime() {
    return moment().format('HH:mm');
  }

  setCurrentTime = () => this.setState({ currentTime: this.currentTime() });

  componentDidMount() {
    // this.timeUpdater = setInterval(
    //     () => this.setCurrentTime(), 2000
    // );
    this.setCurrentTime();
    this.timeUpdater = setInterval(this.setCurrentTime, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timeUpdater);
  }

  render() {
    return <div className="current-time">{this.state.currentTime}</div>;
  }
}
