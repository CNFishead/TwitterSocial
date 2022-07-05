import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../../Constants/userConstants";
import { setAlert } from "../alert";

/**
 *  @desc Get a user from the username
 *  @param {string} username
 *  @returns {object} user
 *  @throws {Error}
 *
 */
export const getUserUsername = (username) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_USER_REQUEST });
      const res = await axios.get(`/api/users/username/${username}`);
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: GET_USER_FAILURE,
        payload: message,
      });
      dispatch(setAlert(message, "danger"));
    }
  };
};
