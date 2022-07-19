import axios from "axios";
import {
  GET_USERS_FAILURE,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../../Constants/userConstants";
import { errorHandler } from "../../utils/errorHandler";

export const getUsers =
  (keyword = "") =>
  async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST });
    try {
      const { data } = await axios.get(`/api/users?keyword=${keyword}`);
      dispatch({ type: GET_USERS_SUCCESS, payload: data });
    } catch (error) {
      errorHandler(error, dispatch, GET_USERS_FAILURE);
    }
  };
