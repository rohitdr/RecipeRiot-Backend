const mongoose =require('mongoose')
const Mongoose_uri ="mongodb://127.0.0.1:27017"
const mongooseConnectToDb=()=>{
mongoose.connect((Mongoose_uri), ()=>{
    console.log("connected to mongo db");
})
}
module.exports= mongooseConnectToDb;