import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Screens/Login/Login";
import NotFound from "../Screens/NotFound";
import Register from "../Screens/Register/Register";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
