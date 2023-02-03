const mongooseConnectToDb=require('./db')
const express = require('express')

const app = express()
const port = 500
mongooseConnectToDb();
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
// app.use('./api/auth',require('./Routes/auth.js'))
// app.use('./api/recipe',require('./Routes/recipe.js'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})