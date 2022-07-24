import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatRoom from "../Screens/Messages/ChatRoom/ChatRoom.Page";
import InboxScreen from "../Screens/Messages/InboxScreen.Page";
import NewMessage from "../Screens/Messages/NewMessage.Page";
import NotFound from "../Screens/NotFound";

const MessageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/inbox/new" element={<NewMessage />} />
        <Route path="/inbox/:id" element={<ChatRoom />} />
        <Route path="/inbox" element={<InboxScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MessageRoutes;
