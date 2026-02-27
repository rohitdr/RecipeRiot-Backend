/* Exporting the variables from the .env file. */
module.exports={
    jwtSecret:process.env.jwtSecret,
    Mongoose_uri:process.env.Mongoose_uri,
    AdminEmail:process.env.AdminEmail,
    cloudinary_cloud_name:process.env.cloudinary_cloud_name,
    cloudinary_api_secret:process.env.cloudinary_api_secret,
    cloudinary_api_key:process.env.cloudinary_api_key

}