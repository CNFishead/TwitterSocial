const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Chat = require("../../models/Chat");

/**
 * @description - Create a new chat, and add the user to the chat, gets the list of users from the req.body
 *
 * @returns {Boolean} - Returns true if the chat was created successfully
 * @throws {Error} - Throws an error if the chat was not created successfully
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const { users } = req.body;
    // validation, check users is an array, and has a length of at least 1
    if (!Array.isArray(users) || users.length < 1) {
      return res.status(400).json({
        success: false,
        message: "Must have at least one user",
      });
    }
    // we need to make sure a chat doesn't already exist with the users
    const chatExist = await Chat.findOne({
      users: [req.user._id, ...users],
    });
    // if the chat exists, we return that chat, otherwise we create a new chat
    if (chatExist) {
      return res.status(200).json({
        success: true,
        chat: chatExist,
      });
    }
    const chat = await Chat.create({
      isGroupChat: true,
      users: [req.user._id, ...users],
    });
    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
