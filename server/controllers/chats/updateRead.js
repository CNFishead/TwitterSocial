const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Chat = require("../../models/Chat");
const Message = require("../../models/Message");

/**
 *  @description          - Updates all chat messages.readBy to true for the { req.user }
 *  @route                - PUT /api/chats/:id/markAsRead
 *  @returns { Boolean }  - True if successful
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }
    const user = req.user._id;
    // now we need to find all the messages related to this chat
    await Message.updateMany({ chat: chat._id }, { $addToSet: { readBy: user._id } });
    res.status(200).json({
      success: true,
      message: "Chat marked as read",
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
