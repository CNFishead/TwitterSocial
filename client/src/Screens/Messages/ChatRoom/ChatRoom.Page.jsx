import React from "react";
import "./ChatRoom.css";
import { useEffect } from "react";
import { Container, Image, Row } from "react-bootstrap";
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
import { SEND_MESSAGE_SUCCESS } from "../../../Constants/postConstants";
import { getChats } from "../../../Actions/chat/getChats";
import axios from "axios";

const ChatRoom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    selectedChat: { chat, loading, messages },
  } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const {
    socketConnection: { socket },
  } = useSelector((state) => state.socket);
  const [message, setMessage] = React.useState("");
  const [timer, setTimer] = React.useState(null);
  const [lastTypingTime, setLastTypingTime] = React.useState(Date);
  const [isTyping, setIsTyping] = React.useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on("stopTyping", () => {
      setIsTyping(false);
    });
    socket.on("typing", () => {
      setIsTyping(true);
    });
    socket.on("newMessage", (message) => {
      setIsTyping(false);
      dispatch({ type: SEND_MESSAGE_SUCCESS, payload: message });
    });
    return () => {
      socket.emit("leave", { chatId: id, user: user });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  useEffect(() => {
    // check if the chat is already in the store if not dispatch getChat
    if (!chat || chat.id !== id) {
      dispatch(getChat(id));
      if (!socket) return;
      socket.emit("join", { chatId: id, user: user });
    }
    // call the function to update the chat read status
    (async () => await markAllMessagesAsRead())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id, socket]);

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
      // socket events
      // this can sometimes take a second for other users to recieve the event, so we do this first.

      socket.emit("notTyping", { chatId: id, user: user });
      // dispatch the send message action
      dispatch(sendMessage(trimmedMessage, chat));
      // get the textarea element and clear it
      const textarea = document.getElementsByClassName("messageInput")[0];
      textarea.value = "";
      // scroll to the bottom of the chat
      const c = document.getElementsByClassName("chatContainer")[0];
      c.scrollTop = c.scrollHeight;
      c.scrollIntoView({ behavior: "smooth", block: "end" });
      // focus the textarea
      textarea.focus();
      // reset the message
      setMessage("");
    } else {
      // if the message is empty
      dispatch(setAlert("Please enter a message", "info"));
    }
  };

  async function markAllMessagesAsRead() {
    // make an axios request to /api/chat/:id/markAsRead
    // this will mark all messages in the chat thread as read
    // if the chat is not in the store, do nothing
    if (!chat) return;
    const { data } = await axios.put(`/api/chat/${chat._id}/markAsRead`);
    if (data.success) {
      // fix the navbar
      dispatch(getChats(true));
    }
  }

  const handleTyping = (e) => {
    // if the user is typing
    if (e.key === "Enter" && !e.shiftKey) {
      sendMsg(e, message);
    }
    if (socket) {
      socket.emit("typing", { id: chat._id, user: user });
    }
    clearTimeout(timer);
    setLastTypingTime(new Date().getTime());
    setTimer(
      // after 3 seconds, if the user is no longer typing, emit a stop typing event
      setTimeout(() => {
        if (new Date().getTime() - lastTypingTime >= 3000) {
          socket.emit("stopTyping", { id: chat._id, user: user });
        }
      }, 3000)
    );
  };

  return (
    <Container fluid className="chatPageContainer">
      <Meta
        title={
          chat
            ? chat.chatName
              ? `Chat | ${chat.chatName}`
              : `Chat | ${chat.users[0].firstName}, ${chat.users[1].firstName} ${
                  chat.users.length > 2 ? `+ ${chat.users.length - 2} other users` : ""
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
                    chat.users.length > 3 ? `+ ${chat.users.length - 2} other users` : ""
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
                    let lastSenderId = lastMessage ? lastMessage.sender._id : null;

                    return (
                      <Container key={message._id}>
                        <MessageItem
                          message={message}
                          user={user}
                          nextMessage={messages[indx + 1]}
                          lastSenderId={lastSenderId}
                          isLastMessage={indx === messages.length - 1}
                        />
                      </Container>
                    );
                  })}
              </div>
            </>
          )}
          {isTyping && (
            <div className="typingDots">
              <Image src={"/images/dots.gif"} />
            </div>
          )}
          <div className="footer">
            <textarea
              name="message"
              className="messageInput"
              onKeyDown={(e) => handleTyping(e)}
              onChange={(e) => setMessage(e.target.value)}
              // this should take care of the event that the user is already in chat, and receives a new message.
              // this should update the navbar, to reflect that they've read the message.
              onClick={async () => await markAllMessagesAsRead()}
              placeholder="Type a message..."
            ></textarea>
            <FiSend className="sendMessageButton" onClick={(e) => sendMsg(e, message)} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChatRoom;
