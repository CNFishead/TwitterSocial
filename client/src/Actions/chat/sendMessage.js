import axios from "axios";
import { SEND_MESSAGE_FAIL, SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from "../../Constants/postConstants";
import { errorHandler } from "../../utils/errorHandler";

export const sendMessage = (message, chat) => {
  return async (dispatch, getState) => {
    try {
      const {
        socketConnection: { socket },
      } = getState().socket;
      dispatch({ type: SEND_MESSAGE_REQUEST });
      const { data } = await axios.post(`/api/chat/${chat._id}/message`, {
        content: message,
      });
      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
      if (socket) {
        socket.emit("sendNewMessage", { chat: chat, message: data });
      }
    } catch (error) {
      errorHandler(error, dispatch, SEND_MESSAGE_FAIL);
    }
  };
};
