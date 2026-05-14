/* Importing the required packages and modules. */
const express = require("express");
const fetchuser = require("../Middleware/fetchUser");

const router = express.Router();


const { getRecipeByCategory, recipeById, trendingRecipe, featuredRecipes, addRecipe, editRecipe, searchRecipe, deleteRecipe } = require("../Controllers/Recipe.js");
const rateLimiter = require("../Middleware/rateLimiter.js");
const handleValidation = require("../Middleware/handleValidation.js");
const { query,body, param } = require("express-validator");
const addRecipeValidation = [
  body("label")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Recipe title must be between 3-100 characters"),

  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required"),

  body("totalTime")
    .isNumeric()
    .withMessage("Total time must be a number"),

  body("totalWeight")
    .isNumeric()
    .withMessage("Total weight must be a number"),

  body("calories")
    .isNumeric()
    .withMessage("Calories must be a number"),

  body("ingredientLines")
    .isArray({ min: 1 })
    .withMessage("Ingredient lines are required"),

  body("healthLabels")
     .isArray({ min: 1 })
    .withMessage("Health labels must be an array"),

  body("dietLabels")
    .isArray({ min: 1 })
    .withMessage("Diet labels must be an array"),

  body("dishType")
    .isArray({ min: 1 })
    .withMessage("Dish type must be an array"),

  body("mealType")
    .isArray({ min: 1 })
    .withMessage("Meal type must be an array"),

  body("cuisineType")
   .isArray({ min: 1 })
    .withMessage("Cuisine type must be an array"),

  body("totalNutrients")
    .isObject()
    .withMessage("Total nutrients must be an object"),

  body("image")
    .isObject()
    .withMessage("Image must be an object"),

  body("image.url")
    .isURL()
    .withMessage("Invalid image URL"),

  body("image.publicId")
  .optional()
    .notEmpty()
    .withMessage("Image public id required")
];
const categoryValidation=[
    param('categoryName').isString().trim().notEmpty().withMessage("Choose a valid Category Name"),
    param('categoryType').isString().trim().notEmpty().withMessage("Choose a valid Category Type"),
    query('sort').isString().withMessage("Choose a valid sort Type"),
   query('page').isInt({min:1}).withMessage("Page must be greater than 0"),
    query('limit').isInt({min:1,max:30}).withMessage("Limit Must be Between 1 to 20")
]
const editRecipeValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid recipe ID"),

  body("label")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Label must be between 3 to 100 characters"),

  body("source")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Source cannot be empty"),

  body("totalTime")
    .optional()
    .isNumeric()
    .withMessage("Total time must be a number"),

  body("totalWeight")
    .optional()
    .isNumeric()
    .withMessage("Total weight must be a number"),

  body("calories")
    .optional()
    .isNumeric()
    .withMessage("Calories must be a number"),

  body("ingredientLines")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Ingredient lines must be a non-empty array"),

  body("healthLabels")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Health labels must be a non-empty array"),

  body("dietLabels")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Diet labels must be a non-empty array"),

  body("dishType")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Dish type must be a non-empty array"),

  body("mealType")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Meal type must be a non-empty array"),

  body("cuisineType")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Cuisine type must be a non-empty array"),

  body("totalNutrients")
    .optional()
    .isObject()
    .withMessage("Total nutrients must be an object"),

  body("image")
    .optional()
    .isObject()
    .withMessage("Image must be an object"),

  body("image.url")
    .optional()
    .isURL()
    .withMessage("Image URL must be valid"),

  body("image.public_id")
    .optional()
    .notEmpty()
    .withMessage("Image public_id cannot be empty")
];

router.get("/recipeByCategroy/:categoryType/:categoryName",rateLimiter({ MAX_REQUESTS:100, WINDOW_SIZE:60}),categoryValidation,handleValidation,getRecipeByCategory);

router.get("/recipebyid/:id",rateLimiter({ MAX_REQUESTS:30, WINDOW_SIZE:60}),[
    param('id').notEmpty().withMessage("Recipe Id cannot be empty").isMongoId().withMessage("Enter valid Id"),
],handleValidation, recipeById);

router.get("/trending",rateLimiter({ MAX_REQUESTS:30, WINDOW_SIZE:60}),[],handleValidation,trendingRecipe);
router.get("/featured",rateLimiter({ MAX_REQUESTS:30, WINDOW_SIZE:60}),[],handleValidation,featuredRecipes);

router.post("/addRecipe",rateLimiter({ MAX_REQUESTS:5, WINDOW_SIZE:60}),fetchuser,addRecipeValidation,handleValidation, addRecipe);
router.put("/editRecipe/:id",rateLimiter({ MAX_REQUESTS:5, WINDOW_SIZE:60}),fetchuser,editRecipeValidation,handleValidation,editRecipe);

router.delete("/deleteRecipe/:id",rateLimiter({ MAX_REQUESTS:10, WINDOW_SIZE:60}), fetchuser,[
      param('id').notEmpty().withMessage("Recipe Id cannot be empty").isMongoId().withMessage("Enter valid Id"),
],handleValidation,deleteRecipe);

router.get("/search/:name",rateLimiter({ MAX_REQUESTS:100, WINDOW_SIZE:60}),[
       param('name').isString().notEmpty().withMessage("Enter a valid search Type"),
   query('page').isInt({min:1}).withMessage("Page must be greater than 0"),
    query('limit').isInt({min:1,max:30}).withMessage("Limit Must be Between 1 to 20")
],handleValidation, searchRecipe);





module.exports = router;
