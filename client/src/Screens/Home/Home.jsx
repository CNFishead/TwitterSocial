import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Actions/Post/getPosts";
import Loader from "../../Components/Loader/Loader";
import Meta from "../../Components/Meta";
import PostForm from "../../Components/Post/PostForm";
import PostItem from "../../Components/Post/PostItem";

import "./index.css";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    listPosts: { posts, loading },
    createPost: { success: successCreate },
    updatePost: { success: successUpdate },
  } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [user, dispatch, successCreate, successUpdate]);
  return (
    <>
      <Meta title={`Tweetr | Home`} />
      <Container fluid>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="titleContainer">
              <h1>Home</h1>
            </div>
            <PostForm user={user} />
            <div className="postContainer">
              {posts &&
                posts.map((post) => (
                  <PostItem
                    key={post._id}
                    post={post}
                    liked={post.likes.includes(user._id)}
                  />
                ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
