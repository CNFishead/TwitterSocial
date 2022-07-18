import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "../../Constants/authConstants";
import axios from "axios";
import { errorHandler } from "../../utils/errorHandler";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    console.log(data);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    await localStorage.setItem("user", JSON.stringify(data.user));
  } catch (error) {
    errorHandler(error, dispatch, USER_LOGIN_FAIL);
  }
};
