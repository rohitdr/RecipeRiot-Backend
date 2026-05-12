const express = require('express')
const fetchUser = require('../Middleware/fetchUser')
const router =express.Router()

const { addComment, getComments } = require('../Controllers/Comments.js');
const rateLimiter = require('../Middleware/rateLimiter.js');
const handleValidation = require('../Middleware/handleValidation.js');
const { body, param, query } = require('express-validator');
router.post('/addComment',fetchUser, rateLimiter({ MAX_REQUESTS:10, WINDOW_SIZE:60})
,[
    body('comment').trim().notEmpty().withMessage("Comment cannot be empty").isLength({min:2,max:500}).withMessage("Comment Length should be between 2 to 500"),
    body('rating',"Please Enter a Valid Rating").notEmpty().withMessage("Rating Cannot be empty").isFloat({min:0,max:5}).withMessage("Rating should be between 0 to 5"),
    body('recipeId',"Please give Valid Recipe Id").notEmpty().withMessage("Recipe Id cannot be empty").isMongoId().withMessage("Enter valid Id")
],
handleValidation, addComment)
router.get('/comments/:recipeId', rateLimiter({ MAX_REQUESTS:10, WINDOW_SIZE:60}),[
    param('recipeId').notEmpty().withMessage("Recipe Id cannot be empty").isMongoId().withMessage("Enter valid Id"),
    query('page').isInt({min:1}).withMessage("Page must be greater than 0"),
    query('limit').isInt({min:1,max:20}).withMessage("Limit Must be Between 1 to 20")
],handleValidation,getComments)













module.exports=router