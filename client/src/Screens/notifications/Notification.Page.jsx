import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserNotifications } from "../../Actions/notifications/getUsersNotifications";
import { updateOpenedNotification } from "../../Actions/notifications/updateOpenedNotification";
import { RiCheckDoubleFill } from "react-icons/ri";
import Loader from "../../Components/Loader/Loader";
import Meta from "../../Components/Meta";
import NotificationItem from "../../Components/notifcations/NotificationItem.component";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    listNotifications: { notifications, loading },
  } = useSelector((state) => state.notifications);
  const {
    socketConnection: { socket },
  } = useSelector((state) => state.socket);

  useEffect(() => {
    dispatch(getUserNotifications());
  }, [dispatch, navigate]);

  return (
    <Container>
      <Meta title="Notifications" />
      <Row>
        <span className="titleContainer">
          <h1>Notifications</h1>
          <RiCheckDoubleFill className="icon" onClick={() => dispatch(updateOpenedNotification())} />
        </span>
      </Row>
      {loading ? (
        <Loader />
      ) : notifications && notifications.length > 0 ? (
        <div style={{ margin: "2% 0" }}>
          {notifications.map((notification) => {
            return (
              <div
                key={notification._id}
                onClick={() => {
                  dispatch(updateOpenedNotification(notification._id));
                  if (socket) {
                    socket.emit("openNotify", { id: notification._id, user: notification.userTo });
                  }
                }}
              >
                <NotificationItem notification={notification} />
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No Notifications</h1>
      )}
    </Container>
  );
};

export default Notification;
