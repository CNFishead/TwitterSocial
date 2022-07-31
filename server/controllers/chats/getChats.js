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
    const filter = {
      users: { $elemMatch: { $eq: req.user._id } },
      // filter out the chats that have no messages i.e., someone opened a chat but never sent a message
      // therefore the latestMessage is null
      latestMessage: { $ne: null },
      // if the req.query.unreadOnly paramter is true, then only return unread chats
      ...(req.query.unreadOnly === "true" ? { "latestMessage.readBy": { $nin: [req.user._id] } } : {}),
    };
    const chats = await Chat.aggregate([
      {
        $match: {
          // match all chats that the user is part of the users arraay
          ...filter,
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
    console.log(error);
    errorHandler(error, req, res, next);
  }
});
