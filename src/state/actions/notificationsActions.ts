import Notifications from '../../core/native/Notifications';
import AppDate from '../../core/AppDate';
import { SettingsItems } from '../../core/Settings';
import { changeSettings } from './settingsActions';
import store from '../store';
import { NotificationsActionType } from '../actionTypes';

const dispatch = store.dispatch;

/**
 * Initializes notifications and sto
 */
export const initNotifications = async () => {
  await Notifications.init();
  changeSettings({ [SettingsItems.notificationsInited]: true });
  await Notifications.storeUpdates(AppDate.formatCurrentDay());
};

export const shuffleNotifications = async () => {
  const notificationState = store.getState().notifications;
  const currentDay = AppDate.formatCurrentDay();

  if (notificationState.updates[currentDay] === true) {
    return;
  }

  await Notifications.resetRepeating();
  await Notifications.storeUpdates(currentDay);

  dispatch({
    type: NotificationsActionType.UPDATE_NOTIFICATIONS,
    payload: currentDay
  });
};

export const initNotificationsState = async () => {
  const days = await Notifications.getResetedDays();
  dispatch({
    type: NotificationsActionType.INIT_NOTIFICATIONS_STATE,
    payload: days
  });
};

// case "UPDATE_START_END_NOTIFICATIONS":
//     state = { ...state };
//     today = appDate.formatToday();
//     let momentToday = appDate.getCorrectDay();
//     let currentMoment = moment();
//     let startTime = storage.settings.get('alarmsStartTime');
//     momentToday.set('hour', startTime.hours);
//     momentToday.set('minute', startTime.minutes)
//     momentToday.add(2, 'hours');
//     console.log(momentToday.format());
//     // check if 2 hours after start time have passed
//     // break;
//     if (state.notificationsStartEndUpdated === undefined) {
//         state.notificationsStartEndUpdated = {};
//     }

//     if (
//         state.notificationsStartEndUpdated[today] !== true
//         &&
//         moment().isAfter(momentToday)
//         //  &&
//         // (momentToday.date() % 2 === 0)
//     ) {
//         console.log('updating notifications');
//         native.notifications.updateStartEnd();
//         state.notificationsStartEndUpdated[today] = true;
//         storage.settings.set('notificationsStartEndUpdated', state.notificationsStartEndUpdated);
//     }
//     break;
