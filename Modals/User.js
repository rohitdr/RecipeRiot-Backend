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
    Total_Comments:{
        type:Number,
        default:0
    },
    Total_Ratings:{
        type:Number,
        default:0
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    date_of_birth:{
       type:Date
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
    faourite_food:{
        type:String
    },
    first_name:{
        type:String
    },
    last_name:{
        type:String
    },
    sex:{
        type:String
    },
    pincode:{
        type:Number
    },
    state:{
        type:String
    },
    




})
User = mongoose.model('User', userSchema)
module.exports = User