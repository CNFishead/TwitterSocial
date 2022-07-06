import axios from "axios";
import {
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const getPosts = () => async (dispatch) => {
  dispatch({ type: POST_GET_REQUEST });
  try {
    const { data } = await axios.get("/api/posts");
    dispatch({ type: POST_GET_SUCCESS, payload: data });
  } catch (error) {
    errorHandler(error, dispatch, POST_GET_FAIL);
  }
};
