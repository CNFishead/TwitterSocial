const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Post = require("../../models/Post");

/**
 *  @desc:     This function will toggle whether a post is pinned or not.
 *  @route:    GET /api/posts/pin/:id
 *  @access:   Private (Only logged in users can pin posts)
 *  @returns:  success message or error message
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    // Find the post we want to pin
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }
    // we want to get all the posts that are pinned and unpin them, then pin the post that is passed in through the req.params
    const posts = await Post.find({ user: req.user._id, pinned: true });
    // set all the posts to unpinned
    for (const p of posts) {
      p.pinned = false;
      await p.save();
    }
    post.pinned = true;
    await post.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
