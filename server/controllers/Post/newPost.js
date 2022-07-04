const asyncHandler = require("../../middleware/async");
const errorHandler = require("../../middleware/errorHandler.js");
const Post = require("../../models/Post");

/**
 *  @desc    Create a new post
 *  @route   POST /api/posts
 *  @access  Private (only logged in user can create a post)
 *  @returns {object} Post object
 *  @body    {string} content
 *  @body    {boolean} pinned
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    // destructure the req.body
    const { text } = req.body;
    // check the text isnt empty
    if (!text || text.length <= 0) {
      return res.status(400).json({
        message: "Please Enter Text",
      });
    }
    // put req.user into user
    const user = req.user;
    // create a new post
    const newPost = await Post.create({
      content: text,
      user: user._id,
      avatar: user.profileImageUrl,
      name: user.fullName,
    });
    if (newPost) {
      return res.status(201).json({
        success: true,
        post: newPost,
      });
    }
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
