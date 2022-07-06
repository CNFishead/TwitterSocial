const express = require("express");
const getUserByUsername = require("../controllers/User/getUserByUsername");
const updateUserFollowing = require("../controllers/User/updateUserFollowing");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @access     Public
 * @route      GET /api/users/username/:username
 *
 */
router.use(protect);
router.route("/:id/following").put(updateUserFollowing);
router.route("/username/:username").get(getUserByUsername);

module.exports = router;
