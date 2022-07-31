import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchRoutes from "./SearchRoutes";
import NotFound from "../Screens/NotFound";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import Followers from "../Screens/Profile/views/Followers.view";
import MessageRoutes from "./MessageRoutes";
import Notification from "../Screens/notifications/Notification.Page";

/**
 * @description ProfileRoutes is the base routing file that handles all routes for a logged in user.
 * @route       /messages/* redirects into the routes that handles all messages/chats.
 * @route       /search/* redirects into the routes that handles all search functionality. for searching users or posts.
 * @route       /profile/:username/:view redirects into the profile screen of the user, for either followers or following.
 * @route       /profile/:username redirects into the profile screen of the user
 * @route       /profile redirects into the profile screen of the user
 * @route       /* redirects into the not found screen. any request that isnt handled by the routes.
 */
const ProfileRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/notifications" element={<Notification />} />
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
