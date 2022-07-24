const Chat = require("../../models/Chat");
const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");

/**
 * @description         - Updates a chat
 * @route               - PUT /api/chats/:id
 * @param {String} id   - The id of the chat to update
 *
 * @body {Object} chat  - The chat object to update
 *
 * @returns {Object}    - Returns the updated chat
 * @throws {Error}      - Throws an error if the chat is not found
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const chat = await Chat.findByIdAndUpdate(
      {
        _id: req.params.id,
        // match the chat that the user is apart of
        users: { $in: [req.user._id] },
      },
      req.body,
      {
        new: true,
      }
    );
    // if the chat is not found, throw an error
    if (!chat) {
      throw new Error("Chat not found");
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
