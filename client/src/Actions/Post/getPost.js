import axios from "axios";
import {
  CLEAR_SELECTED_POST,
  GET_SELECTED_POST,
  GET_SELECTED_POST_REQUEST,
} from "../../Constants/postConstants";
import { setAlert } from "../alert";

export const getPost = (postId) => async (dispatch) => {
  dispatch({ type: GET_SELECTED_POST_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/${postId}`);
    dispatch({ type: GET_SELECTED_POST, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CLEAR_SELECTED_POST });
    dispatch(setAlert(message, "danger"));
  }
};
