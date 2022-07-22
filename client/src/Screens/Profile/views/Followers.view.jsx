import React, { useEffect, useState } from "react";
import { Container, Image, Nav } from "react-bootstrap";
import { BsEnvelope } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserUsername } from "../../../Actions/Post/getUserUsername";
import FollowButton from "../../../Components/FollowButton/FollowButton.component";
import Meta from "../../../Components/Meta";
import UserItem from "../../../Components/UserItem/UserItem";

const Followers = () => {
  // utility
  const dispatch = useDispatch();
  const { username, view: v } = useParams();

  // set a user to be viewed, if param username is undefined it'll be the current user
  const [profile, setProfile] = useState(undefined);
  const [view, setView] = useState(v);

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
  }, [dispatch, profile, selectedUser, username, user]);
  return (
    <>
      {profile && (
        <>
          <Meta title={`Tweetr | ${profile.firstName}'s Followers`} />
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

                  <FollowButton user={user} userToFollow={profile} />
                </>
              )}
            </div>
            <div className="userDetailsContainer">
              <span className="displayName">{profile.fullName}</span>
              <span className="username">@{profile.username}</span>
              <span className="description">{profile.description}</span>
            </div>
            <Container fluid className="tabsContainer">
              <Nav variant="tabs" defaultActiveKey={view}>
                <Nav.Item
                  onClick={() => setView("following")}
                  className={`tab ${view === "following" && "active"}`}
                >
                  Following {profile.following.length}
                </Nav.Item>
                <Nav.Item
                  onClick={() => setView("followers")}
                  className={`tab ${view === "followers" && "active"}`}
                >
                  Followers {profile.followers.length}
                </Nav.Item>
              </Nav>
            </Container>
            <Container>
              {view === "following" && (
                <Container fluid className="followingContainer">
                  {profile.following.map((user) => (
                    <UserItem
                      key={user._id}
                      user={user}
                      showFollowButton={false}
                    />
                  ))}
                </Container>
              )}
              {view === "followers" && (
                <Container fluid className="followersContainer">
                  {profile.followers.map((u) => (
                    <UserItem key={u._id} user={u} loggedInUser={user} showFollowButton={true}/>
                  ))}
                </Container>
              )}
            </Container>
          </Container>
        </>
      )}
    </>
  );
};

export default Followers;
