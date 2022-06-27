import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import Meta from "../../Components/Meta";
import PostForm from "../../Components/Post/PostForm";

import "./index.css";

const Home = () => {
  const { user, loading } = useSelector((state) => state.auth);
  return (
    <>
      <Meta title={`Tweetr | Home`} />
      <Container fluid>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>Welcome {user.fullName}</h1>
            <PostForm user={user} />
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
