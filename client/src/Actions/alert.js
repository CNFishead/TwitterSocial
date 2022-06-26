import { SET_ALERT, REMOVE_ALERT } from "../Constants/alertConstants";
import { v4 } from "uuid";

export const setAlert =
  (message, alertType, timeout = 5) =>
  (dispatch) => {
    const id = v4();
    dispatch({
      type: SET_ALERT,
      payload: { message, alertType, id },
    });

    setTimeout(
      () => dispatch({ type: REMOVE_ALERT, payload: id }),
      timeout * 1000
    );
  };
