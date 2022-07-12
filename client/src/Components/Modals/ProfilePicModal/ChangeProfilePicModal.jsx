import React, { useEffect, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./ChangeProfilePicModal.css";
import Cropper from "cropperjs";
import Loader from "../../Loader/Loader";
import { setAlert } from "../../../Actions/alert";

/**
 * @description - Modal to change the users profile picture
 *
 * @param {function} props.handleClose - function to handle close event
 * @param {boolean} props.show - boolean to show/hide modal
 * @returns {JSX} - JSX representation of component
 *
 */
const ChangeProfilePicModal = ({ show, handleClose, setShow }) => {
  const dispatch = useDispatch();

  const [cropper, setCropper] = useState(false);
  const [cropperJS, setCropperJS] = useState(false);
  const [cropperCSS, setCropperCSS] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (e, reply) => {
    e.preventDefault();
    setShow(!show);
  };

  const filePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const i = document.getElementById("preview");
      i.src = e.target.result;
      // now we can work with cropper
      if (cropper) {
        // get the image and set it to the cropper
        const cropper = new Cropper(document.getElementById("preview"), {
          aspectRatio: 1 / 1,
          background: false,
        });
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Pic</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="imagePreviewContainer">
          <img id="preview" />
        </div>
        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            id="image-file"
            label="Choose File"
            onChange={filePhotoChange}
          ></Form.Control>
          {uploading && <Loader />}
        </Form.Group>
        <Form.Text>
          If you need to change images, you'll need to close the Modal and
          reselect the image you want to upload.
        </Form.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
