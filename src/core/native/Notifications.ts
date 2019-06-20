import moment from "moment";
import Settings from "../Settings";
import { wait, callbackToPromise, promiseError } from "../helpers";
import { _t } from "../translate";
import storage from "../storage";

/**
 * Plugin for scheduling notifications
 */
const plugin = () => {
  try {
    /* eslint-disable */
    // @ts-ignore
    return cordova.plugins.notification.local;
  } catch (error) {
    console.log("Notification plugin not available", error);
    return null;
  }
};

class Notifications {
  /**
   * For general storage about notification
   */
  private static storageName = "notifications";

  /**
   * Only for notification updates tracking
   */
  private static updatesStorageName = "notificationsUpdates";

  /**
   * Plugin for scheduling notifications
   */
  private static get plugin(): any {
    return plugin();
  }

  /**
   * Update notifications that are shuffuling to remind to drink water
   * Updating because we want to change text order every day
   */
  static async resetRepeating(): Promise<void> {
    if (Settings.getAll().alarmsOn === false) {
      return;
    }

    try {
      // Ids to cancel
      const ids = await Notifications.getIds().then(allIds =>
        allIds.filter(id => id > 20)
      );
      await Notifications.cancel(ids);
      await Notifications.scheduleRepeating();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Update first and last notification
   * Maybe because on android only 5 days repeating last
   */
  static async resetStartEnd(): Promise<void> {
    if (Settings.getAll().alarmsOn === false) {
      return;
    }

    return Notifications.cancel([11, 12])
      .then(() => Notifications.scheduleStartEnd())
      .catch(console.error);
  }

  /**
   * Initialize notifications
   */
  static async init(): Promise<void> {
    try {
      await Notifications.cancelAll();
      if (!Settings.getAll().alarmsOn) {
        return;
      }
      await Notifications.scheduleStartEnd();
      await Notifications.scheduleRepeating();
    } catch (error) {
      console.log(error);
    }
  }

  static async initStorage(): Promise<void> {
    const defaultStorage = await storage.getFreshItem(
      Notifications.storageName
    );
    if (defaultStorage === null) {
      await storage.setItem(Notifications.storageName, {});
    }
    const updatesStorage = await storage.getFreshItem(
      Notifications.updatesStorageName
    );
    if (updatesStorage === null) {
      await storage.setItem(Notifications.updatesStorageName, {});
    }
  }

  /**
   *
   * @param day Day for which we want to say that we updated notifications
   */
  static async storeUpdates(day: string): Promise<void> {
    const currentData = storage.getItem(Notifications.updatesStorageName);
    await storage.setItem(Notifications.updatesStorageName, {
      ...currentData,
      ...{ [day]: true }
    });
  }

  /**
   * Get all days that had notifications reseted
   */
  static async getResetedDays(): Promise<{}> {
    const days: any = await storage.getFreshItem(
      Notifications.updatesStorageName
    );
    return days !== null ? days : {};
  }

  /**
   * Schedule first and last notification
   */
  private static scheduleStartEnd(): Promise<void> {
    try {
      const settings = Settings.getAll();

      const startTime = moment(settings.alarmsStartTime);
      const endTime = moment(settings.alarmsEndTime);

      if (startTime.isAfter(endTime)) {
        endTime.add(1, "days");
      }

      const start = {
        id: 11,
        title: "Hydranome",
        text: _t("notification.start"),
        trigger: {
          every: {
            hour: startTime.hours(),
            minute: startTime.minutes()
          }
        },
        vibrate: settings.alarmsVibrate,
        sound: settings.alarmsSound,
        foreground: true
      };

      const end = {
        id: 12,
        title: "Hydranome",
        text: _t("notification.end"),
        trigger: {
          every: {
            hour: endTime.hours(),
            minute: endTime.minutes()
          }
          // count: 15
        },
        vibrate: settings.alarmsVibrate,
        sound: settings.alarmsSound,
        foreground: true
      };

      return callbackToPromise(plugin().schedule.bind(plugin()), [
        [start, end]
      ]).then(() => wait(50));
    } catch (error) {
      console.log("Notification schdule start end error", error);
      return Promise.resolve();
    }
  }

  /**
   * Schedule repeating notifications
   */
  private static async scheduleRepeating(): Promise<void> {
    try {
      const settings = Settings.getAll();
      const toSchedule: any[] = [];

      const startTime = moment(settings.alarmsStartTime);
      const endTime = moment(settings.alarmsEndTime);

      if (startTime.isAfter(endTime)) {
        endTime.add(1, "days");
      }

      // Split notifications at random place, than join again but second part goes first
      // Every day different order of notifications
      const bodyTexts: string[] = _t("notification.reminders");
      const randomNumber = Math.floor(Math.random() * bodyTexts.length);
      const randomText = bodyTexts.slice(randomNumber);
      const shuffledText = randomText.concat(bodyTexts);

      let iterator = 0;
      startTime.add(settings.timeBetweenAlarms, "minutes");

      while (endTime.isAfter(startTime)) {
        toSchedule.push({
          id: iterator + 21,
          title: "Hydranome",
          text: shuffledText[iterator],
          trigger: {
            every: {
              hour: startTime.hours(),
              minute: startTime.minutes()
            }
            // count: 15
          },
          vibrate: settings.alarmsVibrate,
          sound: settings.alarmsSound,
          foreground: true
        });

        startTime.add(settings.timeBetweenAlarms, "minutes");
        iterator++;
      }

      return callbackToPromise(plugin().schedule.bind(plugin()), [
        toSchedule
      ]).then(() => wait(50));
    } catch (error) {
      console.log("Notification schedule repeating error", error);
      return Promise.resolve();
    }
  }

  /**
   * Cancel all notifications
   */
  private static cancelAll(): Promise<void> {
    try {
      return callbackToPromise(plugin().cancelAll.bind(plugin())).then(() =>
        wait(50)
      );
    } catch (error) {
      console.log("Notification cancel all error", error);
      return Promise.resolve();
    }
  }

  /**
   * Cancel notifications by id
   * @param ids Notifications to cancel
   */
  private static cancel(ids: number[] | number): Promise<void> {
    try {
      return callbackToPromise(plugin().cancel.bind(plugin()), [ids]).then(() =>
        wait(50)
      );
    } catch (error) {
      console.log("Notification cancel by id error", error);
      return Promise.resolve();
    }
  }

  /**
   * Get all notifications id
   */
  private static getIds(): Promise<number[]> {
    try {
      let ids: number[] = [];
      return (
        callbackToPromise(plugin().getIds.bind(plugin()))
          // @ts-ignore
          .then((resIds: number[]) => {
            ids = resIds;
            return wait(50);
          })
          .then(() => ids)
          .catch(promiseError([]))
      );
    } catch (error) {
      console.log("Notification get ids error", error);
      return Promise.resolve([]);
    }
  }

  /**
   * Get all notifications
   * returns notifications, no typings
   */
  private static getAll(): Promise<any[]> {
    try {
      let notifications: any[] = [];
      return callbackToPromise<any[]>(plugin().getAll.bind(plugin()))
        .then(allNotifications => {
          notifications = allNotifications;
          return wait(50);
        })
        .then(() => notifications)
        .catch(promiseError([]));
    } catch (error) {
      console.log("Notification get all error", error);
      return Promise.resolve([]);
    }
  }
}

// @ts-ignore
window.Notifications = Notifications;

export default Notifications;
