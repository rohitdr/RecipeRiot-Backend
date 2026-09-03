const asyncHandler=require('../Utils/asyncHandler.js')
const User = require("../Modals/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recipe = require("../Modals/Recipe.js");
const  {ACCESS_SECRET,REFRESH_SECRET}  = process.env
const cloudinary = require("../Config/cloudinary");
const createUser=asyncHandler( async (req, res) => {
 
  
      const {name,email,phoneNumber,username,password}=req.body
      const existingUser = await User.findOne({ $or:[{email},{ phoneNumber},{username}]});
      if (existingUser) {
        return res
          .status(409)
          .json({ success:false,message: "User already exists with email, phone or username"});
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      let user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        username,
      
      });
     
      res.status(201).json({success:true,message:"User created SuccessFully"});
  
  })
  const login=asyncHandler( async (req, res) => {
     
      const { email, password } = req.body;
  
   
        const user = await User.findOne({ email});
        if (!user) {
          return res
            .status(401)
            .json({success:false, message: "Please use correct correndentials" });
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res
            .status(401)
            .json({ success:false,message: "Please use correct correndentials" });
        }
         const payload={
          id:user.id
      }
        const accessToken = jwt.sign(payload, ACCESS_SECRET,{expiresIn:"7m"});
               const refreshToken =jwt.sign(payload,process.env.REFRESH_SECRET,{expiresIn:"7d"})
                 if(user.refreshToken !== refreshToken){
      await User.updateOne({_id:user.id},{$set:{refreshToken}});
       }
                     res.cookie("refreshToken",refreshToken,{httpOnly:true,sameSite:"None",secure:true,maxAge: 7 * 24 * 60 * 60 * 1000})
        res.status(200).json({ success:true, accessToken ,message:"You had logged in successfully"});
    
    }
  )
  const changePassword=asyncHandler( async (req, res) => {

      const userId = req.user.id;
      const {oldPassword,newPassword}=req.body
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({success:false, message: "Sorry user does not exist" });
      }
      let isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({success:false, message: "Invalid credentials" });
      }
       user.password = await bcrypt.hash(newPassword, 10);
      await user.save()
  
      res.status(200).send({ success:true,message: "successfully password updated" });
   
  })
  const forgetPassword=asyncHandler( async (req, res) => {
 
    const {email,username,password} = req.body;
  

    const user = await User.findOne({email});
    if (!user) {
      return res
        .status(404)
        .json({success:false, message: "Sorry user does not exist with this email" });
    }
    if (username != user.username) {
      return res
        .status(401)
        .json({success:false, message: "Invalid credentials" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
  await user.save()

    res
      .status(200)
      .json({ success:true,message: "Your Password has been successfully  updated" });

})
const refreshhandler=asyncHandler(async(req,res)=>{
const refreshToken=req.cookies.refreshToken
  if(!refreshToken){
             return res.status(401).json({status:false,code:"RefreshToken-Error",message:"Session Expired. Login Again"})
      }
      const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET)
            const user = await User.findById(decoded.id).select("refreshToken")
        if(!user || user.refreshToken !== refreshToken){
           await User.findByIdAndUpdate(decoded.id, { $set: { refreshToken: null } });
             return res.status(401).json({status:false,code:"RefreshToken-Error",message:"Session Expired. Login Again"})
      }
        const accessToken = jwt.sign({id:decoded.id},process.env.ACCESS_SECRET,{expiresIn:"7m"})
       return res.status(200).json({status:true,accessToken})
      
})
const logout = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    if (!userId) return res.status(200).json({ status: true, message: "Already logged out" });
   res.clearCookie("refreshToken", {
  httpOnly: true,
  sameSite: "None",
  secure: true
});
    await User.findByIdAndUpdate(userId, { $set: { refreshToken: null, onlineStatus: false } });
    return res.status(200).json({ status: true, message: "User logged out successfully" });
});
const imageUpdate=asyncHandler(async(req,res)=>{
  const skip=Number(req.query.skip)
const recipe=await Recipe.find({}).select("image label").skip(skip).limit(50)
// const recipe=await Recipe.find({}).select("image label").skip(4350).limit(50)
return res.status(200).json({recipe})
})
const recipeupdate=asyncHandler(async(req,res)=>{
const {url,id}=req.body

const result = await cloudinary.uploader.upload(
  url,
  {
    folder: "recipes"
  }
);
const updatedREcipe=await Recipe.findByIdAndUpdate(id,{$set:{image:{url:result.secure_url,publicId:result.public_id}}},{new:true})
res.status(200).json({recipe:updatedREcipe.image})
})
  module.exports={login,createUser,changePassword,forgetPassword,refreshhandler,logout,imageUpdate,recipeupdate}