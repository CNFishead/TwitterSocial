const Post = require("../../models/Post");
const asyncHandler = require("../../middleware/asyncHandler");

/**
 *  @description Get all posts
 *  returns      [Array] of posts
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    // query the database for posts and sort them by date
    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }]);
    // populate the user field in the posts
    await Post.populate(posts, { path: "user" });
    await Post.populate(posts, { path: "retweetData" });
    await Post.populate(posts, { path: "retweetData.user" });
    await Post.populate(posts, { path: "replyTo" });
    await Post.populate(posts, { path: "replyTo.user" });
    await Post.populate(posts, { path: "postedBy" });
    // return the posts
    res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
