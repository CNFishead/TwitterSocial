import React from "react";
import "./ChatRoom.css";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChat } from "../../../Actions/chat/getChat";
import { FiSend } from "react-icons/fi";
import Meta from "../../../Components/Meta";
import TitleBar from "./components/TitleBar.subcomponent";
import { setAlert } from "../../../Actions/alert";
import Loader from "../../../Components/Loader/Loader";
import { updateChat } from "../../../Actions/chat/updateChat";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    selectedChat: { chat, loading },
  } = useSelector((state) => state.message);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // check if the chat is already in the store if not dispatch getChat
    if (!chat || chat.id !== id) {
      dispatch(getChat(id));
    }
  }, [dispatch, id]);

  const updateChatName = () => {
    // displays a prompt which gathers the chat name the user wants to change to
    // dispatches to update chat action to update the chat name
    const newChatName = prompt("Enter new chat name");
    if (newChatName) {
      dispatch(updateChat({ id, chatName: newChatName }));
      window.location.reload();
    } else {
      dispatch(setAlert("Please enter a chat name", "info"));
    }
  };
  return (
    <Container fluid className="chatPageContainer">
      <Meta
        title={
          chat
            ? `Chat | ${chat.users[0].firstName}, ${chat.users[1].firstName} ${
                chat.users.length > 2
                  ? `+ ${chat.users.length - 2} other users`
                  : ""
              }`
            : ``
        }
      />
      <Row>
        <span className="titleContainer">
          <h1>Chat</h1>
        </span>
      </Row>
      <div className="chatTitleBarContainer">
        {chat && (
          <>
            <TitleBar users={chat.users} user={user} />
            <span id="chatName" onClick={updateChatName}>
              {chat.chatName
                ? chat.chatName
                : `${chat.users[0].firstName}, ${chat.users[1].firstName} ${
                    chat.users.length > 2
                      ? `+ ${chat.users.length - 2} other users`
                      : ""
                  }`}
            </span>
          </>
        )}
      </div>
      <div className="mainContentContainer">
        <div className="chatContainer">
          {loading ? <Loader /> : <div className="chatMessages"></div>}
          <div className="footer">
            <textarea
              name="messageInput"
              placeholder="Type a message..."
            ></textarea>
            <FiSend className="sendMessageButton" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChatRoom;
