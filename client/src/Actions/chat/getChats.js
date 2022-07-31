import { GET_CHATS_FAILURE, GET_CHATS_REQUEST, GET_CHATS_SUCCESS } from "../../Constants/chatsConstants";
import { errorHandler } from "../../utils/errorHandler";
import axios from "axios";

export const getChats = (unreadOnly = false) => {
  return async (dispatch) => {
    dispatch({ type: GET_CHATS_REQUEST });
    try {
      const { data } = await axios.get(`/api/chat?unreadOnly=${unreadOnly}`);
      dispatch({ type: GET_CHATS_SUCCESS, payload: data.chats });
    } catch (error) {
      errorHandler(error, dispatch, GET_CHATS_FAILURE);
    }
  };
};
