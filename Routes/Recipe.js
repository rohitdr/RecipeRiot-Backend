/* Importing the required packages and modules. */
const express = require("express");
const fetchuser = require("../Middleware/fetchUser");
const Recipe = require("../Modals/Recipe.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../Middleware/fetchUser");
const User = require("../Modals/User.js");


/* Fetching all the recipes from the database. */
router.get("/allRecipes", fetchuser, async (req, res) => {
  try {
    const recipe = await Recipe.find({ user: req.user.id });

    const recipe_lenght = recipe.length;
    if (recipe_lenght == 0) {
      return res.status(404).json({error:"Their is no Recipes avialable in database"});
    }

    res.status(200).json({ recipe: recipe, totalResults: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/* Fetching the recipe by id. */
router.get("/recipebyid/:id", fetchuser, async (req, res) => {
  try {
    const recipe = await Recipe.find({ _id: req.params.id });

    const recipe_lenght = recipe.length;
    if (recipe_lenght == 0) {
      return res
        .status(404)
        .json({error:"Their is no Recipes avialable in database with this id"});
    }

    res.status(200).json({ recipe });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//crating  or adding a new Recipe , login require
/* The above code is adding a recipe to the database. */
router.post("/addRecipe", fetchuser, async (req, res) => {
  try {
    const {
      totalTime,
      totalWeight,
      calories,
      ingredientLines,
      cautions,
      healthLabels,
      dietLabels,
      source,
      image,
      label,
      dishType,
      mealType,
      cuisineType,
      ingredients,
      totalNutrients,
      instruction,
    } = req.body;
    const userdata=await User.findById(req.user.id)
    const recipe = new Recipe({
      totalTime,
      totalWeight,
      calories,
      ingredientLines,
      cautions,
      healthLabels,
      dietLabels,
      source,
      image,
      label,
      dishType,
      mealType,
      cuisineType,
      user: req.user.id,
      ingredients,
      totalNutrients,
      instruction,
      userData:userdata
    });
    const user = await User.findById(req.user.id);

    const newtotalrecipenumber = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { Total_Recipes: user.Total_Recipes + 1 } }
    );
    const savedRecipe = await recipe.save();
    res.status(200).json(savedRecipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//updating a existing recipe , login required
/* The above code is updating the recipe. */
router.put("/updateRecipe/:id", fetchuser, async (req, res) => {
  try {
    const {
      totalTime,
      totalWeight,
      calories,
      ingredientLines,
      cautions,
      healthLabels,
      dietLabels,
      source,
      image,
      label,
      dishType,
      mealType,
      cuisineType,
      ingredients,
      totalNutrients,
      instruction,
    } = req.body;

    const newrecipe = {};
    if (totalTime) {
      newrecipe.totalTime = totalTime;
    }
    if (totalWeight) {
      newrecipe.totalWeight = totalWeight;
    }
    if (calories) {
      newrecipe.calories = calories;
    }
    if (ingredientLines) {
      newrecipe.ingredientLines = ingredientLines;
    }
    if (instruction) {
      newrecipe.instruction = instruction;
    }
    if (cautions) {
      newrecipe.cautions = cautions;
    }
    if (healthLabels) {
      newrecipe.healthLabels = healthLabels;
    }
    if (dietLabels) {
      newrecipe.dietLabels = dietLabels;
    }
    if (source) {
      newrecipe.source = source;
    }
    if (image) {
      newrecipe.image = image;
    }
    if (label) {
      newrecipe.label = label;
    }
    if (dishType) {
      newrecipe.dishType = dishType;
    }
    if (mealType) {
      newrecipe.mealType = mealType;
    }
    if (cuisineType) {
      newrecipe.cuisineType = cuisineType;
    }
    if (ingredients) {
      newrecipe.ingredients = ingredients;
    }
    if (totalNutrients) {
      newrecipe.totalNutrients = totalNutrients;
    }
    let recipe = await Recipe.findById(req.params.id);
    //checking recipe exist of not
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    //allowing only owner to update the recipe

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: newrecipe },
      { new: true }
    );
    res.json(recipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});
//deleting a recipe
/* The above code is deleting a recipe from the database. */
router.delete("/deleteRecipe/:id", fetchuser, async (req, res) => {
  try {
    //finding the Recipe
    let recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({error:"Recipe not found"});
    }
    //verfing user
    if (recipe.user.toString() !== req.user.id) {
      return res.status(404).json({error:" You Are Not allowed"});
    }
    recipe = await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ succes: "Recipe has been deleted", recipe: recipe });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});
//feching recipe by name
/* Searching for a recipe with a name that contains the name that is passed in the url. */
router.get("/allRecipeswith/:name", async (req, res) => {
  try {
    const exp = req.params.name;

    const recipe = await Recipe.find({ label: { $regex: exp, $options: "i" } });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fetching all reicpes of database for admin
/* The above code is fetching all the recipes from the database and sending it to the client. */
router.get("/AdminGetAllRecipes", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (user.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    let allRecipe = await Recipe.find();
    res.status(200).json({ AllRecipe: allRecipe });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fetching all reicpes of database for admin according to date
/* The above code is fetching all the recipes from the database and sending it to the client side. */
router.get("/AdminGetAllRecipesByDate", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (user.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    let allRecipe = await Recipe.find().sort({ date: -1 });
    res.status(200).json({ AllRecipe: allRecipe });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//feching recipe by dietLabels
/* The above code is a GET request that is searching for a recipe with a specific diet label. */
router.get("/allRecipeswithdietLabels/:diet_label", async (req, res) => {
  try {
    const exp = req.params.diet_label;
    const recipe = await Recipe.find({ dietLabels: exp });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//feching recipe by cusineType
/* The above code is a route that is used to get all the recipes with a specific cuisine type. */
router.get("/allRecipeswithcuisinetype/:cuisine_Type", async (req, res) => {
  try {
    const type = req.params.cuisine_Type;
    const recipe = await Recipe.find({ cuisineType: type });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }
    recipe.map( async (element)=>{
      const user = await User.findById(element.user)
     
      const updatereciep=await Recipe.findOneAndUpdate({user:element.user},{$set:{userData:user}})
     })
    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//feching recipe by health tags
/* The above code is a route that is used to get all recipes with a specific health label. */
router.get("/allRecipeswithhealthlabels/:health", async (req, res) => {
  try {
    const type = req.params.health;
    const recipe = await Recipe.find({ healthLabels: type });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fetching all recipe with specific mealtype
/* The above code is a route that is used to get all recipes with a specific meal type. */
router.get("/allRecipeswithmealtype/:mealtype", async (req, res) => {
  try {
    const type = req.params.mealtype;
    const recipe = await Recipe.find({ mealType: type });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fetching all recipe with meal type lunchdinenr
/* The above code is a GET request to the server to get all the recipes with the mealType of
lunch/dinner. */
router.get("/allRecipeswithmealtypelunchdinner", async (req, res) => {
  try {
    const recipe = await Recipe.find({ mealType: "lunch/dinner" });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fetching all recipe with meal type lunchdinenr
/* The above code is a route that is used to get all the recipes with a specific dish type. */
router.get("/allRecipeswithdishtype/:dishtype", async (req, res) => {
  try {
    const type = req.params.dishtype;
    const recipe = await Recipe.find({ dishType: type });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
/// fecthing all recipes sorting by time
/* Getting the latest recipes from the database. */
router.get("/LatestRecipes", async (req, res) => {
  try {
    const recipe = await Recipe.find().sort({ date: -1 });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }
   
   recipe.map( async (element)=>{
    const user = await User.findById(element.user)
   
    const updatereciep=await Recipe.findOneAndUpdate({user:element.user},{$set:{userData:user}})
   })
    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fetching all latest recipe by id
/* Fetching the latest recipe by id. */
router.get("/LatestRecipesbyid", fetchUser, async (req, res) => {
  try {
    const recipe = await Recipe.find({ user: req.user.id }).sort({ date: -1 });
    if (recipe.length === 0) {
      return res.status(404).json({error:"Recipe not found"});
    }

    const recipe_lenght = recipe.length;
    res.status(200).json({ recipe, count: recipe_lenght });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
/// Like a recipe
/* The above code is a route that is used to like a recipe. */
router.post("/like", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = req.body.id;

    const user = await User.findById(userId).select("Liked_Recipe");
    const likes = await Recipe.findById(recipeId).select("Likes");

    const LikesofRecipe = likes.Likes;
    const LikedRecipes = user.Liked_Recipe;
    if (LikedRecipes.includes(recipeId)) {
      return res.status(404).json({error:"Your already Liked this recipe"});
    }

    const NewLikedRecipes = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { Liked_Recipe: LikedRecipes.concat(recipeId) } }
    );
    const NewLikes = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { $set: { Likes: LikesofRecipe + 1 } }
    );

    res.status(200).json("success ! You had liked the recipe");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//unliking the recipe
/* The above code is for unliking a recipe. */
router.post("/unlike", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const recipeId = req.body.id;

    const user = await User.findById(userId).select("Liked_Recipe");
    const likes = await Recipe.findById(recipeId).select("Likes");

    const LikesofRecipe = likes.Likes;
    const LikedRecipes = user.Liked_Recipe;
    if (!LikedRecipes.includes(recipeId)) {
      return res.status(404).json({error:"Your already UnLiked this recipe"});
    }
    LikedRecipes.splice(LikedRecipes.indexOf(recipeId), 1);
    const NewLikedRecipes = await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { Liked_Recipe: LikedRecipes } }
    );
    const NewLikes = await Recipe.findByIdAndUpdate(
      { _id: recipeId },
      { $set: { Likes: LikesofRecipe - 1 } }
    );

    res.status(200).json("success ! You had Unliked the recipe");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//fectching all recipes by id
/* The above code is fetching all the liked recipes of the user. */
router.get("/allLikedRecipe", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (user.Liked_Recipe.length < 1) {
      return res.status(404).json({error:"You had Not liked any recipe yet"});
    }
    var recipe = [];
    for (let i = 0; i < user.Liked_Recipe.length; i++) {
      recipe[i] = await Recipe.findById(user.Liked_Recipe[i]);
    }

    res.status(200).json({LikedRecipe:recipe});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/// api for commenting on recipe
/* The above code is for commenting on a recipe. */
router.post("/commentreicpe", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(req.user.id);
    const recipe = await Recipe.findById(req.body.id);
    let state = true;

    let stateelement = recipe.Comments.filter((element) => {
      return element.user == req.user.id;
    });

    if (stateelement.length > 0) {
      return res.status(404).json({error:"You had already Comment on this recipe"});
    }
    const commentedRecipe = await Recipe.findByIdAndUpdate(
      { _id: req.body.id },
      { $set: { Comments: recipe.Comments.concat(req.body.comment) } }
    );
    const incrementTotalComment = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { Total_Comments: user.Total_Comments + 1 } }
    );
    const incrementTotalrating = await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: { Total_Ratings: user.Total_Ratings + 1 } }
    );


    res.status(200).json(commentedRecipe.Comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/* Updating the userData field in the Recipe collection with the user data from the User collection. */
// router.post("/upadtinmodal",  async (req, res) => {
//   try {
//     var recipe;
//    const user = await User.find();

//        user.map( async(element)=>{
// var totalcomment=0
//       recipe= await Recipe.find({user:element._id})
//         recipe.map((element)=>{
//                totalcomment=totalcomment+ element.Comments.length
//         })
//         const currentuser = await User.findByIdAndUpdate({_id:element._id},{$set:{Total_Comments:totalcomment}})
       
//        })
//        res.status(200).send(user);
   
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });
module.exports = router;
