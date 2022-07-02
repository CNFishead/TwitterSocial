import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import {
  createPostReducer,
  listPostsReducer,
  postDetailsReducer,
  updatePostReducer,
} from "./postReducer";

const postReducers = combineReducers({
  createPost: createPostReducer,
  listPosts: listPostsReducer,
  updatePost: updatePostReducer,
  selectedPost: postDetailsReducer,
});

export const rootReducer = combineReducers({
  // Alert reducer
  alert: alert,
  // Auth Reducers
  auth: authReducer,
  // Post Reducers
  post: postReducers,
});
