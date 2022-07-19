import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../Screens/NotFound";
import SearchScreen from "../Screens/Search/SearchScreen";

const SearchRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default SearchRoutes;