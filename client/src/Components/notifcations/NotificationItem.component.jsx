import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { timeDifference } from "../../utils/timeDifference";
import styles from "./NotificationItem.module.css";

const NotificationItem = ({ notification }) => {
  return (
    <Link
      to={getNotificationUrl(notification)}
      className={`resultListItem ${styles.notification} ${!notification.opened && styles.active}`}
    >
      <div className="resultImageContainer">
        <div className="imageContainer">
          <Image src={notification.userFrom.profileImageUrl} className={styles.image} />
        </div>
      </div>
      <div className="resultsDetailsContainer ellipsis">
        <span className={`ellipsis ${styles.notificationText}`}>{parse(getNotificationText(notification))}</span>
        <span className={`ellipsis ${styles.notificationDate}`}>
          {timeDifference(new Date().getTime(), new Date(notification.createdAt))}
        </span>
      </div>
    </Link>
  );
};

function getNotificationText(notification) {
  const userFrom = notification.userFrom;
  const n = notification.notificationType;
  if (!userFrom.firstName || !userFrom.lastName) {
    return alert("user data failed population");
  }
  const name = `${userFrom.firstName} ${userFrom.lastName}`;
  const text =
    n === "retweet"
      ? `${name} reposted your post`
      : n === "postLike"
      ? `${name} liked your post`
      : n === "reply"
      ? `${name} replied to one of your posts`
      : n === "follow"
      ? `${name} has followed you`
      : "Notification Type Not Recognized";
  return `<span className="ellipsis">${text}</span>`;
}
function getNotificationUrl(notification) {
  const n = notification.notificationType;
  const url =
    n === "retweet" || n === "postLike" || n === "reply"
      ? `/post/${notification.entityId}`
      : n === "follow"
      ? `/dashboard/profile/${notification.entityId}`
      : "#";
  return url;
}

export default NotificationItem;
