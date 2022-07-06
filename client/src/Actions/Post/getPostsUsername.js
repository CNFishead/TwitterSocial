import axios from "axios";
import {
  CLEAR_POSTS,
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const getPostsUsername = (username) => async (dispatch) => {
  dispatch({ type: CLEAR_POSTS });
  dispatch({ type: POST_GET_REQUEST });
  try {
    const { data } = await axios.get(`/api/posts/user/${username}`);
    dispatch({ type: POST_GET_SUCCESS, payload: data });
  } catch (error) {
    errorHandler(error, dispatch, POST_GET_FAIL);
  }
};
