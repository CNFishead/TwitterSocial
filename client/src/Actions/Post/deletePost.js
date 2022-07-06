import {
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
} from "../../Constants/postConstants";
import { setAlert } from "../alert";
import axios from "axios";
import { errorHandler } from "../../utils/errorHandler";

export const deletePost = (postId) => async (dispatch) => {
  try {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch({ type: POST_DELETE_REQUEST });
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
        type: POST_DELETE_SUCCESS,
        payload: { postId },
      });
      dispatch(setAlert("Post Deleted", "success"));
    }
  } catch (error) {
    errorHandler(error, dispatch, POST_DELETE_FAIL);
  }
};
