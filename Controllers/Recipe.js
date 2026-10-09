const asyncHandler=require('../Utils/asyncHandler.js')
const Recipe = require("../Modals/Recipe.js");
const cloudinary = require("../Config/cloudinary");
const recipe = require('../services/recipe.services.js');
const getRecipeByCategory=asyncHandler(async (req, res) => {
     const sort=req.query.sort
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 15
    const recipes=await recipe.getRecipeByCategory(req.params,sort,page,limit)
    res.status(200).json({ ...recipes});
})
const recipeById=asyncHandler(async (req, res) => {

   const result=await recipe.recipeById(req.params.id)
    res.status(200).json({success:true, recipe:result });

})
const trendingRecipe=asyncHandler( async (req, res) => {

    const {recipes} =await recipe.trendingRecipe()

    res.status(200).json({success:true, recipes });
 
})
const featuredRecipes=asyncHandler( async (req, res) => {

   const {recipes} =await recipe.featuredRecipes()
  
    res.status(200).json({success:true, recipes });
 
})
const addRecipe=asyncHandler(async (req, res) => {

  const result = await recipe.addRecipe(req.user.id,req.body)
  res.status(201).json({success:true,...result});
 
})
const editRecipe=asyncHandler( async (req, res) => {
        await recipe.editRecipe(req.user.id,req.params.id,req.body)
    res.status(200).json({success:true,message:"Success your have Updated the recipe"});
 
})
const deleteRecipe=asyncHandler( async (req, res) => {
     await recipe.deleteRecipe(req.user.id,req.params.id)
    res.status(200).json({ success:true,message: "Recipe has been deleted" });
 
})
const searchRecipe=asyncHandler(async (req, res) => {

    const name = req.params.name;
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 15
    const result = await recipe.searchRecipe(name,page,limit)

    res.status(200).json({success:true, ...result });
 
})

module.exports={recipeById,getRecipeByCategory,trendingRecipe,featuredRecipes,addRecipe,editRecipe,deleteRecipe,searchRecipe}