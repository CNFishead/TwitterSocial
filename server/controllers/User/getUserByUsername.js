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
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res, next);
  }
});
