import { calcTimeAfterStart } from '../state/actions/timeActions';
import { drinkAmount } from '../state/actions/drinkingActions';
import { shuffleNotifications } from '../state/actions/notificationsActions';

class Sync {
  private interval: any;
  private notificationInterval: any;

  /**
   * Initialize syncing, resyncing after resuming using app
   */
  init() {
    clearInterval(this.interval);
    clearInterval(this.notificationInterval);

    this.interval = setInterval(this.sync, 5000);
    this.notificationInterval = setInterval(this.notifications, 15000);

    document.addEventListener('resume', this.sync);
    document.addEventListener('resume', this.notifications);
  }

  /**
   * Syncronize storage, time and app state
   */
  sync = () => {
    calcTimeAfterStart();
    drinkAmount();
    // notificationsSync();
  };

  notifications = () => {
    shuffleNotifications();
  };
}

export default new Sync();
