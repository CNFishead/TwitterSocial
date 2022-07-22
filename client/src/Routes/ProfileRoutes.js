import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchRoutes from "./SearchRoutes";
import NotFound from "../Screens/NotFound";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import Followers from "../Screens/Profile/views/Followers.view";
import MessageRoutes from "./MessageRoutes";

const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/messages/*" element={<MessageRoutes />} />
        <Route path="/search/*" element={<SearchRoutes />} />
        <Route path="/profile/:username/:view" element={<Followers />} />
        <Route path="/profile/:username" element={<ProfileScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default ProfileRoutes;
