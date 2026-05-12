/* Importing the mongoose module and the Schema class from the mongoose module. */
const mongoose = require("mongoose");
const { Schema } = mongoose;
/* Creating a schema for the user model. */
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
refreshToken:String,
  likedRecipes: [
    {
     type: mongoose.Schema.Types.ObjectId,
       ref: "Recipe"
    },
  ],
  profileImage: {
     url: {
      type: String,
       default: "UserImages/default.jpg"
    },
    publicId: {
      type: String,
    }
  },
  username: {
    type: String,
  },
  bio:String,
  totalRecipes: {
    type: Number,
    default: 0,
  },
  totalComments: {
    type: Number,
    default: 0,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
 name:String,
},{timestamps:true});
userSchema.index({email:1})
userSchema.index({createdAt:-1})

/* Exporting the model to be used in other files. */
User = mongoose.model("User", userSchema);
module.exports = User;
