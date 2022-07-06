import axios from "axios";
import {
  CLEAR_SELECTED_POST,
  GET_SELECTED_POST,
  GET_SELECTED_POST_REQUEST,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const getPost = (postId) => async (dispatch) => {
  dispatch({ type: GET_SELECTED_POST_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/${postId}`);
    dispatch({ type: GET_SELECTED_POST, payload: data });
  } catch (error) {
    errorHandler(error, dispatch, CLEAR_SELECTED_POST);
  }
};
