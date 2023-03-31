/* Importing the express module and the cors module. */
const mongooseConnectToDb = require("./db");
const express = require("express");
var cors = require("cors");
/* Connecting to the database. */
mongooseConnectToDb();

/* Creating an instance of the express server. */
const app = express();
/* Allowing the server to accept requests from other domains. */
app.use(cors());
/* Setting the port to 5000 if the port is not defined. */
const port = process.env.PORT || 5000;

/* Setting the limit of the data that can be sent to the server. */
app.use(express.json({ limit: "50mb" }));

/* Importing the routes from the files in the Routes folder. */
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/contact", require("./Routes/contact.js"));
app.use("/api/recipe", require("./Routes/Recipe.js"));
/* Listening to the port that is defined in the variable port. */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
