const express = require("express");
const { protect, admin } = require("../middleware/auth.js");
const imageController = require("../controllers/Uploads/imageController.js");
const profilePic = require("../controllers/Uploads/profilePic.js");
const coverPhoto = require("../controllers/Uploads/coverPhoto.js");

const router = express.Router();
// Want protect and admin for all routes.
// anything below these routes, will use these middlewares.
// this is useful if ALL routes need a specific middleware.
router.route("/").post(protect, admin("admin"), imageController);
router.use(protect);

// Will upload an image to the images folder and return a path directory.
router.route("/profilePic").post(profilePic);
router.route("/coverPhoto").post(coverPhoto);

// Will upload a new resume to data
// router.route('/resume').post('')

module.exports = router;
