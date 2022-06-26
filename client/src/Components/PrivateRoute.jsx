import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return !user ? <Navigate to="/auth/login" /> : children;
};

export default PrivateRoute;
