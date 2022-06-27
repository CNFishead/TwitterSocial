const asyncHandler = require("../../middleware/async");
const User = require("../../models/User.js");
const errorHandler = require("../../middleware/error.js");
const userObject = require("../../utils/userObject.js");

/**
 * @access     Public
 * @route      POST /api/auth/login
 *
 */

module.exports = asyncHandler(async (req, res) => {
  try {
    //Destructure the request body
    const { email, password } = req.body;
    //Validate the request body
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter a email and password" });
    }

    //This checks if user isActive
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      isActive: true,
    }).select("+password");

    //check logging in users isActive field is true
    if (!user) {
      //If user is not active
      return res
        .status(401)
        .json({ message: "No Account Found with those Credentials" });
    }

    if (user && (await user.matchPassword(password.trim()))) {
      res.json({ user: await userObject(user) });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
