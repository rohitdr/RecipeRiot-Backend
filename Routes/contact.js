const mongoose= require('mongoose')
const express = require('express')
const router = express.Router();
const Contact = require('../Modals/ContactUs')


router.get("/Message", async (req,res)=>{
try{
  const alreadymessage = await Contact.findOne({Email:req.body.Email,Name:req.body.Name})

  if(alreadymessage){
    return res.status(404).json({error:"You Had Already Message Me"})
  }
 
    const message = await Contact.create({
        Name : req.body.Name,
        Message:req.body.Message,
        Email:req.body.Email,
        Subject:req.body.Subject


    })

    if(!message){
        return res.status(404).json('Please Try Again')
    }
    res.json({success:"success"})
}
catch(error){
    res.status(500).json(error.message)
    console.log(error.message)
}
})
router.get("/GetAllMessages", async (req,res)=>{
    try{
      const AllMessages = await Contact.find().sort({date:-1})
    if(!AllMessages){
            return res.status(404).json("No Message Found")
        }
        res.json({AllMessages:AllMessages})
    }
    catch(error){
        res.status(500).json(error.message)
        console.log(error.message)
    }
    })
module.exports= router