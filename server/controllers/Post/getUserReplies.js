const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Post = require("../../models/Post");
const User = require("../../models/User");

/**
 *  @description Get the replies of a user, these are posts that have been replied to by the user
 *  @route GET /api/posts/user/:username/replies
 *  @param {String} username - username of user
 *  @access Private
 *  @returns {object} - Returns an array of posts
 *  @throws {Error} - If user is not found
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const posts = await Post.find({
      user: user._id,
      replyTo: { $exists: true },
    });

    // Populate the user and the user that replied to the post
    await Post.populate(posts, { path: "user" });
    await Post.populate(posts, { path: "retweetData" });
    await Post.populate(posts, { path: "retweetData.user" });
    await Post.populate(posts, { path: "replyTo" });
    await Post.populate(posts, { path: "replyTo.user" });
    await Post.populate(posts, { path: "postedBy" });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
