import React from "react";
import { AiFillWarning } from "react-icons/ai";
/**
 * @desc This component is used to display a message when there is no content in a post.
 *       this can happen because a post a user is replying to has been deleted, or if the post is empty.
 *
 * @returns {JSX}
 *
 */
const NoContent = () => {
  return (
    <div className="post">
      <h3>
        <AiFillWarning /> Sorry, this content isn't available right now
      </h3>
      <hr />
      <p style={{ fontSize: ".8rem" }}>
        This content might have been removed or is now hidden by the owner.
      </p>
    </div>
  );
};

export default NoContent;
