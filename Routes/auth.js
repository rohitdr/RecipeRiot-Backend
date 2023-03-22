
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
            
            facebook:req.body.facebook,
           
            first_name:req.body.first_name,
            last_name:req.body.last_name,
           
            git:req.body.git,
          
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
        return res.status(404).json( errors );
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email: email})
        if(!user){
            return res.status(404).json({ 'error': "Please use correct correndentials" })
        }
        let passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            return res.status(404).json({ 'error': "Please use correct correndentials" })
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

//get user details of logged in user login required
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
//get user detail by its id 
router.post('/getUserbyid', async (req, res) => {
    try {
      
        const id = req.body.id;
        const recipe = await Recipe.find({ user: req.body.id });
      var totalComments=0;
      recipe.map((element)=>{
          totalComments += element.Comments.length;
      })
        const recipe_lenght=recipe.length
        const user = await User.findById(id).select("-password")
        res.json({user:user,totalResults:recipe_lenght,TotalCommnts:totalComments})
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
           return res.status(400).send({ error: "Their is something wrong ! Try again "});
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
/// uploading image or changing image of profile
router.post('/changeuploadimage', fetchUser, async (req, res) => {
    try {
       const image = req.body.image;
        const id = req.user.id;
        const user = await User.findById(id) 
          if(!user){
            return res.status(400).json({ 'error': "Sorry user does not exist" })
          }
        const updatedUser = await User.update({ _id:id}  ,{ $set: { Profile_Image: image  } } )
        res.json(updatedUser)
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})

//update users details
router.put('/updateuser', fetchUser, async (req, res) => {
    try {
      const {
      username,email,first_name,last_name,phone_number,git,facebook,twitter,web
      } = req.body;
  
      const newuser = {};
      if(git){
        newuser.git=git
      }
      if(facebook){
        newuser.facebook=facebook
      }
      if(twitter){
        newuser.twitter=twitter
      }
      if(web){
        newuser.web=web
      }
    if(username){
        newuser.username=username
        let userbyusername=await User.findOne({username:username})
        if(userbyusername){
            return res.status(404).send({error:"This username is not avialable "})
        }

    }
    if(email){
        newuser.email=email
        let userbyemail=await User.findOne({email:email})
    if(userbyemail){
        return res.status(404).send({error:"The given Email is already linked with other account"})
    }
    }
    if(first_name){
        newuser.first_name=first_name
    }
    if(last_name){
        newuser.last_name=last_name
    }
    if(phone_number){
        newuser.phone_number
        let userbyphone=await User.findOne({phone_number:phone_number})
        if(userbyphone){
            return res.status(404).send({error:"The given Phone Number is already linked with other account"})
        }
    }
   
    
     let user = await User.findById(req.user.id)
    
     //allowing only owner to update the his account
     if(user._id.toString() !== req.user.id){
      return res.status(404).send({ error:"You can't update details of other user Not allowed"})
     }
   let updateduser =await User.findByIdAndUpdate(req.user.id,{$set:newuser},{new:true})
   res.json(" The details has been successfully updated")
    } catch (error) {
      console.log(error.message);
      res.status(500).send({error:"INTERNAL SERVER ERROR"});
    }
  });

  //forget password and changing the password
  router.post('/forgetPassword',async(req,res)=>{
    try{
          const email = req.body.email;
          const username=req.body.username;
          const user = await User.findOne({email:email}) 
          if(!user){
            return res.status(404).json({ error: "Sorry user does not exist with this email" })
          }
          
          if (username != user.username) {
            return res.status(404).json({ error: "Please use correct correndentials" })
        }
          const salt = await bcrypt.genSalt(10);
        const securedpass = await bcrypt.hash(req.body.password, salt)
        const updatedUser = await User.updateOne({email:email}  ,{ $set: {password : securedpass  } } )

        if(!updatedUser){
           return res.status(404).json({ error: "Their is something wrong ! Try again "});
        }
        res.json({succcess:"successfully password updated"})
        
    }catch(error)
    {
        console.log(error.message)
        res.status(500).send({ error: "Internal server Erorr" });
    }
})
module.exports = router;