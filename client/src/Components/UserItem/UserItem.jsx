import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import FollowButton from "../FollowButton/FollowButton.component";
import styles from "./UserItem.module.css";

/**
 * @description - UserItem component, made to be reused anywhere a user item is needed
 *
 * @param {Object} user - the user to display
 * @param {Object} loggedInUser - user logged in
 * @param {Boolean} showFollowButton - whether or not to show the follow button
 * @returns {JSX} - UserItem component
 */
const UserItem = ({ user, loggedInUser, showFollowButton = true }) => {
  return (
    <Container className={styles.container}>
      <div className={styles.userImageContainer}>
        <Image src={user.profileImageUrl} alt="user-profile-image" fluid />
      </div>
      <div className={styles.userDetailsContainer}>
        <div className={styles.header}>
          <span className="username">
            <Link to={`/dashboard/profile/${user.username}`}>
              @{user.username}
            </Link>
          </span>
          <div className={styles.name}>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>
      {showFollowButton && user._id !== loggedInUser._id && (
        <FollowButton user={loggedInUser} userToFollow={user} />
      )}
    </Container>
  );
};

export default UserItem;
