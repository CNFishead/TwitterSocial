const asyncHandler = require("../../middleware/asyncHandler.js");
const path = require("path");
const slugify = require("slugify");
const User = require("../../models/User.js");
const errorHandler = require("../../middleware/errorHandler.js");
const userObject = require("../../utils/userObject.js");
const Post = require("../../models/Post.js");
// const sharp = require("sharp");

/* 
  @Desc:   Uploads a photo to the images folder
  @Route:  POST /api/projects
  @Access: Private/Admin
*/
module.exports = asyncHandler(async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ message: `Please upload a file` });
    }

    const file = req.files.croppedImage;
    // make sure image is a photo
    if (!file.mimetype.startsWith("image")) {
      return res
        .status(400)
        .json({ message: `Please make sure to upload an image` });
    }
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return res.status(400).json({
        message: `File was too large, please upload an image less than ${process.env.MAX_FILE_UPLOAD} or 1MB`,
      });
    }

    // ***NOTE*** Path.parse() returns a {}, youll need to .name to access {name: String} for slugify
    console.log(req.headers.filename);
    // get the filename from the req.headers filename property
    const fileName = req.headers.filename;

    // Create custom filename
    file.name =
      slugify(`${fileName}`, { lower: true }) + `-photo${Date.now()}.png`;

    file.mv(
      `${process.env.FILE_UPLOAD_PATH}/images/${file.name}`,
      async (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: `Problem with file being moved to filesystem.` });
        }
        // insert filename into database
        // if you go to (http://localhost:5000/uploads/:filename) itll display the image.
        // In production change localhost to whatever the servername is and itll serve up the image from the uploads
        // folder
        // This route is specifically for the uploads of profile pictures, therefore we need to change the imageURL of the user and send back the new
        // user object to the client
        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
          profileImageUrl: `/images/${file.name}`,
        });

        // update all of the users Posts with the new imageURL
        // await Post.updateMany(
        //   {
        //     user: req.user._id,
        //   },
        //   {
        //     $set: {
        //       profileImageUrl: `/images/${file.name}`,
        //     },
        //   }
        // );

        // Tell the client the upload was successful and send back the file sharing link
        res.status(201).json({
          success: true,
          user: await userObject(updatedUser._id),
        });
      }
    );
  } catch (e) {
    errorHandler(e, req, res, next);
  }
});
