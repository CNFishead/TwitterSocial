import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./ChangeProfilePicModal.css";
import Cropper from "cropperjs";
import Loader from "../../Loader/Loader";
import { setAlert } from "../../../Actions/alert";
import axios from "axios";
import { errorHandler } from "../../../utils/errorHandler";

/**
 * @description - Modal to change the users profile picture
 *
 * @param {function} props.handleClose - function to handle close event
 * @param {boolean} props.show - boolean to show/hide modal
 * @returns {JSX} - JSX representation of component
 *
 */
const ChangeProfilePicModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const [cropper, setCropper] = useState(false);
  const [cropperJS, setCropperJS] = useState(false);
  const [cropperCSS, setCropperCSS] = useState(false);
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
            "/api/upload/profilePic",
            formData,
            config
          );
          // set the localStorage user to the new user passed back from the server. and re login the user
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
      if (cropper) {
        // get the image and set it to the cropper
        setCropper(
          new Cropper(document.getElementById("preview"), {
            aspectRatio: 1 / 1,
            background: false,
          })
        );
      } else {
        dispatch(setAlert(`Photo selection failed`, "danger"));
      }
    };
    reader.readAsDataURL(file);
  };

  // need to add the cropperjs to the dom
  useEffect(() => {
    async function copperjs() {
      const script = document.createElement("script");
      script.id = "cropperjs";
      script.type = "text/javascript";
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js";
      script.async = true;
      script.onload = () => {
        setCropperJS(true);
        console.log("cropperjs loaded");
      };
      await document.body.appendChild(script);
    }
    async function croppercss() {
      const link = document.createElement("link");
      link.id = "croppercss";
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.css";
      link.async = true;
      link.onload = () => {
        setCropperCSS(true);
        console.log("croppercss loaded");
      };
      await document.body.appendChild(link);
    }
    copperjs();
    croppercss();
    if (cropperCSS && cropperJS) {
      setCropper(true);
    }
    return () => {
      document.body.removeChild(document.getElementById("cropperjs"));
      document.body.removeChild(document.getElementById("croppercss"));
      const i = document.getElementById("preview");
      if (i) {
        i.src = "";
      }
    };
  }, [cropperCSS, cropperJS]);
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(!show);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Profile Pic</Modal.Title>
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

export default ChangeProfilePicModal;
