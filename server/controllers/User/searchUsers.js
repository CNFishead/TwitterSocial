const asyncHandler = require("../../middleware/asyncHandler");
const errorHandler = require("../../middleware/errorHandler");
const User = require("../../models/User");

/**
 *  @description Get all users, used to search for users in the user search page.
 *  @param       {string} keyword - The keyword to search for.
 *  @access      Private - Only logged in users can search for users.
 *  @route       GET /api/users
 */
module.exports = asyncHandler(async (req, res) => {
  try {
    const { keyword } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { fullName: { $regex: keyword, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    errorHandler(error, req, res);
  }
});
