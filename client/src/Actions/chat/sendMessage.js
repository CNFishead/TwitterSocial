import axios from "axios";
import {
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const sendMessage = (message, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SEND_MESSAGE_REQUEST });
      const { data } = await axios.post(`/api/chat/${id}/message`, {
        content: message,
      });
      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, SEND_MESSAGE_FAIL);
    }
  };
};
