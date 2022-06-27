import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
} from "../../Constants/postConstants";
import { setAlert } from "../alert";

export const createPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: POST_CREATE_REQUEST });
    try {
      const { data } = await axios.post("/api/posts", post);
      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: POST_CREATE_FAIL,
        payload: message,
      });
      dispatch(setAlert(message, "danger"));
    }
  };
};
