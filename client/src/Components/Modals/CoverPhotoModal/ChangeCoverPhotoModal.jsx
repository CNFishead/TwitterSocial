import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./ChangeCoverPhotoModal.css";
import Cropper from "cropperjs";
import Loader from "../../Loader/Loader";
import { setAlert } from "../../../Actions/alert";
import axios from "axios";
import { errorHandler } from "../../../utils/errorHandler";

/**
 * @description - Modal to change the users profile picture
 *
 * @param {boolean} props.show - boolean to show/hide modal
 * @returns {JSX} - JSX representation of component
 *
 */
const ChangeCoverPhotoModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [cropper, setCropper] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [filename, setFilename] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const canvas = await cropper.getCroppedCanvas();
      if (!canvas) {
        dispatch(
          setAlert("Could not upload image, please try again", "danger")
        );
        return;
      }
      // convert the canvas to a blob
      canvas.toBlob(async (blob) => {
        try {
          // create a form data object
          // add the blob to the form data object
          const formData = new FormData();
          await formData.append("croppedImage", blob);
          const config = {
            headers: {
              // Has to have the multipart/form-data!
              "Content-Type": "multipart/form-data",
              filename: filename,
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadPercentage(percentCompleted);
            },
          };
          //This makes the request to the backend
          // send the form data to the server
          setUploading(true);
          const { data } = await axios.post(
            "/api/upload/coverPhoto",
            formData,
            config
          );
          // set the localstorage user to the updated profile information
          localStorage.setItem("user", JSON.stringify(data.user));
          // reload the page
          window.location.reload();
        } catch (error) {
          errorHandler(error, dispatch);
          setUploading(false);
        }
      });
    } catch (error) {
      errorHandler(error, dispatch);
      setUploading(false);
    }
    setUploading(false);
    setShow(!show);
  };

  const filePhotoChange = (e) => {
    const file = e.target.files[0];
    // set the filename to the file name we will use this later to send to the server
    setFilename(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const i = document.getElementById("preview");
      i.src = e.target.result;
      // now we can work with cropper
        // get the image and set it to the cropper
        setCropper(
          new Cropper(document.getElementById("preview"), {
            aspectRatio: 16 / 9,
            background: false,
          })
        );
    };
    reader.readAsDataURL(file);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(!show);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Cover Photo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {uploading ? (
          <Loader progress={uploadPercentage} />
        ) : (
          <>
            <div className="imagePreviewContainer">
              <img id="preview" alt="preview-container" />
            </div>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                id="image-file"
                label="Choose File"
                onChange={filePhotoChange}
              ></Form.Control>
            </Form.Group>
            <Form.Text>
              If you need to change images, you'll need to close the Modal and
              reselect the image you want to upload.
            </Form.Text>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShow(!show);
          }}
        >
          Close
        </Button>

        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeCoverPhotoModal;
