const express = require("express");
const fetchuser = require("../Middleware/fetchuser");
const Recipe = require("../Modals/Recipe.js");
const router = express.Router();
const { body, validationResult } = require("express-validator");

//fectching all recipes
router.get("/allRecipes", fetchuser, async (req, res) => {
  try {
    const recipe = await Recipe.find({ user: req.user.id });
    
    const recipe_lenght=recipe.length
    if(recipe_lenght==0){
      res.status(400).send("Their is no Recipes avialable in database")
    }
    res.json({recipe});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//crating  or adding a new Recipe , login require
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
    } = req.body;
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
    });
    const savedRecipe = await recipe.save();
    res.json(savedRecipe);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});
//updating a existing recipe , login required
router.put('/updateRecipe/:id', fetchuser, async (req, res) => {
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
    if (cautions) {
      newrecipe.cautions= cautions
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
        newrecipe.label= label
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
   let recipe = await Recipe.findById(req.params.id)
   //checking recipe exist of not 
   if(!recipe){
    return res.status(404).send(" Recipe not found")
   }
   //allowing only owner to update the recipe
   if(recipe.user.toString() !== req.user.id){
    return res.status(401).send("Not allowed")
   }
 recipe =await Recipe.findByIdAndUpdate(req.params.id,{$set:newrecipe},{new:true})
 res.json(recipe)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
});
//deleting a recipe
router.delete('/deleteRecipe/:id',fetchuser,async(req,res)=>{
    try{
        //finding the Recipe
        let recipe = await Recipe.findById(req.params.id)
        if(!recipe){
            return res.status(404).send("Recipe not found")
        }
        //verfing user
        if(recipe.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
           }
           recipe = await Recipe.findByIdAndDelete(req.params.id)
           res.json({"succes":"Recipe has been deleted",recipe:recipe})

    }catch(error){
        console.log(error.message)
        res.status(500).send("INTERNAL SERVER ERROR")
    }
})
//feching recipe by name
router.get("/allRecipeswith/:name", async (req, res) => {
    try {
        const exp = req.params.name;
      const recipe = await Recipe.find( { 'label' : { '$regex' : exp} } )
      if(recipe.length===0){
        return res.status(404).send("Recipe not found")
      }
      
      const recipe_lenght=recipe.length
      res.json({recipe,count : recipe_lenght});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  //feching recipe by dietLabels
router.get("/allRecipeswithdietLabels/:diet_label", async (req, res) => {
    try {
        const exp = req.params.diet_label;
      const recipe = await Recipe.find( { 'dietLabels' : { '$regex' : exp} } )
      if(recipe.length===0){
        return res.status(404).send("Recipe not found")
      }
      
      const recipe_lenght=recipe.length
      res.json({recipe,count : recipe_lenght});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  /// fecthing all recipes sorting by time
  router.get("/LatestRecipes", async (req, res) => {
    try {
        
      const recipe = await Recipe.find().sort( { date:-1 } )
      if(recipe.length===0){
        return res.status(404).send("Recipe not found")
      }
      
      const recipe_lenght=recipe.length
      res.json({recipe,count : recipe_lenght});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
module.exports = router;

