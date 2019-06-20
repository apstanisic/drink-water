import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import WaterDrinker from './WaterDrinker';

const HomeScreen = props => {
  return (
    <div className={'homescreen ' + (props.shadow ? 'shadow' : '')}>
      <Header />
      <WaterDrinker />
      <Footer />
    </div>
  );
};

export default HomeScreen;
