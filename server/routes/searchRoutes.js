const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @access     Public
 * @route      GET /api/search - search for users
 * @route      GET /api/search/:selectedTab - search for users
 *
 */
router.use(protect);

router.get("/").get(() => {
  console.log("search");
});
router.get("/:selectedTab").get(() => {
  console.log("search");
});

module.exports = router;
