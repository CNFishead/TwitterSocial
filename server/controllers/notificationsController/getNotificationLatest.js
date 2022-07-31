const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Notification = require("../../models/Notification");

/**
 *  @description        - Gets a single { Notification } object from the database for the { req.user } the most recent notification
 *                      - That belongs to that user
 *  @route              - GET /api/notifications/:id
 *  @returns { Object } - A { Notification } object
 *  @access             - Private
 *  @author             - Austin Howard
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const filter = {
      userTo: req.user._id,
      notificationType: { $ne: "newMessage" },
    };
    const notifications = await Notification.aggregate([
      {
        $match: filter,
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);
    const notification = notifications[0];
    // populate the userTo and userFrom
    await Notification.populate(notification, {
      path: "userTo",
      model: "User",
    });
    await Notification.populate(notification, {
      path: "userFrom",
      model: "User",
    });
    // error checking
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "No notification found",
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
