import { REMOVE_ALERT, SET_ALERT } from "../Constants/alertConstants";
import { REMOVE_NOTIFICATION_ALERT, SET_NOTIFICATION_ALERT } from "../Constants/notificationAlerConstants";

export const alert = (state = [], action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};

export const notificationAlertReducer = (state = [], action) => {
  switch (action.type) {
    case SET_NOTIFICATION_ALERT:
      return [...state, action.payload];
    case REMOVE_NOTIFICATION_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}