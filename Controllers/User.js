const asyncHandler=require('../Utils/asyncHandler.js')
const User = require("../Modals/User.js");
const Recipe = require("../Modals/Recipe.js");
const Comments = require('../Modals/Comments.js');

const getUser=asyncHandler(async (req, res) => {

    const userId = req.user.id;
    const [user,recipes,comments]=await Promise.all([
  User.findById(userId).select("-password"),
    Recipe.countDocuments({user:userId}),
     Comments.countDocuments({user:userId})
    ])
    if(!user){
       return res.status(404).json({success:false, message: "User Not Found"});
    }
  
    res.status(200).json({success:true,user:{...user.toObject(),recipes,comments}});

})
const likedRecipes=asyncHandler(async (req, res) => {

    const userId = req.user.id;
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15
    const user = await User.findById(userId).select("likedRecipes")
     if(!user || !user.likedRecipes.length){
       return res.status(200).json({success:true,recipes:[]});
    }
 const [recipes, totalResults] = await Promise.all([
    Recipe.find({ _id: { $in: user.likedRecipes } })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "profileImage username"),

    Recipe.countDocuments({ _id: { $in: user.likedRecipes } })
  ]);
    res.status(200).json({success:true, recipes: recipes, totalResults,totalPages:Math.ceil(totalResults/limit)});
 
})
const userRecipes=asyncHandler(async (req, res) => {
  
  
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15
   const [recipes, totalResults] = await Promise.all([
    Recipe.find({ user: req.user.id})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "profileImage username"),

    Recipe.countDocuments({ user: req.user.id })
  ]);

    res.status(200).json({success:true, recipes: recipes, totalResults,totalPages:Math.ceil(totalResults/limit)});

})
const updateUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, name, bio, image } = req.body;

  const updateData = {};

  if (bio) updateData.bio = bio;
  if (name) updateData.name = name;

  const [usernameExists, emailExists, phoneExists] = await Promise.all([
    username
      ? User.findOne({
          username,
          _id: { $ne: req.user.id }
        })
      : null,

    email
      ? User.findOne({
          email,
          _id: { $ne: req.user.id }
        })
      : null,

    phoneNumber
      ? User.findOne({
          phoneNumber,
          _id: { $ne: req.user.id }
        })
      : null
  ]);

  if (usernameExists) {
    return res.status(409).json({
      success: false,
      message: "Username already exists"
    });
  }

  if (emailExists) {
    return res.status(409).json({
      success: false,
      message: "Email already linked with another account"
    });
  }

  if (phoneExists) {
    return res.status(409).json({
      success: false,
      message: "Phone number already linked with another account"
    });
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

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser
  });
});
const likeRecipe=asyncHandler(async (req, res) => {

    const { likedRecipeId} = req.body;
    const userId= req.user.id
 const user=await User.findById(userId)
 if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
    const likedRecipes=user.likedRecipes || []
   const isLiked = likedRecipes.includes(likedRecipeId) 
if (isLiked) {
  await User.findByIdAndUpdate(userId, {
    $pull: {
      likedRecipes: likedRecipeId
    }
  })
  return res.status(200).json({success:true,message:"Recipe Removed from your liked List"});
} else {
  await User.findByIdAndUpdate(userId, {
    $addToSet: {
      likedRecipes: likedRecipeId

    }
  })
    return res.status(200).json({success:true,message:"Recipe Added To your liked List"});
}
   
 
})
module.exports={likedRecipes,getUser , updateUser,likeRecipe, userRecipes}
