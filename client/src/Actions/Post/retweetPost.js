import axios from "axios";
import {
  DELETE_POST,
  POST_CREATE_SUCCESS,
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
export const retweet = (postId) => async (dispatch, getState) => {
  try {
    dispatch({ type: POST_UPDATE_REQUEST });

    const { data } = await axios.post(`/api/posts/${postId}/retweet`);
    console.log(data);
    // postId isnt sent with a retweet
    if (data.post && !data.postId) {
      dispatch({ type: POST_CREATE_SUCCESS, payload: data });
      dispatch(setAlert("Post Retweeted!", "success"));
    } else {
      // dispatch delete post to remove the post from the feed.
      dispatch({ type: DELETE_POST, payload: { postId: data.postId } });
      dispatch({ type: POST_UPDATE_SUCCESS, payload: data.post });
      dispatch(setAlert("Post Deleted!", "danger"));
    }
    // scroll the window to the top
    window.scrollTo(0, 0);
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
