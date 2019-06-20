// import storage from '../core/storage';
import { DrinkingActionType } from "../actionTypes";
import AppDate from "../../core/AppDate";
import Drinking from "../../core/Drinking";

const drinkingReducer = (
  state = Drinking.getAllDays(),
  action: { type: string; payload: any }
) => {
  const currentDay = AppDate.formatCurrentDay();

  switch (action.type) {
    case DrinkingActionType.INIT_DRINKING:
      const todayAmount = Object.entries(action.payload)[0];
      return { ...state, ...{ [todayAmount[0]]: todayAmount[1] } };

    case DrinkingActionType.CHANGE_DRINK_AMOUNT:
      return { ...state, ...{ [currentDay]: action.payload } };
    default:
      return state;
  }
};

export default drinkingReducer;

export interface DrinkingState {}
