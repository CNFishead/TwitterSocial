import React from "react";
import styles from "./MessageItem.module.css";
import { Container, Image } from "react-bootstrap";

/**
 * @description - MessageItem component is used to display a message
 * @param {Object} message - the message object
 * @param {Object} user - the user who is logged in
 * @param {Object} nextMessage - the next message object, or null
 * @returns {JSX} - JSX representation of the MessageItem component
 */
const MessageItem = ({ message, user, nextMessage, lastSenderId }) => {
  const isMine = message.sender._id === user._id;
  const sender = message.sender;
  const senderName = sender.firstName + " " + sender.lastName;

  const currentSenderId = sender._id;
  const nextSenderId = nextMessage && nextMessage.sender._id;

  const isFirst = lastSenderId !== currentSenderId;
  const isLast = nextSenderId !== currentSenderId;

  return (
    <Container fluid>
      <ul
        className={`
        ${styles.message} 
        ${isMine ? styles.mine : styles.theirs} 
        ${isFirst ? styles.first : ""} 
        ${isLast ? styles.last : ""}
        `}
      >
        <div className={styles.imageContainer}>
          {!isMine && isLast && (
            <Image src={sender.profileImageUrl} className={styles.image} />
          )}
        </div>
        <div className={styles.messageContainer}>
          {!isMine && isFirst && (
            <span className={styles.senderName}>{senderName}</span>
          )}
          <span className={styles.messageBody}>{message.content}</span>
          {/* if its the last message add the time stamp of that last message */}
          {isLast && (
            <span className={styles.timeStamp}>
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          )}
        </div>
      </ul>
    </Container>
  );
};

export default MessageItem;
