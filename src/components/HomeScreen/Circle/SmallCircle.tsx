import React, { Component } from 'react';

const SmallCircle = props => {
  const fill = props.fill === true;
  const bigger = props.size === 'bigger';
  const style = props.style;

  return (
    <span
      className={'small ' + (bigger ? 'quarter ' : '') + (fill ? 'done ' : '')}
      style={style}
    />
  );
};

export default SmallCircle;
