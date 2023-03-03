const mongoose = require('mongoose')
const { Schema } = mongoose;
const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
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
    }



})
User = mongoose.model('User', userSchema)
module.exports = User