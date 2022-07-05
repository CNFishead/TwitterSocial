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
import { GET_SELECTED_POST } from "../../Constants/postConstants";
import { BsFillChatLeftDotsFill } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { deletePost } from "../../Actions/Post/deletePost";
import NoContent from "./NoContent";

const PostItem = ({
  post,
  liked = false,
  retweeted = false,
  setShow,
  show,
  showRetweet = true,
  userId,
}) => {
  console.log(post);
  const dispatch = useDispatch();
  const likeHandler = () => {
    dispatch(likePost(post._id));
  };

  const retweetHandler = () => {
    dispatch(retweet(post._id));
  };
  const deleteHandler = () => {
    dispatch(deletePost(post._id));
  };
  const isRetweet = !post.retweetData;
  const retweetedBy = !isRetweet ? post.postedBy.username : null;

  post = !isRetweet ? post.retweetData : post;

  return (
    <div className="post">
      {post && post.user._id === userId && (
        <Container className="userOptionsContainer" fluid>
          <FiDelete
            className="postDeleteButton"
            onClick={() => deleteHandler(post._id)}
          />
        </Container>
      )}
      {post && post.user && (
        <>
          <div className="postActionContainer">
            {!isRetweet && (
              <span>
                <span style={{ fontSize: "1.2em" }}>
                  <FaRetweet />
                </span>{" "}
                Retweeted by{" "}
                <Link to={`/dashboard/profile/${retweetedBy}`}>
                  @{retweetedBy}
                </Link>
              </span>
            )}
          </div>
          <div className="mainContentContainer">
            <div className="userImageContainer">
              <Image src={post.avatar} className="userImage" />
            </div>
            <Container fluid className="postContentContainer">
              <Container fluid className="header">
                <Row>
                  <Col>
                    <Link
                      to={`/dashboard/profile/${post.user.username}`}
                      className="displayName"
                    >
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
                <Row style={{ textAlign: "end", fontSize: ".75em" }}>
                  <Link to={`/post/${post._id}`}>
                    See all replies <BsFillChatLeftDotsFill />
                  </Link>
                </Row>

                <span>{post.content}</span>
                {post.replyTo && showRetweet && post.replyTo.user && (
                  <Container>
                    <PostItem
                      post={post.replyTo}
                      liked={liked}
                      retweeted={retweeted}
                      setShow={setShow}
                      show={show}
                    />
                  </Container>
                )}
                {post.replyTo === null && (
                  <Container>
                    <NoContent />
                  </Container>
                )}
              </Container>
              <Container className="postFooter">
                <Row className="postButtonContainer">
                  <Col>
                    <button
                      id="comment"
                      onClick={() => {
                        dispatch({ type: GET_SELECTED_POST, payload: post });
                        setShow(!show);
                      }}
                      className={`green ${retweeted ? `active` : ""}`}
                    >
                      <MdChatBubble /> {post.comments.length}
                    </button>
                  </Col>

                  {isRetweet && retweetedBy !== post.user._id && (
                    <Col>
                      <button
                        id="retweet"
                        onClick={retweetHandler}
                        className={`green ${retweeted ? `active` : ""}`}
                      >
                        <FaRetweet /> {post.retweetUsers.length}
                      </button>{" "}
                    </Col>
                  )}

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
        </>
      )}
    </div>
  );
};

export default PostItem;
