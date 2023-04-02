/* Importing the required modules. */
const express = require("express");
const router = express.Router();
const User = require("../Modals/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../Middleware/fetchUser.js");
const { jwtSecret } = require("../Config/Keys");
const Recipe = require("../Modals/Recipe.js");
const ContactUs = require("../Modals/ContactUs.js");


/* The above code is creating a user. */
router.post(
  "/createUser",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
    body("phone_number").isLength({ min: 5 }),
    body("username").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ error: errors.array() });
    }
    try {
      let emailcheck = await User.findOne({ email: req.body.email });
      if (emailcheck) {
        return res
          .status(404)
          .json({ error: "Sorry user already exists with this email" });
      }
      let numberCheck = await User.findOne({
        phone_number: req.body.phone_number,
      });
      if (numberCheck) {
        return res
          .status(404)
          .json({ error: "Sorry user already exists with this phone Number" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedpass = await bcrypt.hash(req.body.password, salt);
      let user = await User.create({
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: securedpass,
        username: req.body.username,

        facebook: req.body.facebook,

        first_name: req.body.first_name,
        last_name: req.body.last_name,

        git: req.body.git,

        twitter: req.body.twitter,
        web: req.body.web,
      });
      const data = {
        id: user.id,
      };
      const auth_token = jwt.sign(data, jwtSecret);

      res.status(200).json({ auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal server Erorr" });
    }
  }
);

/* The above code is a login route. */

router.post(
  "/login",
  [
    body("email", "Enter a correct email").isEmail(),
    body("password", "password can't be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json(errors);
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email: { $regex: email, $options: "i" },
      });
      if (!user) {
        return res
          .status(404)
          .json({ error: "Please use correct correndentials" });
      }
      let passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(404)
          .json({ error: "Please use correct correndentials" });
      }
      const data = {
        id: user.id,
      };
      const onlinestatus = await User.findByIdAndUpdate(
        { _id: user.id },
        { $set: { OnLine: true } }
      );
      const auth_token = jwt.sign(data, jwtSecret);
      let success = "true";
      res.status(200).json({ success, auth_token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send({ error: "Internal server Erorr" });
    }
  }
);

/* The above code is used to logout the user. */
router.post("/logout", fetchUser, async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "something is not Correct" });
    }
    const onlinestatus = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { OnLine: false } }
    );
    res.status(200).json("Now Your are Offline");
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is fetching the user from the database and then finding the recipe of that user and
then sending the user and the length of the recipe to the frontend. */
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const id = req.user.id;
    const recipe = await Recipe.find({ user: req.user.id });

    const recipe_lenght = recipe.length;
    const user = await User.findById(id).select("-password");
    res.status(200).json({ user: user, totalResults: recipe_lenght });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* Getting the user by id and then getting all the recipes of that user and then getting the total
comments of that user. */
router.post("/getUserbyid", async (req, res) => {
  try {
    const id = req.body.id;
    const recipe = await Recipe.find({ user: req.body.id });
    var totalComments = 0;
    recipe.map((element) => {
      totalComments += element.Comments.length;
    });
    const recipe_lenght = recipe.length;
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      user: user,
      totalResults: recipe_lenght,
      TotalCommnts: totalComments,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is changing the password of the user. */
router.post("/changePassword", fetchUser, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Sorry user does not exist" });
    }
    let passCompare = await bcrypt.compare(req.body.oldpassword, user.password);
    if (!passCompare) {
      return res
        .status(404)
        .json({ error: "Please use correct correndentials" });
    }
    const salt = await bcrypt.genSalt(10);
    const securedpass = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.update(
      { _id: id },
      { $set: { password: securedpass } }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .send({ error: "Their is something wrong ! Try again " });
    }
    res.status(200).send({ succcess: "successfully password updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* Checking if the username is already taken or not. */
router.post("/checkUsername", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(404).send(false);
    }

    res.status(200).send(true);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is updating the user profile image. */
router.post("/changeuploadimage", fetchUser, async (req, res) => {
  try {
    const image = req.body.image;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Sorry user does not exist" });
    }
    const updatedUser = await User.update(
      { _id: id },
      { $set: { Profile_Image: image } }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is updating the user details. */
router.put("/updateuser", fetchUser, async (req, res) => {
  try {
    const {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      git,
      facebook,
      twitter,
      web,
    } = req.body;

    const newuser = {};
    if (git) {
      newuser.git = git;
    }
    if (facebook) {
      newuser.facebook = facebook;
    }
    if (twitter) {
      newuser.twitter = twitter;
    }
    if (web) {
      newuser.web = web;
    }
    if (username) {
      newuser.username = username;
      let userbyusername = await User.findOne({ username: username });
      if (userbyusername) {
        return res
          .status(404)
          .send({ error: "This username is not avialable " });
      }
    }
    if (email) {
      newuser.email = email;
      let userbyemail = await User.findOne({
        email: { $regex: email, $options: "i" },
      });
      if (userbyemail) {
        return res
          .status(404)
          .send({
            error: "The given Email is already linked with other account",
          });
      }
    }
    if (first_name) {
      newuser.first_name = first_name;
    }
    if (last_name) {
      newuser.last_name = last_name;
    }
    if (phone_number) {
      newuser.phone_number;
      let userbyphone = await User.findOne({ phone_number: phone_number });
      if (userbyphone) {
        return res
          .status(404)
          .send({
            error:
              "The given Phone Number is already linked with other account",
          });
      }
    }

    let user = await User.findById(req.user.id);

    //allowing only owner to update the his account
    if (user._id.toString() !== req.user.id) {
      return res
        .status(404)
        .send({ error: "You can't update details of other user Not allowed" });
    }
    let updateduser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: newuser },
      { new: true }
    );
    res.status(200).json(" The details has been successfully updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "INTERNAL SERVER ERROR" });
  }
});

/* The above code is a route for a user to change his/her password. */
router.post("/forgetPassword", async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;

    const user = await User.findOne({
      email: { $regex: email, $options: "i" },
    });
    let passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      return res
        .status(404)
        .json({
          error: "New password Must be different form the old password",
        });
    }
    if (!user) {
      return res
        .status(404)
        .json({ error: "Sorry user does not exist with this email" });
    }

    if (username != user.username) {
      return res
        .status(404)
        .json({ error: "Please use correct correndentials" });
    }

    const salt = await bcrypt.genSalt(10);
    const securedpass = await bcrypt.hash(req.body.password, salt);
    const updatedUser = await User.updateOne(
      { email: { $regex: email, $options: "i" } },
      { $set: { password: securedpass } }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: "Their is something wrong ! Try again " });
    }
    res
      .status(200)
      .json({ succcess: "Your Password has been successfully  updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is fetching all the user from the database and sending it to the client. */
router.post("/AdminGetAllUser", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (user.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    let allUser = await User.find().select("-password");

    res.status(200).json({ AllUser: allUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is fetching all the user from the database and sending it to the client side. */
router.post("/AdminGetAllUserByDate", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (user.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    let allUser = await User.find().select("-password").sort({ date: -1 });
    res.status(200).json({ AllUser: allUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is deleting the user account and the recipes of the user. */
router.delete("/deleteAccount", fetchUser, async (req, res) => {
  try {
    if (req.user.id !== req.body.id) {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the Action , Its not Your Account",
        });
    }
    let deleted_user = await User.deleteOne({ _id: req.user.id });
    let delete_recipe = await Recipe.deleteMany({ user: req.user.id });
    res
      .status(200)
      .json(
        "Your account and Your Recipes are deleted is successfully deleted"
      );
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is deleting the user account and his recipes. */
router.delete("/AdminDeleteAccount", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (user.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }

    let deleted_user = await User.deleteOne({ _id: req.body.id });
    let delete_recipe = await Recipe.deleteMany({ user: req.body.id });
    res
      .status(200)
      .json("This account and his Recipes are deleted successfully ");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is updating the user profile image. */
router.post("/changeuploadimageAdmin", fetchUser, async (req, res) => {
  try {
    let admin = await User.findById(req.user.id);
    if (admin.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    const image = req.body.image;
    const id = req.body.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Sorry user does not exist" });
    }
    const updatedUser = await User.update(
      { _id: id },
      { $set: { Profile_Image: image } }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});

/* The above code is updating the user details by the admin. */
router.put("/updateuserAdmin", fetchUser, async (req, res) => {
  try {
    const {
      username,
      email,
      first_name,
      last_name,
      phone_number,
      git,
      facebook,
      twitter,
      web,
    } = req.body;

    const newuser = {};
    if (git) {
      newuser.git = git;
    }
    if (facebook) {
      newuser.facebook = facebook;
    }
    if (twitter) {
      newuser.twitter = twitter;
    }
    if (web) {
      newuser.web = web;
    }
    if (username) {
      newuser.username = username;
      let userbyusername = await User.findOne({ username: username });
      if (userbyusername) {
        return res
          .status(404)
          .send({ error: "This username is not avialable " });
      }
    }
    if (email) {
      newuser.email = email;
      let userbyemail = await User.findOne({
        email: { $regex: email, $options: "i" },
      });
      if (userbyemail) {
        return res
          .status(404)
          .send({
            error: "The given Email is already linked with other account",
          });
      }
    }
    if (first_name) {
      newuser.first_name = first_name;
    }
    if (last_name) {
      newuser.last_name = last_name;
    }
    if (phone_number) {
      newuser.phone_number;
      let userbyphone = await User.findOne({ phone_number: phone_number });
      if (userbyphone) {
        return res
          .status(404)
          .send({
            error:
              "The given Phone Number is already linked with other account",
          });
      }
    }

    //allowing only owner to update the his account
    let user = await User.findById(req.user.id);
    if (user.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    let updateduser = await User.findByIdAndUpdate(
      req.body.id,
      { $set: newuser },
      { new: true }
    );
    res.json(" The details has been successfully updated");
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "INTERNAL SERVER ERROR" });
  }
});
/* Fetching the data from the database and sending it to the frontend. */
router.post("/staticalData", fetchUser, async (req, res) => {
  try {
    let admin = await User.findById(req.user.id);
    if (admin.email !== "rohitdr098@gmail.com") {
      return res
        .status(404)
        .json({
          error: "Your cannot Access the information! You are not a admin",
        });
    }
    let totaluser = await User.find();
    let totalrecipe = await Recipe.find();
    let totalMessage = await ContactUs.find();
    var totalComments = 0;
    totalrecipe.map((element) => {
      totalComments = totalComments + element.Comments.length;
    });

    res
      .status(200)
      .json({
        totaluser: totaluser.length,
        totalrecipe: totalrecipe.length,
        totalMessage: totalMessage.length,
        totalComment: totalComments,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Erorr" });
  }
});


module.exports = router;
