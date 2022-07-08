const asyncHandler = require("../../middleware/asyncHandler");
const Post = require("../../models/Post");
const User = require("../../models/User");
const errorHandler = require("../../middleware/errorHandler");

/**
 *  @desc   Get all posts by a user, excluding post's the user has replied to
 *  @route  GET /api/posts/user/:username
 *  @param  {String} username - username of user
 *  @access Private
 *  @returns {object} - Returns an array of posts
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
      $or: [
        { user: user._id, replyTo: { $exists: false } },
        { user: user._id, replyTo: { $exists: true, $ne: null } },
      ],
    }).sort({ createdAt: -1 });

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
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
