import axios from "axios";
import {
  UPDATE_CHAT_FAILURE,
  UPDATE_CHAT_REQUEST,
  UPDATE_CHAT_SUCCESS,
} from "../../Constants/chatsConstants";
import { errorHandler } from "../../utils/errorHandler";

export const updateChat = (chat) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_CHAT_REQUEST });
    try {
      const { data } = await axios.put(`/api/chat/${chat.id}`, chat);
      dispatch({ type: UPDATE_CHAT_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, UPDATE_CHAT_FAILURE);
    }
  };
};
