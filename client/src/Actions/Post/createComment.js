import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";
import { setAlert } from "../alert";

export const createComment = (postId, reply) => {
  return async (dispatch) => {
    dispatch({ type: POST_CREATE_REQUEST });
    try {
      const { data } = await axios.put(`/api/posts/${postId}/comment`, {
        text: reply,
      });
      // Success sends back a post object with the new comment
      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
      dispatch(setAlert(`Comment added`, "info"));
      window.location.reload();
    } catch (error) {
      errorHandler(error, dispatch, POST_CREATE_FAIL);
    }
  };
};
