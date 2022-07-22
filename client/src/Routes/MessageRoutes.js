import React from "react";
import { Route, Routes } from "react-router-dom";
import InboxScreen from "../Screens/Messages/InboxScreen.Page";
import NotFound from "../Screens/NotFound";

const MessageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/inbox" element={<InboxScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MessageRoutes;
