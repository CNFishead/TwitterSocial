const asyncHandler = require("../../middleware/async");
const errorHandler = require("../../middleware/error.js");
module.exports = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.error(error);
    errorHandler(error, req, res);
  }
});
