import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../Actions/Post/getPosts";
import PostItem from "../../../Components/Post/PostItem";

const SearchPosts = ({ keyword, user, show, setShow }) => {
  const dispatch = useDispatch();
  const {
    listPosts: { posts },
  } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts(false, keyword));
  }, [dispatch, keyword]);

  return (
    <Container>
      {posts &&
        posts.map((post) => {
          return (
            <PostItem
              key={post._id}
              post={post}
              liked={post.likes.includes(user._id) || false}
              retweeted={post.retweetUsers.includes(user._id) || false}
              setShow={setShow}
              show={show}
              userId={user._id}
            />
          );
        })}
    </Container>
  );
};

export default SearchPosts;
