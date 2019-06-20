import { UiActionType } from "../actionTypes";

const defaultData = {
  showSettings: false,
  showShopInfo: false,
  showMenu: false,
  showProductInfo: null as boolean | null,
  showScreenshootShadow: false,
  showSplashScreen: false,
  showTutorial: false,
  darkBg: false
};

const uiReducer = (state: UiState = defaultData, action): UiState => {
  // let state = { ...oldState };

  switch (action.type) {
    case UiActionType.HIDE_ALL:
      return { ...defaultData, ...{ showSplashScreen: false } };

    case UiActionType.SHOW_SPLASH_SCREEN:
      return { ...state, ...{ showSplashScreen: true, darkBg: false } };
    case UiActionType.SHOW_MENU:
      return { ...state, ...{ showMenu: true, darkBg: true } };
    case UiActionType.SHOW_PRODUCT_INFO:
      return { ...state, ...{ showProductInfo: true, darkBg: false } };
    case UiActionType.SHOW_SCREENSHOT_SHADOW:
      return { ...state, ...{ showScreenshootShadow: true, darkBg: false } };
    case UiActionType.SHOW_SETTINGS:
      return { ...state, ...{ showSettings: true, darkBg: true } };
    case UiActionType.SHOW_TUTORIAL:
      return { ...state, ...{ showTutorial: true, darkBg: false } };
    case UiActionType.SHOW_SHOP_INFO:
      return { ...state, ...{ showShopInfo: true, darkBg: true } };

    case UiActionType.HIDE_SPLASH_SCREEN:
      return { ...state, ...{ showSplashScreen: false, darkBg: false } };
    case UiActionType.HIDE_MENU:
      return { ...state, ...{ showMenu: false, darkBg: false } };
    case UiActionType.HIDE_PRODUCT_INFO:
      return { ...state, ...{ showProductInfo: false, darkBg: false } };
    case UiActionType.HIDE_SCREENSHOT_SHADOW:
      return { ...state, ...{ showScreenshootShadow: false, darkBg: false } };
    case UiActionType.HIDE_SETTINGS:
      return { ...state, ...{ showSettings: false, darkBg: false } };
    case UiActionType.HIDE_TUTORIAL:
      return { ...state, ...{ showTutorial: false, darkBg: false } };
    case UiActionType.HIDE_SHOP_INFO:
      return { ...state, ...{ showShopInfo: false, darkBg: false } };
    default:
      return state;
  }
};

export default uiReducer;

export interface UiState {
  showSettings: boolean;
  showShopInfo: boolean;
  showMenu: boolean;
  showProductInfo: boolean | null;
  showScreenshootShadow: boolean;
  showSplashScreen: boolean;
  showTutorial: boolean;
  darkBg: boolean;
}
