const Recipe = require("../Modals/Recipe.js");
const AppError = require("../Utils/AppError.js");
const Comments = require('../Modals/Comments.js');
const addComment=async({comment,rating,recipeId},userId)=>{

    const recipe=await Recipe.findById(recipeId)
    if (!recipe) {
        throw new AppError(404,"Recipe not found")
    }
    const existingReview = await Comments.findOne({
  user: userId,
  recipe: recipeId
})
if(existingReview){
    throw new AppError(409,"You already Commented this recipe")
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
  return {newComment}

}

const getComments=async(recipeId,page,limit)=>{

 
   const recipe = await Recipe.findById(recipeId)
    if (!recipe) {
      throw new AppError(404,"Recipe not found")
    }
    const [comments, totalComments] = await Promise.all([
    Comments.find({ recipe: recipeId })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "username profileImage name"),

    Comments.countDocuments({ recipe: recipeId })
  ]);

    return {
         totalResults:totalComments,
      totalPages:Math.ceil(totalComments/limit),
      comments
    }
  
 

}

module.exports={addComment,getComments}