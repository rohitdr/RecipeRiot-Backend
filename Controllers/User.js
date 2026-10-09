const asyncHandler=require('../Utils/asyncHandler.js')
const user = require('../services/user.services.js');

const getUser=asyncHandler(async (req, res) => {
 const user=await user.getUser(req.user.id)
  
    res.status(200).json({success:true,user})

})
const likedRecipes=asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 15
    const likedRecipes=await user.likedRecipes(req.user.id,page,limit)
    res.status(200).json({success:true,...likedRecipes});
})
const userRecipes=asyncHandler(async (req, res) => {
  
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 15
  const recipes =await user.userRecipes(req.user.id,page,limit)
    res.status(200).json({success:true,...recipes});

})
const updateUser = asyncHandler(async (req, res) => {
  const updatedUser=await user.updateUser(req.user.id,req.body)
  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser
  });
});
const likeRecipe=asyncHandler(async (req, res) => {

  const {message}=await user.likeRecipe(req.user.id,req.body.likedRecipeId)
    return res.status(200).json({success:true,message});
})
module.exports={likedRecipes,getUser , updateUser,likeRecipe, userRecipes}
