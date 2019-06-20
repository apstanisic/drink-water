import storage from "./storage";
import defaultSettings from "./data/defaultSettings";

class Settings {
  private static storageName = "settings";

  /* Init settings */
  static async init(): Promise<void> {
    let settings = (await storage.getFreshItem(
      Settings.storageName
    )) as ISettings;

    if (settings === null) {
      settings = await storage.setItem(Settings.storageName, defaultSettings);
    }

    storage.data.settings = settings;
  }

  /* Get one  */
  static getItem(item) {
    const settingsItem = storage.data.settings[item];

    if (settingsItem === undefined) {
      throw new Error("This settings does not exist.");
    }

    return settingsItem;
  }

  /* Get all settings  */
  static getAll() {
    return storage.data.settings;
  }
  /* Change settings */
  static async setItem(item, value) {
    const settings = {
      ...Settings.getAll(),
      ...{ [item]: value }
    };
    const newSettings = (await storage.setItem(
      Settings.storageName,
      settings
    )) as ISettings;
    return newSettings;
  }

  static async merge(newSettings) {
    const oldSettings = Settings.getAll();
    const merged = await storage.setItem(Settings.storageName, {
      ...oldSettings,
      ...newSettings
    });
    return merged;
  }
}

export interface ISettings {
  language: string;
  alarmsStartTime: { hours: number; minutes: number };
  alarmsEndTime: { hours: number; minutes: number };
  timeBetweenAlarms: number;
  alarmsSound: boolean;
  alarmsVibrate: boolean;
  alarmsOn: boolean;
  showTutorial: boolean;
  notificationsInited: boolean;
  notificationsUpdated: any;
  notificationsStartEndUpdated: any;
}

export enum SettingsItems {
  language = "language",
  alarmsStartTime = "alarmsStartTime",
  alarmsEndTime = "alarmsEndTime",
  timeBetweenAlarms = "timeBetweenAlarms",
  alarmsSound = "alarmsSound",
  alarmsVibrate = "alarmsVibrate",
  alarmsOn = "alarmsOn",
  showTutorial = "showTutorial",
  notificationsInited = "notificationsInited",
  notificationsUpdated = "notificationsUpdated",
  notificationsStartEndUpdated = "notificationsStartEndUpdated"
}

export default Settings;
