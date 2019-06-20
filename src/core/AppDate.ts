import moment from 'moment';
import Settings, { SettingsItems } from './Settings';

class AppDate {
  /**
   * Get day for witch to calculate drinking
   */
  static getCorrectDay() {
    const startTime = moment(Settings.getItem(SettingsItems.alarmsStartTime));
    const currentTime = moment();

    return currentTime.isAfter(startTime)
      ? currentTime
      : currentTime.subtract(1, 'day');
  }

  /**
   * Get current format for saving
   */
  static formatCurrentDay() {
    return AppDate.getCorrectDay().format('DD.MM.YYYY.');
  }
}

export default AppDate;
