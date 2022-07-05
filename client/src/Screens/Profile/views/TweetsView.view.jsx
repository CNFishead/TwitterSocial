import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPostsUsername } from "../../../Actions/Post/getPostsUsername";
import Loader from "../../../Components/Loader/Loader";
import PostItem from "../../../Components/Post/PostItem";

const TweetsView = ({ user }) => {
  console.log(user);
  const dispatch = useDispatch();

  const {
    post: {
      listPosts: { posts, loading },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getPostsUsername(user.username));
  }, [dispatch, user]);

  return (
    <Container fluid>
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
            userId={user._id}
          />
        ))
      )}
    </Container>
  );
};

export default TweetsView;
