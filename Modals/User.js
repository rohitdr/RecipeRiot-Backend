const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    Liked_Recipe:{
        type:Array


    },
    Profile_Image:{
    type:String,
    default:"UserImages/default.jpg"
    },
    username:{
type:String,


    },
    Total_Recipes:{
        type:Number,
        default:0 
    }
    ,
    Total_Comments:{
        type:Number,
        default:0
    },
    Total_Ratings:{
        type:Number,
        default:0
    },
    
    facebook:{
        type:String
    },
    twitter:{
        type:String
    },
    git:{
        type:String
    },
    web:{
        type:String
    },
   
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    OnLine:{
        type:Boolean,
        default:false
    }
    




})
User = mongoose.model('User', userSchema)
module.exports = User