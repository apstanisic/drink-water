import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hideTutorial } from '../../state/actions/uiActions';
import tutorialImages from './TutorialImages';

export default class Tutorial extends React.Component<{ language: string }> {
  state = {
    page: 1
  };

  changePage = (amount: number) => {
    this.setState({ page: this.state.page + amount });
  };

  prev = () => this.changePage(-1);

  next = () => {
    if (this.state.page === 7) {
      hideTutorial();
    }
    this.changePage(1);
  };

  render() {
    const Images: JSX.Element[] = [];

    for (let i = 1; i < 8; i++) {
      Images.push(
        // <img src={"img/tutorial/" + this.props.language + "/man_" + i + ".png"}
        //     className={"tutorial-image " + (this.state.page === i ? '' : 'none')} key={i} />);
        <img
          src={tutorialImages[this.props.language][i - 1]}
          alt={'Tutorial image ' + i}
          className={'tutorial-image ' + (this.state.page === i ? '' : 'none')}
          key={i}
        />
      );
    }

    return (
      <div className="tutorial">
        <button
          className={'tutorial-prev ' + (this.state.page === 1 ? 'none' : '')}
          onTouchStart={this.prev}
        >
          {/* <i className="fas fa-angle-double-left"></i> */}
          <FontAwesomeIcon icon="angle-double-left" />
        </button>
        <button className="tutorial-next" onTouchStart={this.next}>
          <FontAwesomeIcon icon="angle-double-right" />
        </button>
        {Images}
      </div>
    );
  }
}
