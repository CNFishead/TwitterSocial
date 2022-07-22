import axios from "axios";
import {
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const getPosts =
  (followingOnly = true, search = false, keyword = "") =>
  async (dispatch) => {
    dispatch({ type: POST_GET_REQUEST });
    try {
      const url = search ? `/api/posts/post-search/search` : "/api/posts";
      const { data } = await axios.get(
        `${url}?followingOnly=${followingOnly}&keyword=${keyword}`
      );
      dispatch({ type: POST_GET_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, POST_GET_FAIL);
    }
  };
