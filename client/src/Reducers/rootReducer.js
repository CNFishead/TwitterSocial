import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import {
  createChatReducer,
  getChatReducer,
  getChatsReducer,
} from "./chatReducer";
import { listMessagesReducer, sendMessageReducer } from "./messageReducer";
import {
  createPostReducer,
  deletePostReducer,
  listPostsReducer,
  postDetailsReducer,
  updatePostReducer,
} from "./postReducer";
import {
  listUsersReducer,
  selectedUserReducer,
  updateUserReducer,
} from "./userReducer";

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
  listUsers: listUsersReducer,
});

const chatReducers = combineReducers({
  createChat: createChatReducer,
  listChats: getChatsReducer,
  selectedChat: getChatReducer,
  // message reducers for the chat are handled here
  messages: sendMessageReducer,
  listMessages: listMessagesReducer,
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
  // Chat Reducers
  chat: chatReducers,
});
