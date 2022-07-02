import React from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import PostItem from "../Post/PostItem";

const ReplyModal = ({ show, handleClose, post, user }) => {
  const [text, setText] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      {post && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>Reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PostItem post={post} />
            <div className="postFormContainer">
              <div className="userImageContainer">
                <Image src={user.profileImageUrl} alt="user" />
              </div>
              <div className="textareaContainer">
                <Form>
                  <Form.Group controlId="ControlTextarea1">
                    <Form.Control
                      as="textarea"
                      name="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Reply Tweetr"
                      maxLength={280}
                    />
                  </Form.Group>
                  <Form.Text className="text-end">{text.length}/280</Form.Text>
                </Form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="buttonsContainer">
            <Button
              className="postButton"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              id="submitReplyButton"
              variant="primary"
              className="postButton"
              disabled={text.trim().length === 0}
              onClick={handleSubmit}
            >
              Reply
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ReplyModal;
