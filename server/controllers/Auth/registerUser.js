const asyncHandler = require("../../middleware/async");
const User = require("../../models/User");
const userObject = require("../../utils/userObject");
/**
 * @access      Public
 * @route      POST /api/auth/register
 *
 */

module.exports = asyncHandler(async (req, res) => {
  try {
    const { email, username } = req.body;

    // Check if user exists in database with the same email or username
    const user = await User.findOne({
      $or: [
        { email: email.toLowerCase() }, // case insensitive
        { username: username },
      ],
    });
    if (user) {
      return res.status(401).json({ message: "User already exists" });
    }
    const newUser = await User.create(req.body);
    if (newUser) {
      res.status(201).json({ user: await userObject(newUser) });
    }
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
