/* Importing the mongoose library and the schema from mongoose. */
const mongoose = require("mongoose");
const { Schema } = mongoose;
/* Creating a new schema for the database. */
const ContactSchema = new Schema({
  Name: {
    type: String,
  },
  Message: {
    type: String,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Email: {
    type: String,
  },
  Subject: {
    type: String,
  },
});
module.exports = mongoose.model("Contact", ContactSchema);
