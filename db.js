const mongoose =require('mongoose')
const Mongoose_uri ="mongodb+srv://Rohitdr098:Rohit%402001@cluster0.sne14ef.mongodb.net/Recipe"
const mongooseConnectToDb=()=>{
mongoose.connect((Mongoose_uri), ()=>{
    console.log("connected to mongo db");
})
}
module.exports= mongooseConnectToDb;