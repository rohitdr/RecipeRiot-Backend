const mongoose = require('mongoose')
const {Schema} = mongoose
const ContactSchema = new Schema({
    Name:{
        type:String,

    },
    Message:{
        type:String
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Email:{
        type:String
    },
    Subject:{
        type:String
    }

})
module.exports=mongoose.model("Contact", ContactSchema)