const Recipe = require("../Modals/Recipe.js");
const AppError = require("../Utils/AppError.js");
const Comments = require('../Modals/Comments.js');
const User = require("../Modals/User.js");
const cloudinary = require("../Config/cloudinary");
const getUser=async (userId) => {

    const [user,recipes,comments]=await Promise.all([
  User.findById(userId).select("-password"),
    Recipe.countDocuments({user:userId}),
     Comments.countDocuments({user:userId})
    ])
    if(!user){
        throw new AppError(404, "User Not Found")
    
    }
    return {...user.toObject(),recipes,comments}
  

}
const likedRecipes=async (userId,page,limit) => {

    const user = await User.findById(userId).select("likedRecipes")
    if (!user) {
  throw new AppError(404, "User not found");
}

if (!user.likedRecipes.length) {
  return {
    recipes: [],
    totalResults: 0,
    totalPages: 0,
  };
}
 const [recipes, totalResults] = await Promise.all([
    Recipe.find({ _id: { $in: user.likedRecipes } })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "profileImage username"),

    Recipe.countDocuments({ _id: { $in: user.likedRecipes } })
  ]);
  return {recipes, totalResults,totalPages:Math.ceil(totalResults/limit)}
 
}
const userRecipes=async (userId,page,limit) => {
  
   const [recipes, totalResults] = await Promise.all([
    Recipe.find({ user: userId})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "profileImage username"),

    Recipe.countDocuments({ user: userId })
  ]);
  return {
   recipes, totalResults,totalPages:Math.ceil(totalResults/limit)
  }


}
const updateUser = async (userId,{ username, email, phoneNumber, name, bio, image }) => {
  const updateData = {};

  if (bio) updateData.bio = bio;
  if (name) updateData.name = name;

  const [usernameExists, emailExists, phoneExists] = await Promise.all([
    username
      ? User.findOne({
          username,
          _id: { $ne: userId }
        })
      : null,

    email
      ? User.findOne({
          email,
          _id: { $ne:userId }
        })
      : null,

    phoneNumber
      ? User.findOne({
          phoneNumber,
          _id: { $ne: userId }
        })
      : null
  ]);

  if (usernameExists) {
    throw new AppError(409,"Username already exists")
  }

  if (emailExists) {
      throw new AppError(409,"Email already linked with another account")
  }

  if (phoneExists) {
      throw new AppError(409, "Phone number already linked with another account")
  }

  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (phoneNumber) updateData.phoneNumber = phoneNumber;

  if (image) {
    const user = await User.findById(req.user.id);

    if (user?.profileImage?.publicId) {
      await cloudinary.uploader.destroy(
        user.profileImage.publicId
      );
    }

    updateData.profileImage = image;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $set: updateData },
    { new: true }
  );
        return updatedUser
};
const likeRecipe=async (userId,likedRecipeId) => {

 const user=await User.findById(userId)
 if (!user) {
      throw new AppError(404,"User not found")

  }
    const likedRecipes=user.likedRecipes || []
   const isLiked = likedRecipes.includes(likedRecipeId) 
if (isLiked) {
  await User.findByIdAndUpdate(userId, {
    $pull: {
      likedRecipes: likedRecipeId
    }
  })
  return {message:"Recipe Removed from your liked List"}
} else {
  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      likedRecipes: likedRecipeId

    }
  })
    return {message:"Recipe Added To your liked List"}
}
   
 
}
module.exports={getUser,likedRecipes,userRecipes,updateUser,likeRecipe}