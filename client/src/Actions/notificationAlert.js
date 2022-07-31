import { v4 } from "uuid";
import { REMOVE_NOTIFICATION_ALERT, SET_NOTIFICATION_ALERT } from "../Constants/notificationAlerConstants";

export const notificationAlert =
  (notification, alertType, timeout = 5) =>
  (dispatch) => {
    const id = v4();
    dispatch({
      type: SET_NOTIFICATION_ALERT,
      payload: { notification, alertType, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_NOTIFICATION_ALERT, payload: id }), timeout * 1000);
  };
