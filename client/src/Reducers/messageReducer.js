import {
  GET_MESSAGES_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "../Constants/postConstants";

// send message reducer
export const sendMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// list messages reducer
export const listMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        messages: action.payload,
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
