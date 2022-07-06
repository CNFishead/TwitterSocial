import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../Screens/NotFound";
import ProfileScreen from "../Screens/Profile/ProfileScreen";

const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/profile/:username" element={<ProfileScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ProfileRoutes;
