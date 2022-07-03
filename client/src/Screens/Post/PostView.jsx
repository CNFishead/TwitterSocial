import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../../Actions/Post/getPost";
import Loader from "../../Components/Loader/Loader";
import PostItem from "../../Components/Post/PostItem";

const PostView = () => {
  // utility actions
  const dispatch = useDispatch();
  const { id } = useParams();

  // component state
  const [show, setShow] = useState(false);

  // app state
  const {
    selectedPost: { post, replies, loading },
  } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  // useEffect
  useEffect(() => {
    if (!post || post._id !== id) {
      dispatch(getPost(id));
    }
  }, [dispatch, post, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid><Row>
          {post && (
            <PostItem
              post={post}
              liked={post.likes.includes(user._id)}
              retweeted={post.retweetUsers.includes(user._id)}
              setShow={setShow}
              show={show}
            />
          )}
          
            {replies &&
              replies.map((comment) => {
                return (
                  <PostItem
                    key={comment._id}
                    post={comment}
                    showRetweet={false}
                  />
                );
              })}
          </Row>
        </Container>
      )}
    </>
  );
};

export default PostView;
