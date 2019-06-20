import Settings, { SettingsItems } from "./Settings";
import drinking from "./Drinking";
import sync from "./sync";
import initState from "../state/initState";
import "../appRes/fontawesome";
import { initNotifications } from "../state/actions/notificationsActions";
import Notifications from "./native/Notifications";

export default async function init() {
  // Initialize settings storage, or set default settings
  await Settings.init();
  // Initialize drinking storage, or set up data object
  await drinking.init();
  // Init notification storage
  await Notifications.initStorage();
  // import store
  await import("../state/store").then(async storeImport => {
    // const store = storeImport.default;
    // initialize app state
    await initState();
  });
  // Init notifications if they arent inited
  // if (Settings.getItem(SettingsItems.notificationsInited) !== true) {
  //     // it will slow first renderer, but it will only
  //     // be run first time
  //     await initNotifications();
  // }
  // // start synchronization
  // sync.init();
}

export const bootstrapNotifications = async () => {
  if (Settings.getItem(SettingsItems.notificationsInited) !== true) {
    // it will slow first renderer, but it will only
    // be run first time
    await initNotifications();
  }
  // start synchronization
  sync.init();
};
