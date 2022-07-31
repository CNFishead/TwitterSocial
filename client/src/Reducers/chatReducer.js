import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  GET_CHATS_FAILURE,
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
  GET_CHAT_FAILURE,
  GET_CHAT_REQUEST,
  GET_CHAT_SUCCESS,
  UPDATE_CHAT_CLEAR,
  UPDATE_CHAT_FAILURE,
  UPDATE_CHAT_REQUEST,
  UPDATE_CHAT_SUCCESS,
} from "../Constants/chatsConstants";
import { SEND_MESSAGE_SUCCESS } from "../Constants/postConstants";

// create chat reducer
export const createChatReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chat: action.payload,
      };
    case CREATE_CHAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// get chats reducer
export const getChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CHATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHATS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chats: action.payload,
      };
    case GET_CHATS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getChatReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chat: action.payload.chat,
        messages: action.payload.messages,
      };
    case GET_CHAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SEND_MESSAGE_SUCCESS:
      if (
        !state.messages.some((message) => message._id === action.payload._id)
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      }
      return state;

    default:
      return state;
  }
};

export const updateChatReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CHAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_CHAT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        chat: action.payload,
      };
    case UPDATE_CHAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_CHAT_CLEAR:
      return {};
    default:
      return state;
  }
};
