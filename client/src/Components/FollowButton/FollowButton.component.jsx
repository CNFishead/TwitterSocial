import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateFollowing } from "../../Actions/User/updateFollowing";
import { emitNotification } from "../../utils/emitNotification";

/**
 * @description - FollowButton component, made to be reused anywhere a follow button is needed
 * @param {user} user - the user logged in
 * @param {user} userToFollow - the user to follow/unfollow
 *
 * @returns {JSX} - FollowButton component
 */
const FollowButton = ({ user, userToFollow, socket = null }) => {
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(updateFollowing(userToFollow._id));
    if (!socket) return;
    emitNotification(userToFollow._id, user, socket);
  };
  return (
    <Link to="#" className={`${user.following.includes(userToFollow._id) && `active`} followButton`} onClick={handleFollow}>
      {user.following.includes(userToFollow._id) ? "Following" : "Follow"}
    </Link>
  );
};

export default FollowButton;
