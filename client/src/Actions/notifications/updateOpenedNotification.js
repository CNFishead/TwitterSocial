import axios from "axios";
import { GET_NOTIFICATIONS_FAILURE } from "../../Constants/notificationContants";
import { errorHandler } from "../../utils/errorHandler";
import { setAlert } from "../alert";

export const updateOpenedNotification =
  (notificationId = null) =>
  async (dispatch) => {
    try {
      await axios.put(`/api/notifications/${notificationId ? notificationId + "/open" : "all"}`);

      if (!notificationId) {
        dispatch(setAlert("All notifications have been marked as read", "success"));
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      errorHandler(error, dispatch, GET_NOTIFICATIONS_FAILURE);
    }
  };
