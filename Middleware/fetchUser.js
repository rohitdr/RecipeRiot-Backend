const jwt = require('jsonwebtoken');
const jwtSecret ="adlksfjakghaslkdfj"
const fetchUser=(req,res,next)=>{
         const token = req.header('auth-token')
         if(!token){
            res.status(404).send({'error':"Please login to continue"})
         }
         try{
     const data = jwt.verify(token,jwtSecret);

     req.user = data;
     next();
         }
  catch(error){
        res.status(404).send({error:"Please login to continue "})   
    }
}


  

module.exports= fetchUser