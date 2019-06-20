import { combineReducers } from 'redux';
// import reduceReducers from 'reduce-reducers';

/* eslint-disable */
import nativeReducer from './nativeReducer';
// import langReducer from './langReducer';

import settingsReducer from './settingsReducer';

import uiReducer from './uiReducer';
import drinkingReducer from './drinkingReducer';
import notificationsReducer from './notificationsReducer';
import timeReducer from './timeReducer';

const reducers = combineReducers({
  settings: settingsReducer,
  drinking: drinkingReducer,
  ui: uiReducer,
  notifications: notificationsReducer,
  time: timeReducer
});

export default reducers;
