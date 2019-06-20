import defaultSettings from '../../core/data/defaultSettings';
import Settings, { ISettings } from '../../core/Settings';
import { SettingsActionType } from '../actionTypes';

const settingsReducer = (state = Settings.getAll(), action) => {
  switch (action.type) {
    case SettingsActionType.CHANGE_SETTINGS:
      return { ...state, ...action.payload };

    case SettingsActionType.INIT_SETTINGS:
      return { ...action.payload };
  }

  return state;
};

export default settingsReducer;

export interface SettingsState extends ISettings {}
