const Notification = require("../../models/Notification");
const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");

/**
 * @description Updates a notification {opened: true}
 *
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      // if an id is not provided the user is trying to update all of their notifications
      try {
        await Notification.updateMany({ userTo: req.user._id }, { opened: true });
        return res.status(200).json({
          success: true,
        });
      } catch (error) {
        errorHandler(error, req, res, next);
      }
    }

    const updatedNotify = await Notification.findByIdAndUpdate(id, { opened: true });
    if (!updatedNotify) {
      return res.status(404).json({
        success: false,
        error: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, res, next);
  }
});
