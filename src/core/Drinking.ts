import storage from './storage';
import AppDate from './AppDate';

class Drinking {
  private static storageName = 'drinking';

  /**
   * Initialize drinking data from storage
   */
  static async init(): Promise<void> {
    const drinkingData = await storage.getFreshItem(Drinking.storageName);
    if (drinkingData === null) {
      const data = { [AppDate.formatCurrentDay()]: 0 };
      await storage.setItem(Drinking.storageName, data);
    }
  }

  /**
   * Get drinking amount for given day
   * @param day Day for which we want to get value
   */
  static getDay(day): number {
    if (!storage.data.drinking[day]) {
      return 0;
    }
    return storage.data.drinking[day];
  }

  /**
   * Set drinking value for selected day
   * @param day Day to set value
   * @param value Value to set
   */
  static async setDay(day, value): Promise<{}> {
    const data = { ...Drinking.getAllDays(), ...{ [day]: value } };
    const newData = await storage.setItem(Drinking.storageName, data);
    return newData;
  }

  /**
   * Get drinking for all days
   */
  static getAllDays() {
    return storage.data.drinking;
  }

  /**
   * Get drinking amount from today as an object
   */
  static async getCurrentDay(): Promise<{}> {
    const currentDay = AppDate.formatCurrentDay();
    const amount = await Drinking.getCurrentDayAmount();
    return { [currentDay]: amount };
  }

  /**
   * Get drinking amount from today, or set amount for new day
   */
  static async getCurrentDayAmount(): Promise<number> {
    const currentDay = AppDate.formatCurrentDay();
    const amount = storage.data.drinking[currentDay];
    if (amount === null || amount === undefined) {
      await Drinking.setDay(currentDay, 0);
      return 0;
    }
    return amount;
  }

  /**
   * Change drinking amount for today
   * @param amount amount
   * @param increment should amount increment or replace
   */
  static async changeCurrentDay(
    amount: number,
    increment = true
  ): Promise<number> {
    const currentAmount = await Drinking.getCurrentDayAmount();
    const newAmount = increment ? currentAmount + amount : amount;
    // Uncomment to set that drinking can't be negative
    // Dots will always be filled with quaters passed
    // newAmount = newAmount > 0 ? newAmount : 0;
    await Drinking.setDay(AppDate.formatCurrentDay(), newAmount);
    return newAmount;
  }

  /**
   * Drink one for today
   */
  static async drinkOne() {
    const newAmount = await Drinking.changeCurrentDay(1);
    return newAmount;
  }

  /**
   * Remove one from today drinking
   */
  static async unsipOne() {
    const newAmount = await Drinking.changeCurrentDay(-1);
    return newAmount;
  }
}

export default Drinking;
