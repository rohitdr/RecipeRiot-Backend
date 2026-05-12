const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  comment: {
    type: String,
    required: true
  },

  rating: {
    type: Number,
    min: 1,
    max: 5
  },


},{timestamps:true})

module.exports = mongoose.model("Comment", CommentSchema)