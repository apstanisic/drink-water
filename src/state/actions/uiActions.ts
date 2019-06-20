import { UiActionType, SettingsActionType } from '../actionTypes';
import Settings, { SettingsItems } from '../../core/Settings';
import { wait } from '../../core/helpers';
import store from '../store';

const dispatch = store.dispatch;

export const hideAll = () => dispatch({ type: UiActionType.HIDE_ALL });
const withHideAll = func => {
  return () => {
    hideAll();
    func();
  };
};

export const showProductInfo = withHideAll(() =>
  dispatch({ type: UiActionType.SHOW_PRODUCT_INFO })
);
export const showSplashScreen = withHideAll(() =>
  dispatch({ type: UiActionType.SHOW_SPLASH_SCREEN })
);
export const showShopInfo = withHideAll(() =>
  dispatch({ type: UiActionType.SHOW_SHOP_INFO })
);
export const showSettings = withHideAll(() =>
  dispatch({ type: UiActionType.SHOW_SETTINGS })
);
export const showMenu = withHideAll(() =>
  dispatch({ type: UiActionType.SHOW_MENU })
);
export const showTutorial = withHideAll(() =>
  dispatch({ type: UiActionType.SHOW_TUTORIAL })
);

export const hideShopInfo = () =>
  dispatch({ type: UiActionType.HIDE_SHOP_INFO });
export const hideSettings = () =>
  dispatch({ type: UiActionType.HIDE_SETTINGS });
export const hideMenu = () => dispatch({ type: UiActionType.HIDE_MENU });
export const hideSplashScreen = () =>
  dispatch({ type: UiActionType.HIDE_SPLASH_SCREEN });
export const hideProductInfo = () =>
  dispatch({ type: UiActionType.HIDE_PRODUCT_INFO });

// export const showScreenshotShadow = () => ({ type: UiActionType.SHOW_SCREENSHOT_SHADOW });
// export const hideScreenshotShadow = () => ({ type: UiActionType.HIDE_SCREENSHOT_SHADOW });

export const showScreenshotShadow = async () => {
  dispatch({ type: UiActionType.SHOW_SCREENSHOT_SHADOW });
  await wait(250);
  dispatch({ type: UiActionType.HIDE_SCREENSHOT_SHADOW });
};

export const hideTutorial = async () => {
  await Settings.setItem(SettingsItems.showTutorial, false);
  dispatch({
    type: SettingsActionType.CHANGE_SETTINGS,
    payload: { [SettingsItems.showTutorial]: false }
  });
  dispatch({ type: UiActionType.HIDE_TUTORIAL });
};
