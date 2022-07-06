const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Post = require("../../models/Post");

/**
 * @description Get a post by id
 * @param {String} id - The id of the post
 * @returns {Object} - The post
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    await Post.populate(post, { path: "user" });
    await Post.populate(post, { path: "retweetData" });
    await Post.populate(post, { path: "retweetData.user" });
    await Post.populate(post, { path: "replyTo" });
    await Post.populate(post, { path: "replyTo.user" });
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // we need to find all the posts where the replyTo field is equal to the id of the post we are looking for
    const replies = await Post.find({ replyTo: req.params.id }).sort({
      date: -1,
    });
    await Post.populate(replies, { path: "user" });
    await Post.populate(replies, { path: "retweetData" });
    await Post.populate(replies, { path: "retweetData.user" });
    await Post.populate(replies, { path: "replyTo" });
    await Post.populate(replies, { path: "replyTo.user" });
    res.status(200).json({
      success: true,
      post,
      replies,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
