
const express = require('express')
const router = express.Router();
const User = require('../Modals/User.js')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../Middleware/fetchUser.js');
const jwtSecret = "adlksfjakghaslkdfj"
const Recipe = require("../Modals/Recipe.js");

//crate user no login required
router.post('/createUser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('phone_number').isLength({ min: 5 }),
    body('username').isLength({ min: 8 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        let emailcheck = await User.findOne({ 'email': req.body.email });
        if (emailcheck) {
            return res.status(400).json({ 'error': "Sorry user already exists with this email" })
        }
        let numberCheck = await User.findOne({ 'phone_number': req.body.phone_number })
        if (numberCheck) {
            return res.status(400).json({ 'error': "Sorry user already exists with this phone Number" })
        }
        const salt = await bcrypt.genSalt(10);
        const securedpass = await bcrypt.hash(req.body.password, salt)
        let user = await User.create({
            
            email: req.body.email,
            phone_number: req.body.phone_number,
            password: securedpass,
            username:req.body.username,
            address:req.body.address,
            city:req.body.city,
            date_of_birth:req.body.date_of_birth,
            facebook:req.body.facebook,
            faourite_food:req.body.faourite_food,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            gender:req.body.gender,
            git:req.body.git,
            pincode:req.body.pincode,
            state:req.body.state,
            twitter:req.body.twitter,
            web:req.body.web
        })
        const data = {
            id: user.id
        }
        const auth_token = jwt.sign(data, jwtSecret);

        res.json({ auth_token })


    } catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})


//login of user login not  required

router.post('/login', [
    body('email', 'Enter a correct email').isEmail(),
    body('password', "password can't be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( errors );
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email: email})
        let passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(400).json({ 'error': "Please use correct correndentials" })
        }
        const data = {
            id: user.id
        }
        const auth_token = jwt.sign(data, jwtSecret)
        let success = "true"
        res.json({ success ,auth_token })

    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})

//get user details login required
router.post('/getUser', fetchUser, async (req, res) => {
    try {
      
        const id = req.user.id;
        const recipe = await Recipe.find({ user: req.user.id });
    
        const recipe_lenght=recipe.length
        const user = await User.findById(id).select("-password")
        res.json({user:user,totalResults:recipe_lenght})
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})

//changing password 
router.post('/changePassword', fetchUser,async(req,res)=>{
    try{
          const id = req.user.id;
          const user = await User.findById(id) 
          if(!user){
            return res.status(400).json({ 'error': "Sorry user does not exist" })
          }
          let passCompare = await bcrypt.compare(req.body.oldpassword, user.password)
          if (!passCompare) {
            return res.status(400).json({ 'error': "Please use correct correndentials" })
        }
          const salt = await bcrypt.genSalt(10);
        const securedpass = await bcrypt.hash(req.body.password, salt)
        const updatedUser = await User.update({ _id:id}  ,{ $set: {password : securedpass  } } )

        if(!updatedUser){
            res.status(400).send({ error: "Their is something wrong ! Try again "});
        }
        res.send({"succcess":"successfully password updated"})
        
    }catch(error)
    {
        console.log(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})
// checking username is avialabel or not
router.post('/checkUsername',async(req,res)=>{
    try{
        
          const user = await User.findOne({username:req.body.username})
          if(user){
            return res.status(400).send(false)
          }
          
          
        res.send(true)
        
    }catch(error)
    {
        console.log(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})

router
module.exports = router;