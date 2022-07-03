import React from "react";
import { Route, Routes } from "react-router-dom";
import PostView from "../Screens/Post/PostView";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/:id" element={<PostView />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
