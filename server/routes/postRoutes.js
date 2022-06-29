const express = require("express");
const getPosts = require("../controllers/Post/getPosts");
const likePost = require("../controllers/Post/likePost");
const newPost = require("../controllers/Post/newPost");
const { retweet } = require("../controllers/Post/retweet");
const { protect } = require("../middleware/auth");
const router = express.Router();

/**
 * @access     Public
 * @route      POST /api/posts
 *
 */

router.use(protect);

router.route(`/`).post(newPost).get(getPosts);
router.route("/:id").get();
router.route("/:id/like").put(likePost);
router.route("/:id/retweet").post(retweet);

module.exports = router;
