import { combineReducers } from "redux";
import { alert } from "./alertReducer";
import { authReducer } from "./authReducer";

export const rootReducer = combineReducers({
  // Alert reducer
  alert: alert,
  // Auth Reducers
  auth: authReducer,
});
