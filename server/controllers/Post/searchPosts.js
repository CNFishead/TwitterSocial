const Post = require("../../models/Post");
const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");

/**
 *  @desc -    Searches for posts based on the keywords provided. If no keywords are provided, it will return all posts.
 *             It will also search out retweets of post where the content is inside of retweetData.
 *  @route -   GET /api/posts/search
 *  @access -  Private
 *  @return -  JSON
 *  @param -   keyword: String
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          $or: [
            { content: { $regex: req.query.keyword, $options: "i" } },
          ],
        },
      },
      {
        $sort: {
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
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
