import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserUsername } from "../../Actions/Post/getUserUsername";
import { BsEnvelope } from "react-icons/bs";
import "./ProfileScreen.css";
import Meta from "../../Components/Meta";

const ProfileScreen = () => {
  // utility
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useParams();

  // set a user to be viewed, if param username is undefined it'll be the current user
  const [profile, setProfile] = useState(undefined);

  // app state
  const { user } = useSelector((state) => state.auth);
  const {
    selectedUser: { user: selectedUser },
  } = useSelector((state) => state.user);

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
  }, [dispatch, profile, selectedUser]);
  return (
    <>
      {profile && (
        <>
          <Meta title={`Tweetr | ${profile.firstName}'s Profile`} />
          <Container fluid>
            <Container className="profileHeaderContainer" fluid>
              <div className="coverPhotoContainer">
                <div className="userImageContainer">
                  <Image
                    src={profile.profileImageUrl}
                    alt="user-profile-image"
                    fluid
                  />
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
                    <Link
                      to="#"
                      className={`${
                        false ? "following active" : ""
                      } followButton`}
                    >
                      {false ? "Following" : "Follow"}
                    </Link>
                  </>
                )}
              </div>
              <div className="userDetailsContainer">
                <span className="displayName">{profile.fullName}</span>
                <span className="username">@{profile.username}</span>
                <span className="description">{profile.description}</span>
                <div className="followersContainer">
                  <Link to={`/dashboard/profile/${profile.username}/following`}>
                    <span className="value">0</span>
                    <span className="label">Following</span>
                  </Link>
                  <Link to={`/dashboard/profile/${profile.username}/followers`}>
                    <span className="value">0</span>
                    <span className="label">Followers</span>
                  </Link>
                </div>
              </div>
            </Container>
          </Container>
        </>
      )}
    </>
  );
};

export default ProfileScreen;
