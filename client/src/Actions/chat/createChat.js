import axios from "axios";
import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
} from "../../Constants/chatsConstants";
import { errorHandler } from "../../utils/errorHandler";

export const createChat = (users) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_CHAT_REQUEST });
    try {
      const { data } = await axios.post(`/api/chat`, { users });
      dispatch({ type: CREATE_CHAT_SUCCESS, payload: data.chat });
    } catch (error) {
      errorHandler(error, dispatch, CREATE_CHAT_FAILURE);
    }
  };
};
