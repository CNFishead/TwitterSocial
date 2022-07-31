import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { SiTwitter } from "react-icons/si";
import { Link } from "react-router-dom";
import { BsHouseFill, BsSearch, BsFillBellFill, BsEnvelope, BsFillPersonFill } from "react-icons/bs";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/Auth/logout";
import "./Navbar.css";
import { CLEAR_SELECTED_USER } from "../../Constants/userConstants";
import { getUserNotifications } from "../../Actions/notifications/getUsersNotifications";
import { getChats } from "../../Actions/chat/getChats";
import { notificationAlert } from "../../Actions/notificationAlert";
import axios from "axios";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const {
    socketConnection: { socket },
  } = useSelector((state) => state.socket);
  const {
    listNotifications: { notifications },
  } = useSelector((state) => state.notifications);
  const {
    listChats: { chats },
  } = useSelector((state) => state.chat);
  const { alerts } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(getUserNotifications(true));
    dispatch(getChats(true));
  }, [dispatch]);

  useEffect(() => {
    if (!socket) return;
    socket.on("notification", (data) => {
      dispatch(getUserNotifications(true));
    });
    socket.on("openedNotification", (data) => {
      console.log(`received openedNotification`);
      dispatch(getUserNotifications(true));
    });
    socket.on("notification received", async () => {
      // make an axios request to /api/notification/latest to get the last notification for the user
      // if the notification is not already in the list, dispatch the notificationAlert action
      const { data } = await axios.get("/api/notifications/latest");
      // make sure the notification is not already in the alerts list
      if (data && !alerts.some((alert) => alert.notification._id === data._id)) {
        dispatch(notificationAlert(data));
      }
      dispatch(getUserNotifications(true));
    });
    socket.on("message received", (data) => {
      dispatch(getChats(true));
    });
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return (
    <Nav>
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="icon-container blue">
          <SiTwitter className="icon blue" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/" className="icon-container">
          <BsHouseFill className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/search" className="icon-container">
          <BsSearch className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/notifications" className={`icon-container`}>
          <BsFillBellFill className="icon" />
          <span
            id="notificationBadge"
            className={`${notifications && notifications.filter((notification) => notification.opened === false).length > 0 && "active"}`}
          >
            {notifications &&
              notifications.filter((notification) => notification.opened === false).length > 0 &&
              notifications.filter((notification) => notification.opened === false).length}
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/profile" className="icon-container" onClick={() => dispatch({ type: CLEAR_SELECTED_USER })}>
          <BsFillPersonFill className="icon" />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/dashboard/messages/inbox" className={`icon-container`}>
          <BsEnvelope className="icon" />
          <span
            id="messagesBadge"
            className={`${
              chats &&
              chats.filter(
                (chat) => chat.latestMessage && chat.latestMessage.sender._id !== user._id && !chat.latestMessage.readBy.includes(user._id)
              ).length > 0 &&
              "active"
            }`}
          >
            {chats &&
              chats.filter(
                (chat) => chat.latestMessage && chat.latestMessage.sender._id !== user._id && !chat.latestMessage.readBy.includes(user._id)
              ).length}
          </span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => dispatch(logout())} className="icon-container">
          <RiLogoutBoxRLine className="icon" />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Navbar;
