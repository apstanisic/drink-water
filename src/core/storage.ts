import * as localforage from "localforage";
import { ISettings } from "./Settings";
import defaultSettings from "./data/defaultSettings";

class Storage {
  data: Data = {
    drinking: {},
    settings: defaultSettings
  };

  /**
   * Get item from storage
   * @param item Item name
   */
  getItem<T>(item: string): T {
    if (this.data[item] === undefined) {
      console.log("Item don't exists");
      return {} as any;
    }

    return this.data[item];
  }

  /**
   * Store item in storage
   * @param item Item name
   * @param value Item value
   */
  async setItem<T>(item: string, value: T): Promise<T> {
    const storedValue = await localforage.setItem(item, value);
    this.data[item] = storedValue;

    return storedValue;
  }

  /**
   * Get non "cached" version
   * @param item Item name
   */
  async getFreshItem<T>(item): Promise<T | null> {
    const value = (await localforage.getItem(item)) as T | null;

    if (value !== null) {
      this.data[item] = value;
    }

    return value;
  }

  /**
   * Get localforage instance
   * For testing in devTools
   */
  get localforage() {
    return localforage;
  }
}

interface Data {
  settings: ISettings;
  drinking: {};
}

// @ts-ignore
const storage = (window.storage = new Storage());
export default storage;
