const cloudinary= require('cloudinary').v2;
const { cloudinary_api_secret,cloudinary_api_key,cloudinary_cloud_name } = require("./Keys");
cloudinary.config({
  cloud_name: cloudinary_cloud_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret,
  timeout: 600000
});
module.exports=cloudinary;