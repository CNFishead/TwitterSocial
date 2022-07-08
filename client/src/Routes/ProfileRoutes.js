import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../Screens/NotFound";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import Followers from "../Screens/Profile/views/Followers.view";

const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/profile/:username/:view" element={<Followers />} />
        <Route path="/profile/:username" element={<ProfileScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ProfileRoutes;
