import store from '../store';
import translate from '../../core/translate';
// import Settings, { SettingsItems } from '../../core/Settings';

export const t = (textKey: string) => {
  const language = store.getState().settings.language;
  // const language = Settings.getItem(SettingsItems.language);
  return translate(textKey, language);
};
