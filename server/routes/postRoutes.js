const express = require("express");
const getPosts = require("../controllers/Post/getPosts");
const newPost = require("../controllers/Post/newPost");
const { protect } = require("../middleware/auth");
const router = express.Router();

/**
 * @access     Public
 * @route      POST /api/posts
 *
 */

router.use(protect);

router.route(`/`).post(newPost).get(getPosts);

module.exports = router;
