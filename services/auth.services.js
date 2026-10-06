const AppError = require("../Utils/AppError");
const User = require("../Modals/User.js");
const bcrypt = require("bcryptjs");
const  {ACCESS_SECRET,REFRESH_SECRET}  = process.env
const jwt = require("jsonwebtoken");
const createUser= async ({name,email,phoneNumber,username,password}) => {
 
  
      const existingUser = await User.findOne({ $or:[{email},{ phoneNumber},{username}]});
      if (existingUser) {
       throw new AppError(409,"User already exists with email, phone or username")
     }

      const hashedPassword = await bcrypt.hash(password, 10);
       await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        username,
      
      });
     
  
  }





    const login= async ({ email, password }) => {
       
     
         const user = await User.findOne({ email});
          if (!user) {
            throw new AppError(401,"Please use correct correndentials")
          }
          let isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
        throw new AppError(401,"Please use correct correndentials")
          }
           const payload={
            id:user.id
        }
          const accessToken = jwt.sign(payload, ACCESS_SECRET,{expiresIn:"7m"});
                 const refreshToken =jwt.sign(payload,REFRESH_SECRET,{expiresIn:"7d"})
                   if(user.refreshToken !== refreshToken){
        await User.updateOne({_id:user.id},{$set:{refreshToken}});
         }
         return {accessToken,refreshToken}
      }

      ///
        const changePassword=async ({oldPassword,newPassword},userId) => {

      const user = await User.findById(userId);
      if (!user) {
        throw new AppError(404, "Sorry user does not exist")

      }
      let isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
          throw new AppError(401, "Invalid credentials")
      }
       user.password = await bcrypt.hash(newPassword, 10);
      await user.save()
  
   
  }

    const forgetPassword= async ({email,username,password}) => {

    const user = await User.findOne({email});
    if (!user) {
        throw new AppError(404, "Sorry user does not exist")
    }
    if (username != user.username) {
      throw new AppError(401, "Invalid credentials")
    }
    user.password = await bcrypt.hash(password, 10);
  await user.save()
}


const refreshhandler=async (refreshToken)=>{

  if(!refreshToken){
    throw new AppError(401,"Session Expired. Login Again","RefreshToken-Error")
           
      }
      const decoded = jwt.verify(refreshToken,process.env.REFRESH_SECRET)
            const user = await User.findById(decoded.id).select("refreshToken")
        if(!user || user.refreshToken !== refreshToken){
           await User.findByIdAndUpdate(decoded.id, { $set: { refreshToken: null } });
               throw new AppError(401,"Session Expired. Login Again","RefreshToken-Error")

      }
        const accessToken = jwt.sign({id:decoded.id},process.env.ACCESS_SECRET,{expiresIn:"7m"})
     return {accessToken}
      
}




const logout = async (userId) => {
  
   res.clearCookie("refreshToken", {
  httpOnly: true,
  sameSite: "None",
  secure: true
});
    await User.findByIdAndUpdate(userId, { $set: { refreshToken: null, onlineStatus: false } });
  
}
    
  module.exports={createUser,login,changePassword,forgetPassword,logout,refreshhandler}