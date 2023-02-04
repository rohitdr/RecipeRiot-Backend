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
    }

})
User = mongoose.model('User', userSchema)
module.exports = User