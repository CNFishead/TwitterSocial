import { combineReducers } from "redux";
import {
  CLEAR_NOTIFICATIONS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_SUCCESS,
} from "../Constants/notificationContants";
import { notificationAlertReducer } from "./alertReducer";

// get notifications
export const listNotificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };
    case GET_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_NOTIFICATIONS:
      return state;
    default:
      return state;
  }
};

// combine the reducers
export const notificationReducers = combineReducers({
  alerts: notificationAlertReducer,
  listNotifications: listNotificationsReducer,
});
