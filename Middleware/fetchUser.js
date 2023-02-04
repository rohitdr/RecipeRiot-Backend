const jwt = require('jsonwebtoken');
const jwtSecret = "adlksfjakghaslkdfj"
const fetchUser=(req,res,next)=>{
         const token = req.header('auth-token')
         if(!token){
            res.status(400).send({'error':"Please login to continue"})
         }
         try{
     const data = jwt.verify(token,jwtSecret)
     req.user =data.user
     next()
         }
  catch(error){
        res.status(401).send({error:"Please login to continue "})   
    }
}


  

module.exports= fetchUser