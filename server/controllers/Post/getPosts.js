const Post = require("../../models/Post");
const asyncHandler = require("../../middleware/asyncHandler");

/**
 *  @description Get all posts
 *  returns      [Array] of posts
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const { followingOnly } = req.query;
    // query the database for posts and sort them by date
    const posts = await Post.aggregate([
      followingOnly && {
        $match: {
          // we need to locate posts from users that the user is following
          // we also want to find the post that is pinned by the user if any, and make that the first post
          $or: [{ user: { $in: req.user.following } }, { user: req.user._id }],
        },
      },
      {
        $addFields: {
          // we need to add a helper field to filter out pinned posts that dont belong to the logged in user making the request
          // if the post is pinned and the user is not the owner of the post, then we need to set the pinned field to false
          pinned: {
            $cond: {
              // check if the post is pinned
              if: { $eq: ["$pinned", true] },
              // if the post is pinned and the user is the owner of the post, then we need to set the pinned field to true
              then: { $eq: ["$user", req.user._id] },
              // if the post is not pinned, or the user is not the owner of the post, set the field to default to false
              else: false,
            },
          },
        },
      },
      // sort by pinned first, then by date
      {
        $sort: {
          // sort by the users pinned post first
          pinned: -1,
          // sort by createdAt
          createdAt: -1,
        },
      },
    ]);
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
    console.log(error);
    errorHandler(error, req, res);
  }
});
