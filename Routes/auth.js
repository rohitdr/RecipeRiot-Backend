/* Importing the required modules. */
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const fetchUser = require("../Middleware/fetchUser.js");
const { login, createUser, changePassword, forgetPassword, refreshhandler, logout } = require("../Controllers/Auth.js");
const handleValidation = require("../Middleware/handleValidation.js");
const rateLimiter = require("../Middleware/rateLimiter.js");



/* The above code is creating a user. */
router.post(
  "/createUser",
    rateLimiter({ MAX_REQUESTS:5, WINDOW_SIZE:60}),
  [
    body("name","Please Enter a valid name").isLength({min:2}),
    body("phoneNumber","Phone Number length Should be 10 digits").isLength({ min: 10,max:10 }).isMobilePhone("any").withMessage("Enter a valid Phone Number"),
      body("email", "Please Enter a valid Email").isEmail(),
    body("username", "Username length must be 8 digits").isLength({ min: 8 }),
    body("password", "password must be of length 8").isLength({ min: 8 }),
  ],handleValidation,createUser
);

/* The above code is a login route. */

router.post(
  "/login",
    rateLimiter({ MAX_REQUESTS:5, WINDOW_SIZE:60}),
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must of length 8").isLength({ min: 8 }),
  ],login
)

/* The above code is changing the password of the user. */
router.patch("/changePassword", fetchUser,rateLimiter({ MAX_REQUESTS:5, WINDOW_SIZE:60}), [
    body("oldPassword", "password length should be more than 8").isLength({ min: 8 }),
    body("newPassword", "password length should be more than 8").isLength({ min: 8 }),
  ],handleValidation,changePassword);

/* The above code is a route for a user to change his/her password. */
router.patch("/forgetPassword", rateLimiter({ MAX_REQUESTS:5, WINDOW_SIZE:60}),[
    body("email", "Please Enter a valid Email").isEmail(),
    body("username", "Username length must be 8 digits").isLength({ min: 8 }),
    body("password", "password must be of length 8").isLength({ min: 8 }),
  ],
  handleValidation,forgetPassword);
router.post('/refresh',rateLimiter({ MAX_REQUESTS:30, WINDOW_SIZE:60}),refreshhandler)
router.post('/logout',fetchUser,rateLimiter({ MAX_REQUESTS:30, WINDOW_SIZE:60}),logout)
module.exports = router;
