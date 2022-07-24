import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Meta = ({ title, description, keywords, url, image }) => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* <!-- Primary Meta Tags --> */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
      </Helmet>
    </HelmetProvider>
  );
};

Meta.defaultProps = {
  title: "Tweetr",
  description: "Tweetr is a simple Twitter client built with React.",
  keywords:
    "Twitter Clone, social media, React, Redux, Node, Express, MongoDB, Mongoose, Twitter API",
  url: "https://tweetr.io",
  image: "/images/tweetr-logo.png",
};

export default Meta;
