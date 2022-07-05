const express = require("express");
const addComment = require("../controllers/Post/addComment");
const getPost = require("../controllers/Post/getPost");
const getPosts = require("../controllers/Post/getPosts");
const likePost = require("../controllers/Post/likePost");
const newPost = require("../controllers/Post/newPost");
const removePost = require("../controllers/Post/removePost");
const { retweet } = require("../controllers/Post/retweet");
const { protect } = require("../middleware/auth");
const router = express.Router();

/**
 * @access     Public
 * @route      POST /api/posts
 *
 */

router.use(protect);

router.route("/:id").get(getPost).delete(removePost);
router.route("/:id/comment").put(addComment);
router.route("/:id/like").put(likePost);
router.route("/:id/retweet").post(retweet);
router.route(`/`).post(newPost).get(getPosts);

module.exports = router;
