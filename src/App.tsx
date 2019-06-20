import React from 'react';
import { connect } from 'react-redux';

import HomeScreen from './components/HomeScreen/HomeScreen';
import SplashScreen from './components/SplashScreen';
import SlideIns from './components/SlideIns/SlideIns';
import Tutorial from './components/Tutorial/Tutorial';
import { State } from './state/store';

const App = (props: State) => {
  return (
    <React.Fragment>
      {props.ui.showSplashScreen && <SplashScreen />}

      {(props.ui.showTutorial || props.settings.showTutorial) && (
        <Tutorial language={props.settings.language} />
      )}

      <HomeScreen shadow={props.ui.showScreenshootShadow} />

      <SlideIns />

    </React.Fragment>
  );
};

export default connect((state: State) => state)(App);
