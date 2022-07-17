import React, { useEffect } from "react";
import styles from "./ProfileScreen.module.css";
import { useState } from "react";
import { Container, Image, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserUsername } from "../../Actions/Post/getUserUsername";
import { BsEnvelope } from "react-icons/bs";
import "./ProfileScreen.css";
import Meta from "../../Components/Meta";
import TweetsView from "./views/TweetsView.view";
import Replies from "./views/Replies.View";
import FollowButton from "../../Components/FollowButton/FollowButton.component";
import ChangeProfilePicModal from "../../Components/Modals/ProfilePicModal/ChangeProfilePicModal";
import { AiFillCamera } from "react-icons/ai";
import ChangeCoverPhotoModal from "../../Components/Modals/CoverPhotoModal/ChangeCoverPhotoModal";
const ProfileScreen = () => {
  // utility
  const dispatch = useDispatch();
  const { username } = useParams();

  // set a user to be viewed, if param username is undefined it'll be the current user
  const [profile, setProfile] = useState(undefined);
  const [view, setView] = useState("tweets");
  const [showModal, setShowModal] = useState(false);
  const [showCoverPhotoModal, setShowCoverPhotoModal] = useState(false);

  // app state
  const { user } = useSelector((state) => state.auth);
  const {
    selectedUser: { user: selectedUser },
  } = useSelector((state) => state.user);

  const handleClose = () => setShowModal(false);

  // useEffect
  useEffect(() => {
    if (!username) {
      setProfile(user);
    } else {
      // get user from api
      // set profile to user
      if (!selectedUser || selectedUser.username !== username) {
        dispatch(getUserUsername(username));
      } else {
        setProfile(selectedUser);
      }
    }
  }, [dispatch, profile, selectedUser, username, user]);
  return (
    <>
      {profile && (
        <>
          <ChangeProfilePicModal
            show={showModal}
            setShow={setShowModal}
            handleClose={handleClose}
          />
          <ChangeCoverPhotoModal
            show={showCoverPhotoModal}
            setShow={setShowCoverPhotoModal}
          />
          <Meta title={`Tweetr | ${profile.firstName}'s Profile`} />
          <Container className="profileHeaderContainer" fluid>
            <div className="coverPhotoSection">
              <div className="coverPhotoContainer">
                <Image
                  src={profile.coverPhoto}
                  alt="user-profile-image"
                  fluid
                />
                {/* check if logged in user is the one viewing profile */}
                {user && user._id === profile._id && (
                  <AiFillCamera
                    onClick={() => setShowCoverPhotoModal(!showCoverPhotoModal)}
                    className="coverPhotoButton"
                  />
                )}
              </div>
              <div className="userImageContainer">
                <Image
                  src={profile.profileImageUrl}
                  alt="user-profile-image"
                  fluid
                />
                {/* check if logged in user is the one viewing profile */}
                {user && user._id === profile._id && (
                  <AiFillCamera
                    onClick={() => setShowModal(!showModal)}
                    className="profilePicButton"
                  />
                )}
              </div>
            </div>
            <div className="profileButtonsContainer">
              {profile._id !== user._id && (
                <>
                  <Link
                    to={`/messages/${profile._id}`}
                    className="profileButton"
                  >
                    <BsEnvelope />
                  </Link>

                  <FollowButton user={user} userToFollow={profile} />
                </>
              )}
            </div>
            <div className="userDetailsContainer">
              <span className="displayName">{profile.fullName}</span>
              <span className="username">@{profile.username}</span>
              <span className="description">{profile.description}</span>
              <div className="followersContainer">
                <Link to={`/dashboard/profile/${profile.username}/following`}>
                  <span className="value">{profile.following.length}</span>
                  <span className="label">Following</span>
                </Link>
                <Link to={`/dashboard/profile/${profile.username}/followers`}>
                  <span className="value">{profile.followers.length}</span>
                  <span className="label">Followers</span>
                </Link>
              </div>
            </div>
          </Container>
          <Container fluid className="tabsContainer">
            <Nav variant="tabs" defaultActiveKey={view}>
              <Nav.Item
                onClick={() => setView("tweets")}
                className={`tab ${view === "tweets" && "active"}`}
              >
                Tweets
              </Nav.Item>
              <Nav.Item
                onClick={() => setView("replies")}
                className={`tab ${view === "replies" && "active"}`}
              >
                Replies
              </Nav.Item>
            </Nav>
          </Container>
          <Container fluid className="profileContentContainer">
            {view === "tweets" && <TweetsView user={profile} />}
            {view === "replies" && <Replies user={profile} />}
          </Container>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
