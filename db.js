/* Importing the `mongoose` module. */
const mongoose = require("mongoose");
/* Importing the `Mongoose_uri` from the `Keys.js` file. */
const { Mongoose_uri } = require("./Config/Keys");
/**
 * It connects to the mongoose database.
 */
const mongooseConnectToDb = async () => {
  try {
    await mongoose.connect(Mongoose_uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
/* Exporting the function `mongooseConnectToDb` to be used in other files. */
module.exports = mongooseConnectToDb;
