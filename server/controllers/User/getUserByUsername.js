const { default: mongoose } = require("mongoose");
const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const User = require("../../models/User");
/**
 * @description - This function is used to get the user by username.
 * @param {string} username - The username of the user.
 * @returns {object} user - The user object.
 * @throws {Error}
 * @access private
 * @author Austin Howard
 */
module.exports = asyncHandler(async (req, res, next) => {
  try {
    const filter = [
      { username: req.params.username },
      // check if username is of type ObjectId if it is try to find the user by the id
      { ...(mongoose.Types.ObjectId.isValid(req.params.username) && { _id: new mongoose.Types.ObjectId(req.params.username) }) },
    ];
    const user = await User.findOne({
      $or: filter,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Populate the user's followers and following
    await User.populate(user, { path: "followers following" });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
