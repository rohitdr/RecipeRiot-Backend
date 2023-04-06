/* Importing the `mongoose` module. */
const mongoose = require("mongoose");
/* Importing the `Mongoose_uri` from the `Keys.js` file. */
// const { Mongoose_uri } = require("./Config/Keys");
 const Mongoose_uri=process.env.Mongoose_uri
/**
 * It connects to the mongoose database.
 */
const mongooseConnectToDb = () => {
  mongoose.connect(Mongoose_uri, () => {
    console.log("connected to mongo db");
  });
};
/* Exporting the function `mongooseConnectToDb` to be used in other files. */
module.exports = mongooseConnectToDb;
