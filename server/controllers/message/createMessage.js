const Message = require("../../models/Message");
const User = require("../../models/User");
const Chat = require("../../models/Chat");
const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const { default: mongoose } = require("mongoose");
const Notification = require("../../models/Notification");

/**
 * @description        - Creates a new { Message } object in the database related to the { Chat } object
 * @param { Object }   - req.body
 * @param { Object }   - req.params
 * @param { String }   - req.params.chatId - The id of the { Chat } object
 * @param { Object }   - req.body.content - The content of the { Message } object
 *
 * @route              - POST /api/chat/:chatId/message
 * @returns { Object } - The newly created { Message } object
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    // Get the { Chat } object
    const chat = await Chat.findById(
      mongoose.Types.ObjectId(req.baseUrl.split("/")[3])
    );

    // if the { Chat } object doesn't exist, return an error
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    // check to see if we have content in the request body
    if (!req.body.content) {
      return res.status(400).json({
        success: false,
        message: "Please enter a message",
      });
    }
    // create a new { Message } object
    const message = await Message.create({
      sender: req.user._id,
      content: req.body.content,
      chat: chat._id,
    });
    // populate the { Message.sender } field with the user who sent the message
    await message.populate("sender", "-password");

    // next we want to update the { Chat } object to display the most current previous message
    await chat.updateOne({
      latestMessage: message._id,
    });
    for (const u of chat.users) {
      if (u.toString() !== message.sender._id.toString()) {
        // send a notification to the user
        await Notification.insertNotification(
          u._id,
          message.sender._id,
          "newMessage",
          message.chat._id
        );
      }
    }

    // return the newly created { Message } object to the client
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
