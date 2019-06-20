import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducers/reducers';
import { UiState } from './reducers/uiReducer';
import { SettingsState } from './reducers/settingsReducer';
import { TimeState } from './reducers/timeReducer';
import { NotificationsState } from './reducers/notificationsReducer';
import { DrinkingState } from './reducers/drinkingReducer';

const middleware = applyMiddleware(thunk, createLogger({ collapsed: true }));
// const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);

// @ts-ignore
window.store = store;
export default store;

export interface State extends Store {
  settings: SettingsState;
  drinking: DrinkingState;
  ui: UiState;
  time: TimeState;
  notifications: NotificationsState;
}
