import { errorHandler } from "../../utils/errorHandler";

export const userTyping = (chatId) => (dispatch, getState) => {
  try {
    const {
      socketConnection: { socket },
    } = getState().socket;
    if (socket) {
      socket.emit("typing", chatId);
    }
  } catch (error) {
    errorHandler(error, dispatch);
  }
};
