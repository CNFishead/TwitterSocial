import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPostsUsername } from "../../../Actions/Post/getPostsUsername";
import Loader from "../../../Components/Loader/Loader";
import ReplyModal from "../../../Components/Modals/ReplyModal";
import PostItem from "../../../Components/Post/PostItem";

const TweetsView = ({ user, socket }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const {
    post: {
      listPosts: { posts, loading },
      selectedPost: { post },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPostsUsername(user.username));
  }, [dispatch, user]);

  return (
    <Container fluid>
      <ReplyModal show={show} handleClose={() => setShow(false)} post={post} user={user} setShow={setShow} socket={socket} />
      {loading ? (
        <Loader />
      ) : (
        posts &&
        posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            liked={post.likes.includes(user._id) || false}
            retweeted={post.retweetUsers.includes(user._id)}
            setShow={setShow}
            show={show}
            userId={user._id}
            socket={socket}
          />
        ))
      )}
    </Container>
  );
};

export default TweetsView;
