const express = require('express');
const fetchuser = require('../Middleware/fetchuser');
const Recipe = require('../Modals/Recipe.js')
const router = express.Router();
const { body, validationResult } = require('express-validator');
//fectching all recipes
router.get('/allRecipes',fetchuser,async(req,res)=>{
try{
const recipe = await Recipe.find({user:req.user.id})
res.json(recipe)
}
catch(error){
    console.log(error.message)
    res.status(500).send("Internal Server Error")
}

})
//crating a note or add a new Recipe , login require
router.post('/addRecipe',fetchuser,async(req,res)=>{
try{
    const ingredients_text1=req.body.ingredients[1].text
    const ingredients_text2=req.body.ingredients[2].text
    const ingredients_text3=req.body.ingredients[3].text
    const ingredients_weight=req.body.ingredients.weight
    const ingredients_image=req.body.ingredients.image

const {totalTime,totalWeight,calories,ingredientLines,cautions,healthLabels,dietLabels,source,image,label,dishType,mealType,cuisineType}=req.body
const recipe = new Recipe({
    totalTime,totalWeight,calories,ingredientLines,cautions,healthLabels,dietLabels,source,image,label,dishType,mealType,cuisineType,user:req.user.id,
    ingredients_image,ingredients_text,ingredients_weight
})
const savedRecipe = await recipe.save();
 res.json(savedRecipe)
}catch(error){
    console.log(error.message)
    res.status(500).send("Internal Server Error")
}
})
module.exports=router