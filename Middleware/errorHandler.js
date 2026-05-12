const errorHandler=(err,)=>{
  console.log(err)
          return res.status(500).json({status:false,message:err.message})

}
module.exports=errorHandler