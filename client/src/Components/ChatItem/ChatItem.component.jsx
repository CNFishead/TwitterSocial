import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../../Actions/alert";

const ChatItem = ({ chat }) => {
  const dispatch = useDispatch();
  // we need to create an array of Images to display in the chat item
  // this array will always hold atleast 1 image, but if the chat is a group chat it will also hold a second image,
  let images = [];
  if (!chat.users[0] || !chat.users[0].profileImageUrl) {
    dispatch(setAlert("No user passed in", "danger"));
  }
  // set the images array to the first user's profile image
  images.push(chat.users[0].profileImageUrl);
  // if the chat is a group chat, add the second user's profile image to the images array
  if (chat.users.length > 1 && chat.isGroupChat) {
    images.push(chat.users[1].profileImageUrl);
  }

  return (
    <Link
      to={`/dashboard/messages/inbox/${chat._id}`}
      className={`resultListItem`}
    >
      <div className="resultImageContainer">
        {images &&
          images.map((image, indx) => (
            <div
              key={image + indx}
              // if its a group chat we need to add the class "groupChat" to the image container
              className={`imageContainer ${
                chat.isGroupChat && `groupChatImage`
              } ${chat.isGroupChat && indx === 0 && `firstImage`}`}
            >
              <img src={image} alt="profile-chat-pic" />
            </div>
          ))}
      </div>
      <div className={`resultsDetailsContainer ellipsis`}>
        <span className={`heading`}>
          {/* If chat name doesnt exist, just list the first two users, first names */}
          {chat.chatName
            ? chat.chatName
            : `${chat.users[0].firstName}, ${chat.users[1].firstName} ${
                chat.users.length > 2
                  ? `+ ${chat.users.length - 2} other users`
                  : ""
              }`}
        </span>
        {chat.lastMessage ? (
          <span className={`subText ellipsis`}>lastest Message</span>
        ) : (
          <span className={`subText ellipsis`}>No messages</span>
        )}
      </div>
    </Link>
  );
};

export default ChatItem;
