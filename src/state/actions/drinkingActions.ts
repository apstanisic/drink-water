import moment from 'moment';
import AppDate from '../../core/AppDate';
import Drinking from '../../core/Drinking';
import { DrinkingActionType } from '../actionTypes';
import store from '../store';

const dispatch = store.dispatch;

/**
 * Initialize drinking state and storage
 */
export const initDrinking = async () => {
  const currentDayAmount = await Drinking.getCurrentDay();
  dispatch({
    type: DrinkingActionType.INIT_DRINKING,
    payload: currentDayAmount
  });
};

/**
 * Drink one sip
 */
export const drinkOne = async () => {
  const newAmount = await Drinking.drinkOne();
  dispatch({
    type: DrinkingActionType.CHANGE_DRINK_AMOUNT,
    payload: newAmount
  });
};

/**
 * Remove one sip
 */
export const unsipOne = async () => {
  const newAmount = await Drinking.unsipOne();
  dispatch({
    type: DrinkingActionType.CHANGE_DRINK_AMOUNT,
    payload: newAmount
  });
};

/**
 * Get amount drank today
 */
export const drinkAmount = async () => {
  const amount = await Drinking.getCurrentDayAmount();
  dispatch({ type: DrinkingActionType.CHANGE_DRINK_AMOUNT, payload: amount });
};

/**
 * Get total circles
 */
// export const circlesCount = () => {
//     const drankAmount = store.getState().drinking[AppDate.formatCurrentDay()];
//     return drankAmount + store.getState().time.quatersAfterStart;
// }
