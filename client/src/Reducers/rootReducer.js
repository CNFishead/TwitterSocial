import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import { createPostReducer } from "./postReducer";

const postReducers = combineReducers({
  createPost: createPostReducer,
});

export const rootReducer = combineReducers({
  // Alert reducer
  alert: alert,
  // Auth Reducers
  auth: authReducer,
  // Post Reducers
  post: postReducers,
});
