import React from "react";
import "./index.css";
import { MdChatBubble } from "react-icons/md";
import { FaRetweet } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";

const PostItem = ({ post }) => {
  return (
    <div className="post">
      {post && post.user && (
        <div className="mainContentContainer">
          <div className="userImageContainer">
            <Image src={post.avatar} className="userImage" />
          </div>
          <Container fluid className="postContentContainer">
            <Container fluid className="header">
              <Row>
                <Col>
                  <Link to={`/profile/${post.user}`} className="displayName">
                    {post.user.fullName}
                  </Link>
                </Col>
                <Col>
                  <span className="username">@{post.user.username}</span>
                </Col>
                <Col>
                  <span className="date">
                    {moment(post.createdAt).format("MM/DD/YYYY")}
                  </span>
                </Col>
              </Row>
            </Container>
            <Container className="postBody">
              <span>{post.content}</span>
            </Container>
            <Container className="postFooter">
              <Row className="postButtonContainer">
                <Col>
                  <button>
                    <MdChatBubble />
                  </button>
                </Col>
                <Col>
                  <button>
                    <FaRetweet />
                  </button>
                </Col>
                <Col>
                  <button>
                    <FaHeart />
                  </button>
                </Col>
              </Row>
            </Container>
          </Container>
        </div>
      )}
    </div>
  );
};

export default PostItem;
