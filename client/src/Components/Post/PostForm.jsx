import React from "react";
import "./index.css";
import { Button, Form, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

/**
 * @function PostForm - PostForm component
 * @desc                Shows a form to create a new post/comment/reply
 * @param {object} props - props passed from parent component
 * @param {function} props.submitHandler - function to handle submit event passed in from the parent of where the form is hosted.
 *
 * @returns {JSX} - JSX representation of component
 */
const PostForm = ({ children, user, submitHandler, isReply = false }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");

  useEffect(() => {}, [dispatch]);
  return (
    <div className="postFormContainer">
      <div className="userImageContainer">
        <Image src={user.profileImageUrl} alt="user" />
      </div>
      <div className="textareaContainer">
        <Form
          onSubmit={(e) => {
            submitHandler(e, text);
            setText("");
          }}
        >
          <Form.Group controlId="ControlTextarea1">
            <Form.Control
              as="textarea"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                isReply ? "Share your thoughts" : "What's happening?"
              }
              maxLength={280}
            />
          </Form.Group>
          <Form.Text className="text-end">{text.length}/280</Form.Text>
          <div className="buttonsContainer">
            {children}
            <Button
              id="submitPostButton"
              variant="primary"
              disabled={text.trim().length === 0}
              type="submit"
              className="postButton"
            >
              Tweet'r
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PostForm;
