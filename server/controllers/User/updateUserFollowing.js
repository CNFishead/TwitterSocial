const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const Notification = require("../../models/Notification");
const User = require("../../models/User");
const userObject = require("../../utils/userObject");

/**
 *  @description Function will update the user's following list. with the userToBeFollowed.
 *               will also update the userToBeFollowed's followers list.
 *  @route       PUT /api/users/:id/following
 *  @param       {string} userToBeFollowed - Id of the user to be followed.
 *  @returns     {object} - Returns a user object with the updated following and followers lists.
 *  @throws      {error} - Throws an error if the userToBeFollowed is not found.
 *
 *  @author      Austin Howard - v 1.0
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;
    const userToBeFollowed = await User.findById(req.params.id);
    if (!userToBeFollowed) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    if (user.following.includes(userToBeFollowed._id)) {
      // user is already following userToBeFollowed
      // remove userToBeFollowed from user's following list
      user.following.splice(user.following.indexOf(userToBeFollowed._id), 1);
      // remove user from userToBeFollowed's followers list
      userToBeFollowed.followers.splice(
        userToBeFollowed.followers.indexOf(user._id),
        1
      );
      // save both users
      await user.save();
      await userToBeFollowed.save();
      return res.status(200).json({
        success: true,
        message: `You are no longer following ${userToBeFollowed.username}.`,
        user: await userObject(user._id),
      });
    }
    user.following.push(userToBeFollowed._id);
    userToBeFollowed.followers.push(user._id);
    // send a notification to userToBeFollowed
    await Notification.insertNotification(userToBeFollowed, user, "follow", user._id);

    // save both users
    await user.save();
    await userToBeFollowed.save();
    res.status(200).json({
      success: true,
      message: `You are now following ${userToBeFollowed.username}`,
      user: await userObject(user._id),
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
