const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Chat = require("../../models/Chat");

/**
 * @description - Gets all the chats that the logged in user is a part of
 * @returns {Array} - Returns an array of chats
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const chats = await Chat.aggregate([
      {
        $match: {
          // match all chats that the user is part of the users arraay
          users: { $in: [req.user._id] },
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
      {
        $unwind: {
          path: "$latestMessage",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
    ]);
    for (const c of chats) {
      await Chat.populate(c, {
        path: "latestMessage",
        model: "Message",
      });
      await Chat.populate(c, {
        path: "latestMessage.sender",
        model: "User",
      });
    }

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
});
