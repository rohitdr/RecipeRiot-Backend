const mongooseConnectToDb=require('./db.js')
const express = require('express')
mongooseConnectToDb();
const app = express()
const port = 500

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use('./api/auth',require('./Routes/auth.js'))
app.use('./api/recipe',require('./Routes/recipe.js'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})