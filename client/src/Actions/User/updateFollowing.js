import { setAlert } from "../alert";
import axios from "axios";
import {
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../../Constants/userConstants";
import { errorHandler } from "../../utils/errorHandler";

export const updateFollowing = (userToBeFollowed) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
      const { data } = await axios.put(
        `/api/users/${userToBeFollowed}/following`
      );
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data });
      dispatch(setAlert(data.message, "success"));
      // then we need to set the localStorage to the new updated user
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.reload();
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_USER_FAILURE);
    }
  };
};
