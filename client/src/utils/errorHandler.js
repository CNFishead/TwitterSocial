import { setAlert } from "../Actions/alert";
import { logout } from "../Actions/Auth/logout";

/**
 * @description - This function is used to handle errors in the client application.
 *
 * @param {Error} error - The error object
 * @param {Utility} dispatch - The dispatch function
 * @param {String} constant - The constant to be used in the reducer
 */
export const errorHandler = (error, dispatch, constant) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  if (message === "Not authorized, token failed") {
    dispatch(logout());
  }
  dispatch({
    type: constant,
    payload: message,
  });
  dispatch(setAlert(message, "danger"));
};