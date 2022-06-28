import axios from "axios";
import {
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  UPDATE_POST_LIKES,
} from "../../Constants/postConstants";
import { setAlert } from "../alert";

/**
 *  @param {string} postId
 *  @desc Likes a post if the user has not liked it yet. will unlike if the user has already liked it.
 *  @returns {object} - Returns an object with the post and the user who liked it.
 *
 */
export const likePost = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST });

    const { data } = await axios.put(`/api/posts/${postId}/like`);

    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data.post,
    });
    dispatch({
      type: UPDATE_POST_LIKES,
      payload: { postId: data.post._id, post: data.post },
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: POST_UPDATE_FAIL,
      payload: message,
    });
    dispatch(setAlert(message, "danger"));
  }
};
