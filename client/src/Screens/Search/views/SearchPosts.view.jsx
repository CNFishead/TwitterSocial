import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../Actions/Post/getPosts";
import ReplyModal from "../../../Components/Modals/ReplyModal";
import PostItem from "../../../Components/Post/PostItem";

const SearchPosts = ({ keyword, user, show, setShow, post = undefined }) => {
  const dispatch = useDispatch();
  const {
    listPosts: { posts },
  } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPosts(false, true, keyword));
  }, [dispatch, keyword]);

  return (
    <Container>
      {post && (
        <ReplyModal
          show={show}
          setShow={setShow}
          post={post}
          user={user}
          handleClose={() => setShow(!show)}
        />
      )}
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
