import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";
import { createChatReducer, getChatReducer, getChatsReducer } from "./chatReducer";
import { listMessagesReducer, sendMessageReducer } from "./messageReducer";
import { notificationReducers } from "./notificationReducer";
import { createPostReducer, deletePostReducer, listPostsReducer, postDetailsReducer, updatePostReducer } from "./postReducer";
import { socketConnectReducer } from "./socketReducer";
import { listUsersReducer, selectedUserReducer, updateUserReducer } from "./userReducer";

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

const socketReducers = combineReducers({
  socketConnection: socketConnectReducer,
});

export const rootReducer = combineReducers({
  // notifications
  notifications: notificationReducers,
  // socket
  socket: socketReducers,
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
