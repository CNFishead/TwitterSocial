import {
  CREATE_CHAT_FAILURE,
  CREATE_CHAT_REQUEST,
  CREATE_CHAT_SUCCESS,
  GET_CHATS_FAILURE,
  GET_CHATS_REQUEST,
  GET_CHATS_SUCCESS,
} from "../Constants/chatsConstants";

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
