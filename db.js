/* Importing the `mongoose` module. */
const mongoose = require("mongoose");

/**
 * It connects to the mongoose database.
 */
const mongooseConnectToDb = async () => {
  try {
    await mongoose.connect(process.env.Mongoose_uri);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
/* Exporting the function `mongooseConnectToDb` to be used in other files. */
module.exports = mongooseConnectToDb;
