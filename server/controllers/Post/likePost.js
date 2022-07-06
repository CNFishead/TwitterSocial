const asyncHandler = require("../../middleware/asyncHandler");
const Post = require("../../models/Post");

/**
 *  @desc Likes a post if the user has not liked it yet. will unlike if the user has already liked it.
 *
 */

module.exports = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => {
      id === userId;
    });
  } else {
    post.likes.push(userId);
  }
  await post.save();
  res.status(200).json({
    success: true,
    post,
  });
});
