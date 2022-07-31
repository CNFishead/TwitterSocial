const asyncHandler = require("../../middleware/asyncHandler");
const Notification = require("../../models/Notification");
const errorHandler = require("../../middleware/errorHandler");

/**
 * @description        - Gets all { Notification } objects from the database for the { req.user }
 * @route              - GET /api/notifications
 * @returns { Object } - An array of { Notification } objects
 * @access             - Private
 * @author             - Austin Howard
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const filter = {
      userTo: req.user._id,
      notificationType: { $ne: "newMessage" },
      // check the req.query.unreadOnly paramter to see if we should only return unread notifications
      ...(req.query.unreadOnly === "true" ? { opened: false } : {}),
    };
    const notifications = await Notification.aggregate([
      {
        $match: {
          ...filter,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      // populate userFrom and userTo
      {
        $lookup: {
          from: "users",
          localField: "userFrom",
          foreignField: "_id",
          as: "userFrom",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userTo",
          foreignField: "_id",
          as: "userTo",
        },
      },
      {
        $unwind: {
          path: "$userFrom",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$userTo",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
