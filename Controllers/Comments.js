const asyncHandler=require('../Utils/asyncHandler.js')
const comments = require('../services/comments.services.js');
const addComment=asyncHandler(async(req,res)=>{
  const {newComment}= await comments.addComment(req.body,req.user.id)
    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment
    })

})
const getComments=asyncHandler(async(req,res)=>{
    
     const page=Number(req.query.page) || 1
     const limit=Number(req.query.limit) || 5
 const {totalResults,totalPages,comments}=await comments.getComments(req.params.recipeId,page,limit)

    res.status(200).json({
      success: true,
      totalResults,
      totalPages,
      comments
    })

})
module.exports={addComment,getComments}