import io from "socket.io-client";
import { SOCKET_CONNECT, SOCKET_CONNECT_ERROR, SOCKET_CONNECT_SUCCESS } from "../../Constants/socketConstants";
import { errorHandler } from "../../utils/errorHandler";

export const createConnection = () => async (dispatch, getState) => {
  try {
    // get the user from state
    const { user } = getState().auth;
    const {
      socketConnection: { socket, isConnecting },
    } = getState().socket;
    if (socket || isConnecting) return;
    dispatch({ type: SOCKET_CONNECT });
    const connection = io("/");
    await connection.on("connect", () => {
      dispatch({ type: SOCKET_CONNECT_SUCCESS, payload: connection });
      connection.emit("setup", user);
    });
  } catch (error) {
    errorHandler(error, dispatch, SOCKET_CONNECT_ERROR);
  }
};
