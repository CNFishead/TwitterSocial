const errorHandler = require("../../middleware/errorHandler");
const Chat = require("../../models/Chat");
const asyncHandler = require("../../middleware/asyncHandler");
const { default: mongoose } = require("mongoose");
const User = require("../../models/User");

/**
 * @desc     Get a single chat, returns a chat object and all the messages in it
 * @param    {String} id - The id of the chat
 * @returns  {Object} - A chat object
 * @route    GET /api/messages/:id
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    // find the chat with the id in the request and where the user is in that chat
    let chat = await Chat.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(req.params.id),
          users: { $elemMatch: { $eq: req.user._id } },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "users",
          foreignField: "_id",
          as: "users",
        },
      },
    ]);

    chat = chat[0];

    // * Aggregation returns an array, we want the first result
    if (!chat) {
      // if the chat doesn't exist, check to see if they are trying to access the chat by a userId
      let user = await User.findById(req.params.id);
      // if the user exists, get the chat using the userId
      if (user) {
        chat = await getChatByUserId(user._id, req.user._id);
      }
    }

    // finally check if the chat exists, if it doesnt, return an error, if it does return the chat.
    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});

function getChatByUserId(userLoggedInId, otherUserId) {
  return Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: userLoggedInId } },
          { $elemMatch: { $eq: otherUserId } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [userLoggedInId, otherUserId],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).populate("users");
}
