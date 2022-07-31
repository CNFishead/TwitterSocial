const asyncHandler = require("../../middleware/asyncHandler");
const Post = require("../../models/Post");
const User = require("../../models/User");
const errorHandler = require("../../middleware/errorHandler");
const Notification = require("../../models/Notification");

/**
 *  @param {string} postId
 *  @desc  Retweets a post
 *  @route POST /api/posts/:id/retweet
 *  @access Private
 *
 */

exports.retweet = asyncHandler(async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    // Try and delete retweet
    const deletedPost = await Post.findOneAndDelete({
      postedBy: userId,
      retweetData: postId,
    });
    // find the original post
    const post = await Post.findById(postId).populate("user");
    if (!deletedPost) {
      // Create new retweet
      // get the data from the old post
      // create a new post
      const newPost = await Post.create({
        user: post.user,
        postedBy: userId,
        retweetData: postId,
        avatar: post.user.profileImageUrl,
      });
      // update the rewteets of the user
      await User.findByIdAndUpdate(userId, {
        $push: { retweets: newPost._id },
      });
      // lastly, update the number of users who retweeted the post
      await Notification.insertNotification(
        post.user._id,
        req.user._id,
        "retweet",
        newPost._id,
      );
      post.retweetUsers.push(userId);
      await post.save();
      res.status(200).json({
        message: "Post retweeted successfully",
        success: true,
        post: newPost,
      });
    } else {
      // we need to delete the post from the user's retweets
      // and update the number of retweets on the original post
      await User.findByIdAndUpdate(userId, {
        $pull: { retweets: deletedPost._id },
      });
      post.retweetUsers.pull(userId);
      await post.save();

      res.status(200).json({
        success: true,
        // respond with the postId of the deleted post
        postId: deletedPost._id,
        // respond with the post that was updated.
        post: post,
      });
    }
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
