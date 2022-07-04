const asyncHandler = require("../../middleware/async");
const Post = require("../../models/Post");
const errorHandler = require("../../middleware/errorHandler");

/**
 *  @description Removes a post from the database
 *  @param {String} postId
 *  @returns {Object} boolean and message if successful or not
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    await post.remove();
    res.status(200).json({
      success: true,
      message: "Post removed",
    });
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
