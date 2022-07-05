import axios from "axios";
import {
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
} from "../../Constants/postConstants";
import { setAlert } from "../alert";

export const getPostsUsername = (username) => async (dispatch) => {
  dispatch({ type: POST_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/user/${username}`);
    dispatch({ type: POST_GET_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: POST_GET_FAIL, payload: message });
    dispatch(setAlert(message, "danger"));
  }
};
