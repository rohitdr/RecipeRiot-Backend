/* Exporting the variables from the .env file. */
module.exports={
    jwtSecret:process.env.jwtSecret,
    Mongoose_uri:process.env.Mongoose_uri
}