import React from "react";
import "./index.css";
import { MdChatBubble } from "react-icons/md";
import { FaRetweet } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { timeDifference } from "../../utils/timeDifference";
import { useDispatch } from "react-redux";
import { likePost } from "../../Actions/Post/likePost";
import { retweet } from "../../Actions/Post/retweetPost";

const PostItem = ({ post, liked = false, retweeted = false }) => {
  const dispatch = useDispatch();
  const likeHandler = () => {
    dispatch(likePost(post._id));
  };

  const retweetHandler = () => {
    dispatch(retweet(post._id));
  };
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
                    {timeDifference(new Date(), new Date(post.createdAt))}
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
                  <button id="comment">
                    <MdChatBubble />
                  </button>
                </Col>
                <Col>
                  <button
                    id="retweet"
                    onClick={retweetHandler}
                    className={`green ${retweeted ? `active` : ""}`}
                  >
                    <FaRetweet /> {post.retweetUsers.length}
                  </button>
                </Col>
                <Col>
                  <button
                    id="like"
                    onClick={likeHandler}
                    className={`red ${liked ? `active` : ""}`}
                  >
                    <FaHeart />{" "}
                    <span style={{ fontSize: ".8rem" }}>
                      {post.likes.length}
                    </span>
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
