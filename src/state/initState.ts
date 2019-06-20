import { calcTimeAfterStart } from './actions/timeActions';
import { initDrinking, drinkAmount } from './actions/drinkingActions';
import { initSettings } from './actions/settingsActions';
import { initNotificationsState } from './actions/notificationsActions';

export default async () => {
  // Calculate mins and quaters from start time until now and store in state
  await calcTimeAfterStart();
  // Set drinking for current day from storage to state
  await initDrinking();
  // Store settings in state
  initSettings();
  // We don't need this because of initDrinking();
  // await drinkAmount();

  // Get days for which notifications has been reseted to state
  await initNotificationsState();
};
