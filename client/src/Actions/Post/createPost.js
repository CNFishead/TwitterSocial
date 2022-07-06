import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const createPost = (post) => {
  return async (dispatch) => {
    dispatch({ type: POST_CREATE_REQUEST });
    try {
      const { data } = await axios.post("/api/posts", post);
      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, POST_CREATE_FAIL);
    }
  };
};
