const asyncHandler=require('../Utils/asyncHandler.js')

const Recipe = require("../Modals/Recipe.js");
const Comments = require('../Modals/Comments.js');
const addComment=asyncHandler(async(req,res)=>{
    const userId=req.user.id 
    const {comment,rating,recipeId}=req.body
    const recipe=await Recipe.findById(recipeId)
    if (!recipe) {
      return res.status(404).json({success:false,message:"Recipe not found"});
    }
    const existingReview = await Comments.findOne({
  user: userId,
  recipe: recipeId
})
if(existingReview){
  return res.status(409).json({success:false,
  message: "You already Commented this recipe"
})
}
const numericRating = Number(rating)
  const totalRatings = (recipe.totalRatings || 0) + 1
const averageRating = Number(((
  (recipe.averageRating || 0) *
  (recipe.totalRatings || 0) +
  numericRating
) / totalRatings).toFixed(1))
    const newComment =await Comments.create({
      recipe:recipe._id,
      user:userId,
      comment,
      rating:numericRating,
    })
    await Recipe.findByIdAndUpdate(
  recipeId,
  {
    $inc: { totalComments: 1 },
     $set: {
      totalRatings,
      averageRating
    }
  }
)
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment
    })

})
const getComments=asyncHandler(async(req,res)=>{

   const recipeId=req.params.recipeId
   const page=Number(req.query.page) || 1
   const limit=Number(req.query.limit) || 5
   const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
      return res.status(404).json({success:false,message:"Recipe not found"});
    }
    const [comments, totalComments] = await Promise.all([
    Comments.find({ recipe: recipeId })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "username profileImage"),

    Comments.countDocuments({ recipe: recipeId })
  ]);
  if (!comments.length) {
      return res.status(200).json({success:true,comments:[]});
    }
  
    res.status(200).json({
      success: true,
      totalResults:totalComments,
      totalPages:Math.ceil(totalComments/limit),
      comments
    })

})
module.exports={addComment,getComments}