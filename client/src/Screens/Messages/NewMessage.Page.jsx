import React, { useEffect, useState } from "react";
import "./NewMessage.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row } from "react-bootstrap";
import Meta from "../../Components/Meta";
import Loader from "../../Components/Loader/Loader";
import { getUsers } from "../../Actions/User/getUsers";
import UserItem from "../../Components/UserItem/UserItem";
import { CLEAR_USERS } from "../../Constants/userConstants";
import { createChat } from "../../Actions/chat/createChat";
import { setAlert } from "../../Actions/alert";
import { useNavigate } from "react-router-dom";

const NewMessage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // component state
  const [userToSearchBy, setUserToSearchBy] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [timer, setTimer] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // app state
  const {
    listUsers: { users, loading },
  } = useSelector((state) => state.user);
  const {
    createChat: { loading: loadingCreateChat, success, chat },
  } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  // function to handle the amount of users to chat with
  // this is function that creates an array of users to chat with
  const handleClick = async (selectedUser) => {
    if (selectedUsers.includes(selectedUser)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== selectedUser));
      setUserToSearchBy("");
      // set the focus back to the search bar and clear the value
      const input = await document.getElementById("userSearchTextbox");
      input.value = "";
      input.focus();
      dispatch({ type: CLEAR_USERS });
    } else {
      setSelectedUsers([...selectedUsers, selectedUser]);
      setUserToSearchBy("");
      const input = await document.getElementById("userSearchTextbox");
      input.value = "";
      input.focus();
      dispatch({ type: CLEAR_USERS });
    }
  };

  // implement the user search functionality here
  useEffect(() => {
    if (success) {
      navigate(`/dashboard/messages/inbox/${chat._id}`);
    }
    if (userToSearchBy !== "") {
      setTimer(null);
      setTimer(
        setTimeout(() => {
          dispatch(getUsers(userToSearchBy.trim()));
        }, 1000)
      );
    }
  }, [userToSearchBy, dispatch, selectedUsers, success, navigate, chat]);

  // create chat room
  const createChatRoom = async () => {
    if (selectedUsers.length > 0) {
      dispatch(createChat(selectedUsers));
    } else {
      dispatch(
        setAlert("Please select at least one user to chat with", "info ")
      );
    }
  };
  return (
    <Container className="chatPageContainer">
      <Meta title="Create New Chat" />
      <Row>
        <span className="titleContainer">
          <h1>New Message</h1>
        </span>
      </Row>
      {loadingCreateChat ? (
        <Loader />
      ) : (
        <>
          <div className="chatTitleBar">
            <label htmlFor="userSearchTextbox">To:</label>
            {/* output the selected users */}
            {selectedUsers &&
              selectedUsers.map((user) => (
                <span
                  key={user._id}
                  onClick={() => handleClick(user)}
                  className="selectedUser"
                >
                  {user.fullName}
                </span>
              ))}
            <input
              type="text"
              id="userSearchTextbox"
              placeholder="Type Name of Person you want to chat with"
              onKeyDown={(e) => {
                if (e.target.value === "" && e.key === "Backspace") {
                  // remove the last user from the selected users array
                  setSelectedUsers(selectedUsers.slice(0, -1));
                  // clear the userList state
                  dispatch({ type: CLEAR_USERS });
                }
              }}
              onChange={(e) => {
                setUserToSearchBy(e.target.value);
              }}
            />
          </div>
          <div className="resultsContainer">
            {loading ? (
              <Loader />
            ) : (
              <>
                {users &&
                  users
                    .filter((u) => u._id !== user._id)
                    .filter(
                      (u) => !selectedUsers.some((user) => user._id === u._id)
                    )
                    .map((u) => (
                      // check if the user is already selected and that the user isnt the current user
                      <div key={u._id} onClick={() => handleClick(u)}>
                        <UserItem
                          user={u}
                          loggedInUser={user}
                          showFollowButton={false}
                        />
                      </div>
                    ))}
              </>
            )}
          </div>
          <div className="buttonContainer">
            <Button
              id="createChatButton"
              disabled={selectedUsers.length === 0}
              onClick={createChatRoom}
            >
              Create Chat
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default NewMessage;
