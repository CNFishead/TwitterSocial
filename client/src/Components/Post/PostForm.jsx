import React from "react";
import { Image } from "react-bootstrap";

const PostForm = ({ user }) => {
  console.log(user);
  return (
    <div className="postFormContainer">
      <div className="userImageContainer">
        <Image src={user.profileImageUrl} alt="user" />
      </div>
    </div>
  );
};

export default PostForm;
