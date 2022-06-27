import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
} from "../Constants/postConstants";

export const createPostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case POST_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
