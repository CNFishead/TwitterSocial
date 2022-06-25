import axios from "axios";
import { setAlert } from "../actions/alert";
import {
  UPLOAD_IMAGE_FAIL,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
} from "../constants/uploadConstants";

export const uploadImage = (files) => async (dispatch) => {
  // files, is an array, since we have the ability to upload multiple
  // files we only want the first file.
  const file = files[0];
  const formData = new FormData();
  formData.append("file", file);
  //Triggers the Loader component
  dispatch({ type: UPLOAD_IMAGE_REQUEST });
  //This makes the request to the backend
  try {
    const config = {
      headers: {
        // Has to have the multipart/form-data!
        // Also only Admins can upload a file, need token
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/upload", formData, config);
    // console.log(data);
    //Once the post request is finished, setImage to data, setUploading to false, to remove Loader
    //Component
    dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: data.imageUrl });
    dispatch(setAlert(`Image uploaded successfully`, "success"));
  } catch (error) {
    console.error(error);
    dispatch({ type: UPLOAD_IMAGE_FAIL });
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setAlert(`Image did not upload: ${message}`, "danger"));
  }
};
