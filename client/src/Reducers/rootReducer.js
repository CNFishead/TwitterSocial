import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import {
  createPostReducer,
  deletePostReducer,
  listPostsReducer,
  postDetailsReducer,
  updatePostReducer,
} from "./postReducer";
import { selectedUserReducer, updateUserReducer } from "./userReducer";

const postReducers = combineReducers({
  createPost: createPostReducer,
  listPosts: listPostsReducer,
  updatePost: updatePostReducer,
  selectedPost: postDetailsReducer,
  deletePost: deletePostReducer,
});

const userReducers = combineReducers({
  selectedUser: selectedUserReducer,
  updateUser: updateUserReducer,
});

export const rootReducer = combineReducers({
  // Alert reducer
  alert: alert,
  // Auth Reducers
  auth: authReducer,
  // Post Reducers
  post: postReducers,
  // User Reducers
  user: userReducers,
});
