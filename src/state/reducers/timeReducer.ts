// import storage from '../core/storage';
import { TimeActionType } from '../actionTypes';

const defaultState = { minutesAfterStart: 0, quatersAfterStart: 0 };

const timeReducer = (oldState: TimeState = defaultState, action): TimeState => {
  const state = { ...oldState };

  switch (action.type) {
    case TimeActionType.TIME_AFTER_START:
      const { minutesAfterStart, quatersAfterStart } = action.payload;
      return { ...oldState, ...{ minutesAfterStart, quatersAfterStart } };
    default:
      return state;
  }
};

export default timeReducer;

export interface TimeState {
  minutesAfterStart: number;
  quatersAfterStart: number;
}
