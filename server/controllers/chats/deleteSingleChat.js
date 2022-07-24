const Chat = require("../../models/Chat");
const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");

/**
 * @description         - Deletes a chat, by setting its isArchived property to true
 * @route               - DELETE /api/chats/:id
 * @param {String} id   - The id of the chat to delete
 * @returns {Boolean}   - Success
 * @throws {Error}      - Throws an error if the chat is not found
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
