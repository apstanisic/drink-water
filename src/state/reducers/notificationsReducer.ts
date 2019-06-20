import { NotificationsActionType } from '../actionTypes';

const defaultState = {
  updates: {}
};

const notificationsReducer = (
  state: NotificationsState = defaultState,
  action
): NotificationsState => {
  switch (action.type) {
    case NotificationsActionType.INIT_NOTIFICATIONS_STATE:
      return { ...state, ...{ updates: action.payload } };

    case NotificationsActionType.UPDATE_NOTIFICATIONS:
      return { ...state, ...{ [action.payload]: true } };

    default:
      return state;
  }
};

export default notificationsReducer;

export interface NotificationsState {
  updates: {};
}
