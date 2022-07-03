import {
  CLEAR_SELECTED_POST,
  DELETE_POST,
  GET_SELECTED_POST,
  GET_SELECTED_POST_REQUEST,
  POST_ADD_COMMENT_FAIL,
  POST_ADD_COMMENT_REQUEST,
  POST_ADD_COMMENT_SUCCESS,
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_GET_FAIL,
  POST_GET_REQUEST,
  POST_GET_SUCCESS,
  POST_UPDATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  UPDATE_POST_LIKES,
  UPDATE_RETWEET_COUNT,
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

export const listPostsReducer = (state = { posts: [] }, action) => {
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
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload.postId),
      };
    case POST_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        posts: action.payload.posts,
      };
    case UPDATE_POST_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? // If match return the post, with updated amount of likes.
              { ...post, likes: action.payload.post.likes }
            : // else, return post
              post
        ),
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

export const updatePostReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ADD_COMMENT_REQUEST:
    case POST_UPDATE_REQUEST:
      return {
        ...state,
        success: false,
        loading: true,
      };
    case POST_ADD_COMMENT_SUCCESS:
    case POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        post: action.payload.post,
      };
    case POST_ADD_COMMENT_FAIL:
    case POST_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const postDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SELECTED_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SELECTED_POST:
      return {
        ...state,
        loading: false,
        post: action.payload.post || action.payload,
        replies: action.payload.replies || null,
      };
    case CLEAR_SELECTED_POST:
      return {
        ...state,
        loading: false,
        post: {},
      };
    default:
      return state;
  }
};
