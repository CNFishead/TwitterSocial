const express = require("express");
const createChat = require("../controllers/chats/createChat");
const deleteSingleChat = require("../controllers/chats/deleteSingleChat");
const getChats = require("../controllers/chats/getChats");
const getSingleChat = require("../controllers/chats/getSingleChat");
const updateRead = require("../controllers/chats/updateRead");
const updateSingleChat = require("../controllers/chats/updateSingleChat");
const { protect } = require("../middleware/auth");
/* import other routes */
const messageRoutes = require("./messageRoutes");
const router = express.Router();

/**
 * @access     Private                  - only logged in users can access this route
 * @route      GET /api/messages        - Get all message threads for the user
 * @route      POST /api/messages       - Create a new message thread
 * @route      GET /api/messages/:id    - Get a single message thread
 * @route      PUT /api/messages/:id    - Update a message thread
 * @route      DELETE /api/messages/:id - Delete a message thread
 *
 */
router.use("/:chatId/message", messageRoutes);
router.use(protect);

router.route("/").get(getChats).post(createChat);
router.route("/:id").get(getSingleChat).put(updateSingleChat).delete(deleteSingleChat);
router.route("/:id/markAsRead").put(updateRead);

module.exports = router;
