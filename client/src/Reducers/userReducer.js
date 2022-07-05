import {
  CLEAR_SELECTED_USER,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
} from "../Constants/userConstants";

/**
 * @description - selectedUserReducer is used to get the user by username.
 * @param {string} username - The username of the user.
 */
export const selectedUserReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user || action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_SELECTED_USER:
      return {};
    default:
      return state;
  }
};
