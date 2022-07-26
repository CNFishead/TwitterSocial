import axios from "axios";
import {
  GET_CHAT_FAILURE,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
} from "../../Constants/chatsConstants";
import { errorHandler } from "../../utils/errorHandler";

export const getChat = (id) => {
  return (dispatch) => {
    dispatch({ type: GET_CHAT_REQUEST });
    return axios
      .get(`/api/chat/${id}`)
      .then((response) => {
        dispatch({ type: GET_CHAT_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        errorHandler(error, dispatch, GET_CHAT_FAILURE);
      });
  };
};
