const multer = require("multer");
const { CloudinaryStorage } =
  require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});
const uploadUserImage = multer({ storage });
module.exports = uploadUserImage;