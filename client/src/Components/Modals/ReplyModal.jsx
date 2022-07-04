import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createComment } from "../../Actions/Post/createComment";
import PostForm from "../Post/PostForm";
import PostItem from "../Post/PostItem";

/**
 * @description - ReplyModal component is used to create a comment on a post
 *
 * @param {Object} props
 * @param {Object} props.post - post object
 * @param {Object} props.user - user object
 * @param {function} props.handleClose - function to handle close event
 * @param {boolean} props.show - boolean to show/hide modal
 * @param {function} props.setShow - function to set show/hide modal
 * @returns {JSX} - JSX representation of component
 *
 */
const ReplyModal = ({ show, handleClose, post, user, setShow }) => {
  const dispatch = useDispatch();

  const handleSubmit = (e, reply) => {
    e.preventDefault();
    dispatch(createComment(post._id, reply));
    setShow(!show);
  };

  return (
    <Modal show={show} onHide={handleClose} size={"lg"}>
      {post && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostItem post={post} />
            <PostForm user={user} submitHandler={handleSubmit} isReply={true}>
              <Button
                className="button"
                variant="secondary"
                onClick={handleClose}
                style={{ display: "inline" }}
              >
                Close
              </Button>
            </PostForm>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ReplyModal;
