const express = require("express");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @access     Private - only logged in users can access this route
 * @route      GET /api/messages - Get all message threads for the user
 * @route      GET /api/messages/:id - Get a single message thread
 * @route      POST /api/messages - Create a new message thread
 * @route      PUT /api/messages/:id - Update a message thread
 * @route      DELETE /api/messages/:id - Delete a message thread
 *
 */
router.use(protect);

router.get("/").get(() => {
  console.log("search");
});

module.exports = router;
