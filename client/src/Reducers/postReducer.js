import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
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
        success: true,
        post: action.payload.post,
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

export const listPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_GET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [action.payload.post, ...state.posts],
      };
    case POST_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        posts: action.payload.posts,
      };
    case POST_GET_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
