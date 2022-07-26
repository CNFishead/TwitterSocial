const express = require("express");
const createMessage = require("../controllers/message/createMessage");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * @access     Private - only logged in users can access this route
 * @route      POST /api/chat/:id/message - Create a new message in the chat
 *
 */
router.use(protect);

router.route("/").post(createMessage);

module.exports = router;
