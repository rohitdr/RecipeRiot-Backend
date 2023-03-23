const mongoose =require('mongoose')
const {Mongoose_uri} =require('./Config/Keys')
const mongooseConnectToDb=()=>{
mongoose.connect((Mongoose_uri), ()=>{
    console.log("connected to mongo db");
})
}
module.exports= mongooseConnectToDb;