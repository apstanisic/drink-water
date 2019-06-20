// import native from '../native';
import Settings from '../../core/Settings';
import { SettingsActionType } from '../actionTypes';
import store from '../store';
import { drinkAmount } from './drinkingActions';
import sync from '../../core/sync';
import Notifications from '../../core/native/Notifications';
import { wait } from '../../core/helpers';
import { showSplashScreen } from './uiActions';

const dispatch = store.dispatch;
/**
 * Change one or more settings
 * @param newSettings New settings object to be merged with old
 */
export const changeSettings = async (newSettings: {}) => {
  await wait(300);
  const mergedSettings = await Settings.merge(newSettings);
  dispatch({
    type: SettingsActionType.CHANGE_SETTINGS,
    payload: mergedSettings
  });
  sync.sync();
  // First let notification to end, than init notifications
  await wait(1000);
  await Notifications.init();
};

/**
 * Initialize settings state
 */
export const initSettings = () => {
  const settings = Settings.getAll();
  dispatch({
    type: SettingsActionType.INIT_SETTINGS,
    payload: settings
  });
};

/**
 * Change language
 */
export const toggleLanguage = async () => {
  const state = store.getState();
  const newLang = state.settings.language === 'nl' ? 'en' : 'nl';
  const newSettings = await Settings.setItem('language', newLang);

  dispatch({ type: SettingsActionType.CHANGE_SETTINGS, payload: newSettings });

  showSplashScreen();

  await wait(200);
  await Notifications.init();
};
