const asyncHandler = require("../../middleware/asyncHandler.js");
const path = require("path");
const slugify = require("slugify");
// const sharp = require("sharp");

/* 
  @Desc:   Uploads a photo to the images folder
  @Route:  POST /api/projects
  @Access: Private/Admin
*/
module.exports = asyncHandler(async (req, res, next) => {
  console.log(req);
  if (!req.files) {
    return res.status(400).json({ message: `Please upload a file` });
  }

  const file = req.files.file;
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
  const fileName = path.parse(file.name);

  // Create custom filename
  file.name =
    slugify(`${fileName.name}`, { lower: true }) +
    `-photo${path.parse(file.name).ext}`;

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
      console.log(`${process.env.FILE_UPLOAD_PATH}/images/${file.name}`);
      try {
        // Tell the client the upload was successful and send back the file sharing link
        res.status(201).json({
          success: true,
          data: `/images/${file.name}`,
        });
      } catch (e) {
        console.log(e);
      }
    }
  );
});
