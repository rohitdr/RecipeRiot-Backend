const Recipe = require("../Modals/Recipe.js");
const AppError = require("../Utils/AppError.js");
const cloudinary = require("../Config/cloudinary");


const getRecipeByCategory=async ({categoryType,categoryName},sort , page, limit) => {

   if(categoryName==="lunch" || categoryName ==="dinner")
   {
    categoryName="lunch/dinner"
   }
   
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
    return { recipe: [], totalResults:0,totalPages:0}
  }

    return { recipe: recipes, totalResults,totalPages:Math.ceil(totalResults/limit)}
  
}
const recipeById=async (id) => {

    const recipe = await Recipe.findByIdAndUpdate(id,{$inc:{views:1}},{new:true})
    if (!recipe) {
        throw new AppError(404,"Their is no Recipes avialable in database with this id")
    }
   return recipe

}
const trendingRecipe= async () => {

    const recipes = await Recipe.find().sort({views:-1}).limit(7).populate("user","profileImage username")
    if (!recipes.length) {
       return {
        recipes:[]
    }
    }
  
   return { recipes }
 
}
const featuredRecipes= async () => {

    const recipes = await Recipe.find().sort({Likes:-1}).limit(5).populate("user","profileImage username")
     if (!recipes.length) {
       return {
        recipes:[]
    }
    }
  
    return { recipes }
 
}
const addRecipe=(async (userId,recipeData) => {
 const {link,label}=recipeData
  const existingRecipe = await Recipe.findOne({
  user: userId,
  label: {
    $regex: `^${label.trim()}$`,
    $options: "i"
  }
});
if (existingRecipe) {
    throw new AppError(409,"You already added this recipe")
}
if(!link)  {
 const recipe = await Recipe.create({
    ...recipeData,
    user: userId
  });

  return {id:recipe._id,message:"Success your have added the recipe"}

} 
const imageUpload = await cloudinary.uploader.upload(
  recipeData.image.url,
  {
    folder: "recipes"
  }
);
 const recipe = await Recipe.create({
    ...recipeData,
   image:{url:imageUpload.secure_url,publicId:imageUpload.public_id},
    user: userId
  });
  return {id:recipe._id,message:"Success your have added the recipe"}
 
})
const editRecipe= async (userId,recipeId,recipeData) => {

    const {link}=recipeData
   const recipe=await Recipe.findById(recipeId)
   if(!recipe){
    throw new AppError(404,"Recipe Not Found")
   }
   if (recipe.user.toString() !== userId) {
    throw new AppError(403,"You are not allowed to edit this recipe")

}

   const allowedUpdates = {
    label: recipeData.label,
    totalTime: recipeData.totalTime,
    totalWeight: recipeData.totalWeight,
    calories: recipeData.calories,
    ingredientLines:recipeData.ingredientLines,
    healthLabels: recipeData.healthLabels,
    dietLabels: recipeData.dietLabels,
    source: recipeData.source,
    dishType: recipeData.dishType,
    mealType: recipeData.mealType,
    cuisineType: recipeData.cuisineType,
    totalNutrients:recipeData.totalNutrients,
    image:recipeData.image
  };
  if(link){
  const imageUpload = await cloudinary.uploader.upload(
  recipeData.image.url,
  {
    folder: "recipes"
  }
);
allowedUpdates.image={url:imageUpload.secure_url,publicId:imageUpload.public_id}
}
   Object.keys(allowedUpdates).forEach(
    key => allowedUpdates[key] === undefined && delete allowedUpdates[key]
  );
  await Recipe.findByIdAndUpdate(recipeId,allowedUpdates,{new:true})
   
}
const deleteRecipe= async (userId,recipeId) => {

    //finding the Recipe
    let recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError(404,"Recipe not found")
    
    }
    //verfing user
    if (recipe.user.toString() !== userId) {
      throw new AppError(403,"You are not allowed to edit this recipe")
    }
    if(recipe?.image?.publicId){
  await cloudinary.uploader.destroy(recipe.image.publicId);
    }
    recipe = await Recipe.findByIdAndDelete(recipeId);
  
 
}
const searchRecipe=async (name,page,limit) => {
  
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
     return { recipe:[] , totalResults:0,totalPages:0 }
    }
    return { recipe: recipes, totalResults,totalPages:Math.ceil(totalResults/limit) }
 
}

module.exports={recipeById,getRecipeByCategory,trendingRecipe,featuredRecipes,addRecipe,editRecipe,deleteRecipe,searchRecipe}