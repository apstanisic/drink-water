import moment from 'moment';
import AppDate from '../../core/AppDate';
import { TimeActionType } from '../actionTypes';
import { Dispatch } from 'redux';
import store from '../store';
import Settings, { SettingsItems } from '../../core/Settings';

const dispatch = store.dispatch;
/**
 * Calculates fime beetween start time and current time in minutes and quater hours
 */
export const calcTimeAfterStart = async () => {
  const startTime = moment(Settings.getItem(SettingsItems.alarmsStartTime));
  const now = moment();

  if (startTime.isAfter(now)) {
    startTime.subtract(1, 'day');
  }
  const minutesAfterStart = now.diff(startTime, 'minutes');
  const quatersAfterStart = Math.floor(minutesAfterStart / 15);

  dispatch({
    type: TimeActionType.TIME_AFTER_START,
    payload: { minutesAfterStart, quatersAfterStart }
  });
};
