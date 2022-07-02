import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../Actions/Post/getPosts";
import Loader from "../../Components/Loader/Loader";
import Meta from "../../Components/Meta";
import ReplyModal from "../../Components/Modals/ReplyModal";
import PostForm from "../../Components/Post/PostForm";
import PostItem from "../../Components/Post/PostItem";

import "./index.css";

const Home = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const {
    listPosts: { posts, loading },
    createPost: { success: successCreate },
    updatePost: { success: successUpdate },
    selectedPost: { post },
  } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPosts());
  }, [user, dispatch, successCreate, successUpdate]);
  return (
    <>
      <ReplyModal
        show={show}
        handleClose={() => setShow(false)}
        post={post}
        user={user}
      />
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
                    retweeted={post.retweetUsers.includes(user._id)}
                    setShow={setShow}
                    show={show}
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
