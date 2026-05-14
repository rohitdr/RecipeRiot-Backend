const asyncHandler=require('../Utils/asyncHandler.js')
const Recipe = require("../Modals/Recipe.js");
const cloudinary = require("../Config/cloudinary");
const getRecipeByCategory=asyncHandler(async (req, res) => {
    let {categoryType,categoryName}=req.params;
   if(categoryName==="lunch" || categoryName ==="dinner")
   {
    categoryName="lunch/dinner"
   }
    const sort=req.query.sort
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 15
     let sortOption =  { createdAt: -1 };

     if (sort === "trending") sortOption = { views: -1 };
  if (sort === "topRated") sortOption = { likes: -1 };
  if (sort === "minuteMeals") sortOption = { totalTime: 1 };
  if (sort === "lowCalories") sortOption = { calories: 1 };
  if (sort === "highCalories") sortOption = { calories: -1 };



     const query = {
    [categoryType]: { $in: [categoryName] }
  };

  const [recipes, totalResults] = await Promise.all([
    Recipe.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("user", "profileImage username")
      .lean(),

    Recipe.countDocuments(query)
  ]);
   if (!recipes.length) {
    return res.status(404).json({
      success: false,
      message: "No recipes found"
    });
  }

    res.status(200).json({ recipe: recipes, totalResults,totalPages:Math.ceil(totalResults/limit)});
  
})
const recipeById=asyncHandler(async (req, res) => {

    const recipe = await Recipe.findByIdAndUpdate(req.params.id,{$inc:{views:1}},{new:true})
    if (!recipe) {
      return res
        .status(404)
        .json({success:false,message:"Their is no Recipes avialable in database with this id"});
    }
    res.status(200).json({success:true, recipe });

})
const trendingRecipe=asyncHandler( async (req, res) => {

    const recipes = await Recipe.find().sort({views:-1}).limit(7).populate("user","profileImage username")
    if (!recipes.length) {
      return res
        .status(404)
        .json({success:false,message:"Their is no Recipes avialable in database with this id"});
    }
  
    res.status(200).json({success:true, recipes });
 
})
const featuredRecipes=asyncHandler( async (req, res) => {

    const recipes = await Recipe.find().sort({Likes:-1}).limit(5).populate("user","profileImage username")
    if (!recipes.length) {
      return res
        .status(404)
        .json({success:false,message:"Their is no Recipes avialable in database with this id"});
    }
  
    res.status(200).json({success:true, recipes });
 
})
const addRecipe=asyncHandler(async (req, res) => {
  const {label,link}=req.body
  const existingRecipe = await Recipe.findOne({
  user: req.user.id,
  label: {
    $regex: `^${label.trim()}$`,
    $options: "i"
  }
});
if (existingRecipe) {
  return res.status(409).json({success:false,
    message: "You already added this recipe"
  });
}
if(!link)  {
 const recipe = await Recipe.create({
    ...req.body,
    user: req.user.id
  });

  return res.status(201).json({success:true,id:recipe._id,message:"Success your have added the recipe"});

} 
const imageUpload = await cloudinary.uploader.upload(
  req.body.image.url,
  {
    folder: "recipes"
  }
);
 const recipe = await Recipe.create({
    ...req.body,
   image:{url:imageUpload.secure_url,publicId:imageUpload.public_id},
    user: req.user.id
  });
  res.status(201).json({success:true,id:recipe._id,message:"Success your have added the recipe"});
 
})
const editRecipe=asyncHandler( async (req, res) => {
 
    const recipeId=req.params.id
    const {link}=req.body
   const recipe=await Recipe.findById(recipeId)
   if(!recipe){
    return res.status(404).json({success:false,message:"Recipe Not Found"})
   }
   if (recipe.user.toString() !== req.user.id) {
  return res.status(403).json({
    success: false,
    message: "You are not allowed to edit this recipe"
  });
}

   const allowedUpdates = {
    label: req.body.label,
    totalTime: req.body.totalTime,
    totalWeight: req.body.totalWeight,
    calories: req.body.calories,
    ingredientLines: req.body.ingredientLines,
    healthLabels: req.body.healthLabels,
    dietLabels: req.body.dietLabels,
    source: req.body.source,
    dishType: req.body.dishType,
    mealType: req.body.mealType,
    cuisineType: req.body.cuisineType,
    totalNutrients: req.body.totalNutrients,
    image:req.body.image
  };
  if(link){
  const imageUpload = await cloudinary.uploader.upload(
  req.body.image.url,
  {
    folder: "recipes"
  }
);
allowedUpdates.image={url:imageUpload.secure_url,publicId:imageUpload.public_id}
}
   Object.keys(allowedUpdates).forEach(
    key => allowedUpdates[key] === undefined && delete allowedUpdates[key]
  );
    const updateRecipe =await Recipe.findByIdAndUpdate(req.params.id,allowedUpdates,{new:true})
    res.status(200).json({success:true,message:"Success your have Updated the recipe"});
 
})
const deleteRecipe=asyncHandler( async (req, res) => {

    //finding the Recipe
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({success:false,message:"Recipe not found"});
    }
    //verfing user
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({success:false,message:" You Are Not allowed"});
    }
    if(recipe?.image?.publicId){
  await cloudinary.uploader.destroy(recipe.image.publicId);
    }
    recipe = await Recipe.findByIdAndDelete(req.params.id);
  
    res.status(200).json({ success:true,message: "Recipe has been deleted" });
 
})
const searchRecipe=asyncHandler(async (req, res) => {

    const name = req.params.name;
    const page=Number(req.query.page) || 1
    const limit=Number(req.query.limit) || 15
  
 const query = {
    label: { $regex: name, $options: "i" }
  };

  const [recipes, totalResults] = await Promise.all([
    Recipe.find(query)
      .skip((page - 1) * limit)
      .limit(limit),

    Recipe.countDocuments(query)
  ]);
    if (!recipes.length) {
      return res.status(200).json({success:false,message:"Recipe not found",recipe:[]});
    }



    res.status(200).json({success:true, recipe: recipes, totalResults,totalPages:Math.ceil(totalResults/limit) });
 
})

module.exports={recipeById,getRecipeByCategory,trendingRecipe,featuredRecipes,addRecipe,editRecipe,deleteRecipe,searchRecipe}