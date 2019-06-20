/**
 * Plugin for scheduling notifications with callbacks
 */
class NotificationPlugin {
  /**
   * Cancel all notifications
   */
  static cancelAll(func = () => {}): void {
    try {
      // @ts-ignore
      cordova.plugins.notification.local.cancelAll(func);
    } catch (error) {
      console.log("Notification cancel all error", error);
    }
  }

  /**
   * Schedule notifications
   */
  static schedule(notifications: any | any[], func = () => {}): void {
    try {
      // @ts-ignore
      cordova.plugins.notification.local.schedule(notifications, func);
    } catch (error) {
      console.log("Notification cancel all error", error);
    }
  }

  /**
   * Cancel notifications by id
   * @param ids Notifications to cancel
   */
  static cancel(ids: number[] | number, func = () => {}): void {
    try {
      // @ts-ignore
      cordova.plugins.notification.local.cancel(ids, func);
    } catch (error) {
      console.log("Notification cancel by id error", error);
    }
  }

  /**
   * Get all notifications id
   */
  static getIds(func = (ids: number[]) => {}): void {
    try {
      // @ts-ignore
      cordova.plugins.notification.local.getIds(func);
    } catch (error) {
      console.log("Notification get ids error", error);
    }
  }

  /**
   * Get all notifications
   * returns notifications, no typings
   */
  static getAll(func = (notifications: any[]) => {}): void {
    try {
      // @ts-ignore
      cordova.plugins.notification.local.getAll(func);
    } catch (error) {
      console.log("Notification get all error", error);
    }
  }
}

// @ts-ignore
window.Notification = NotificationPlugin;

export default NotificationPlugin;
