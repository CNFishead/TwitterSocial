import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      </Helmet>
    </HelmetProvider>
  );
};

Meta.defaultProps = {
  title: "Tweetr",
  description: "Tweetr is a simple Twitter client built with React.",
  keywords:
    "Twitter Clone, social media, React, Redux, Node, Express, MongoDB, Mongoose, Twitter API",
};

export default Meta;
