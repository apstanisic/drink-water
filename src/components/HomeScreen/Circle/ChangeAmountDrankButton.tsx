import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { drinkOne, unsipOne } from '../../../state/actions/drinkingActions';

const ChangeAmountDrankButton = props => {
  if (props.type === 'plus') {
    return (
      <button
        className="drink-button drink-button-plus"
        onTouchStart={drinkOne}
      >
        <FontAwesomeIcon icon="plus" />
      </button>
    );
  } else {
    return (
      <button
        className="drink-button drink-button-minus"
        onTouchStart={unsipOne}
      >
        <FontAwesomeIcon icon="minus" />
      </button>
    );
  }
};

export default ChangeAmountDrankButton;
