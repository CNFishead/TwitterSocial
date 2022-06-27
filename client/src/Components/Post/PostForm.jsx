import React from "react";
import "./index.css";
import { Button, Form, Image } from "react-bootstrap";
import { createPost } from "../../Actions/Post/createPost";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const PostForm = ({ user }) => {
  const dispatch = useDispatch();
  const [text, setText] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ text }));
    setText("");
  };
  useEffect(() => {}, [dispatch]);
  return (
    <div className="postFormContainer">
      <div className="userImageContainer">
        <Image src={user.profileImageUrl} alt="user" />
      </div>
      <div className="textareaContainer">
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="ControlTextarea1">
            <Form.Control
              as="textarea"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              maxLength={280}
            />
          </Form.Group>
          <Form.Text className="text-end">{text.length}/280</Form.Text>
          <div className="buttonsContainer">
            <Button
              id="submitPostButton"
              variant="primary"
              disabled={text.trim().length === 0}
              type="submit"
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
