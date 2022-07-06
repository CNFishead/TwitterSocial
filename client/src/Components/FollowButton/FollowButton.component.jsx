import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateFollowing } from "../../Actions/User/updateFollowing";
import styles from "./FollowButton.module.css";

/**
 * @description - FollowButton component, made to be reused anywhere a follow button is needed
 * @param {user} user - the user logged in
 * @param {user} userToFollow - the user to follow/unfollow
 *
 * @returns {JSX} - FollowButton component
 */
const FollowButton = ({ user, userToFollow }) => {
  const dispatch = useDispatch();
  const handleFollow = () => {
    dispatch(updateFollowing(userToFollow._id));
  };
  return (
    <Link
      to="#"
      className={`${
        user.following.includes(userToFollow._id) && styles.active
      } followButton`}
      onClick={handleFollow}
    >
      {user.following.includes(userToFollow._id) ? "Following" : "Follow"}
    </Link>
  );
};

export default FollowButton;
