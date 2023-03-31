/* Checking if the environment is production or development. */
if(process.env.NODE_ENV==='production'){
/* Exporting the Production.js file. */
module.exports=require('./Production')
}
else{
  /* Exporting the Dev.js file. */
    module.exports=require('./Dev')
}