const express = require("express");
const fetchUser = require("../Middleware/fetchUser");
const router = express.Router();
const { getUser, likedRecipes, likeRecipe, updateUser, userRecipes } = require("../Controllers/User.js");
const handleValidation = require("../Middleware/handleValidation.js");
const { body ,query} = require("express-validator");
const rateLimiter = require("../Middleware/rateLimiter.js");
router.get("/getUser", fetchUser,rateLimiter({ MAX_REQUESTS:20, WINDOW_SIZE:60}), getUser);
router.get("/likedRecipes", fetchUser,rateLimiter({ MAX_REQUESTS:100, WINDOW_SIZE:60}),[
     query('page').isInt({min:1}).withMessage("Page must be greater than 0"),
    query('limit').isInt({min:1,max:30}).withMessage("Limit Must be Between 1 to 20")
],handleValidation,likedRecipes);
router.get("/recipes", fetchUser,rateLimiter({ MAX_REQUESTS:100, WINDOW_SIZE:60}),[
   query('page').isInt({min:1}).withMessage("Page must be greater than 0"),
    query('limit').isInt({min:1,max:30}).withMessage("Limit Must be Between 1 to 20")
],handleValidation, userRecipes);
router.patch("/updateUser", fetchUser,rateLimiter({ MAX_REQUESTS:10, WINDOW_SIZE:60}),[
    body("username").optional()
    .trim()
    .isLength({ min: 8, max: 20 })
    .withMessage("Username must be between 8-20 characters"),
    body('email').optional().isEmail().withMessage("Enter valid Email"),
    body('name').optional().isString().withMessage("Enter a valid Name").isLength({min:3,max:20}).withMessage("Name length Should be between 3 to 20"),
    body('phoneNumber').optional().isLength({min:10,max:10}).withMessage("Mobile Number Length Should be 10").isMobilePhone("any").withMessage("Enter a valid Phone Number"),
    body('bio').optional().isLength({max:200}).withMessage("Bio Length cannot be more than 200"),
body("image").optional().isObject().withMessage("Image must be an object"),
body("image.url")
  .optional()
  .isURL()
  .withMessage("Invalid image URL"),

body("image.publicId")
  .optional()
  .isString()
  .trim()
  .notEmpty()
  .withMessage("Public ID is required"),
],handleValidation,updateUser);
router.patch("/likeRecipe", fetchUser,rateLimiter({ MAX_REQUESTS:30, WINDOW_SIZE:60}),[
    body('likedRecipeId').notEmpty().withMessage("Recipe Id is Required").isMongoId().withMessage("Enter a valid Id")
],handleValidation, likeRecipe);
module.exports = router