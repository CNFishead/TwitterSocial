const User = require("../models/User.js");
const generateToken = require("./generateToken.js");

/**
 *  @decription: This function finds a user in the database where we need to return a user object to the front
 *               a central function to keep the code clean and readable
 *  @param {string} id: The id of the user we need to find
 *  @returns {object} user: The user object we need to return to the front
 *  @throws: If the user is not found or if the user is not active
 *
 */
module.exports = async (id) => {
  try {
    const user = await User.findById(id).select(`-__v -createdAt -updatedAt`);
    if (!user) {
      throw new Error("User not found, or user is not active");
    }
    const isAdmin = user.role === "admin";
    user.role = undefined;
    return {
      ...user._doc,
      token: generateToken(user._id),
      isAdmin,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

