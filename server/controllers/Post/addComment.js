const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Notification = require("../../models/Notification");
const Post = require("../../models/Post");

/**
 * @description Get a post by id and update the comments with a new comment
 * @param {String} id - The id of the post
 * @returns {Object} - The post
 * @throws {Error} - If the post is not found
 * @throws {Error} - If the comment is invalid
 *
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
    // destructure the comment from the request body
    const { text } = req.body;
    // now we have to build the comment object
    const comment = {
      content: text,
      user: req.user._id,
      avatar: req.user.profileImageUrl,
      name: req.user.username,
    };

    post.comments.push(comment);
    await post.save();

    // also we want to essentially create a new post with the comment as the content, and the user as the author
    // so we can send back the new post object
    const newPost = await Post.create({
      content: text,
      user: req.user._id,
      avatar: req.user.profileImageUrl,
      name: req.user.fullName,
      replyTo: post._id,
    });
    // notify the user that they have liked a post
    await Notification.insertNotification(
      post.user._id,
      req.user._id,
      "reply",
      newPost._id
    );

    res.status(200).json({
      success: true,
      post: newPost,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
