const express = require("express");
const newPost = require("../controllers/Post/newPost");
const { protect } = require("../middleware/auth");
const router = express.Router();

/**
 * @access     Public
 * @route      POST /api/posts
 *
 */

router.post(`/`, protect, newPost);

module.exports = router;
