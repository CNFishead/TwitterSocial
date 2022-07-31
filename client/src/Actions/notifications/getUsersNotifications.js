import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_FAILURE, GET_NOTIFICATIONS_SUCCESS } from "../../Constants/notificationContants";
import { errorHandler } from "../../utils/errorHandler";
import axios from "axios";

export const getUserNotifications =
  (unreadOnly = false) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_NOTIFICATIONS });
      /* make the axios call */
      const { data } = await axios.get(`/api/notifications?unreadOnly=${unreadOnly}`);
      dispatch({ type: GET_NOTIFICATIONS_SUCCESS, payload: data });
    } catch (error) {
      console.error(error);
      errorHandler(error, dispatch, GET_NOTIFICATIONS_FAILURE);
    }
  };
