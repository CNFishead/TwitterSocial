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
import { sendMessage } from "../../../Actions/chat/sendMessage";
import MessageItem from "../../../Components/messageItem/MessageItem.component";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    selectedChat: { chat, loading, messages },
  } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = React.useState("");
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

  const sendMsg = (e, message) => {
    // prevents the page from refreshing when the user presses enter
    e.preventDefault();
    // trim the message to remove whitespace
    const trimmedMessage = message.trim();
    // if the message is not empty
    if (trimmedMessage) {
      // dispatch the send message action
      dispatch(sendMessage(trimmedMessage, chat._id));
      // get the textarea element and clear it
      const textarea = document.getElementsByClassName("messageInput")[0];
      textarea.value = "";
      // scroll to the bottom of the chat
      const c = document.getElementsByClassName("chatContainer")[0];
      c.scrollTop = c.scrollHeight;
      // focus the textarea
      textarea.focus();
      // reset the message
      setMessage("");
    } else {
      // if the message is empty
      dispatch(setAlert("Please enter a message", "info"));
    }
  };

  return (
    <Container fluid className="chatPageContainer">
      <Meta
        title={
          chat
            ? chat.chatName
              ? `Chat | ${chat.chatName}`
              : `Chat | ${chat.users[0].firstName}, ${
                  chat.users[1].firstName
                } ${
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
                    chat.users.length > 3
                      ? `+ ${chat.users.length - 2} other users`
                      : ""
                  }`}
            </span>
          </>
        )}
      </div>
      <div className="mainContentContainer">
        <div className="chatContainer">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="chatMessages">
                {messages &&
                  messages.map((message, indx) => {
                    // get the last messasge in the chat, and set the lastSenderId to that message.sender._id
                    const lastMessage = messages[indx - 1];
                    let lastSenderId = lastMessage
                      ? lastMessage.sender._id
                      : null;

                    return (
                      <MessageItem
                        key={message._id}
                        message={message}
                        user={user}
                        nextMessage={messages[indx + 1]}
                        lastSenderId={lastSenderId}
                      />
                    );
                  })}
                {/* dummy div to scroll to bottom of container */}
              </div>
              <div id="bottomChatContainer"></div>
            </>
          )}
          <div className="footer">
            <textarea
              name="message"
              className="messageInput"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  sendMsg(e, message);
                }
              }}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            ></textarea>
            <FiSend
              className="sendMessageButton"
              onClick={(e) => sendMsg(e, message)}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChatRoom;
