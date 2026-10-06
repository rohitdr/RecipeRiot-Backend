const asyncHandler=require('../Utils/asyncHandler.js')
const User = require("../Modals/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recipe = require("../Modals/Recipe.js");
const cloudinary = require("../Config/cloudinary");
const auth = require('../services/auth.services.js');


const createUser=asyncHandler( async (req, res) => {
      
       await auth.createUser(req.body)
     
      res.status(201).json({success:true,message:"User created SuccessFully"});
  
  })

  const login=asyncHandler( async (req, res) => {
     
   const {refreshToken,accessToken}=await auth.login(req.body)
                     res.cookie("refreshToken",refreshToken,{httpOnly:true,sameSite:"None",secure:true,maxAge: 7 * 24 * 60 * 60 * 1000})
        res.status(200).json({ success:true, accessToken ,message:"You had logged in successfully"});
    
    }
  )
  const changePassword=asyncHandler( async (req, res) => {

   await auth.changePassword(req.body,req.user.id)
  
      res.status(200).send({ success:true,message: "successfully password updated" });
   
  })
  const forgetPassword=asyncHandler( async (req, res) => {
 
    await auth.forgetPassword(req.body)
    res
      .status(200)
      .json({ success:true,message: "Your Password has been successfully  updated" });

})
const refreshhandler=asyncHandler(async(req,res)=>{
const {accessToken}=await auth.refreshhandler(req.cookies.refreshToken)
       return res.status(200).json({status:true,accessToken})
      
})
const logout = asyncHandler(async (req, res) => {
  await auth.logout(req.user.id)
    return res.status(200).json({ status: true, message: "User logged out successfully" });
});


  module.exports={login,createUser,changePassword,forgetPassword,refreshhandler,logout}