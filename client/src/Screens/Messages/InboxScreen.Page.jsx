import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import Loader from "../../Components/Loader/Loader";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Meta from "../../Components/Meta";
import { getChats } from "../../Actions/chat/getChats";
import ChatItem from "../../Components/ChatItem/ChatItem.component";
import { CLEAR_USERS } from "../../Constants/userConstants";

const InboxScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    listChats: { chats, loading },
  } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch({ type: CLEAR_USERS });
    dispatch(getChats());
  }, [dispatch, navigate]);

  return (
    <Container>
      <Meta title="Inbox" />
      <Row>
        <span className="titleContainer">
          <h1>Inbox</h1>
          <FaPlus className="icon" onClick={() => navigate("/dashboard/messages/inbox/new")} />
        </span>
      </Row>
      <Container fluid>
        {loading ? (
          <Loader />
        ) : chats && chats.length > 0 ? (
          chats.map((chat) => <ChatItem key={chat._id} chat={chat} user={user} />)
        ) : (
          <h1>No chats</h1>
        )}
      </Container>
    </Container>
  );
};

export default InboxScreen;
