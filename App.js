const express = require("express");
const  cors = require("cors");
const cookieParser=require('cookie-parser')
const morgan = require("morgan");
const helmet = require('helmet');
const errorHandler = require("./Middleware/errorHandler.js");
/* Creating an instance of the express server. */
const app = express();
app.set('trust proxy', 1);
/* Allowing the server to accept requests from other domains. */
app.use(cors({
  origin: process.env.Frontend_Url,
  credentials: true
}))
app.use(helmet())
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(cookieParser())
// ping every 5 min
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

/* Setting the limit of the data that can be sent to the server. */
app.use(express.json({ limit: "50mb" }));

/* Importing the routes from the files in the Routes folder. */
app.use("/api/auth", require("./Routes/auth"));
app.use("/api/user", require("./Routes/User"));
app.use("/api/contact", require("./Routes/contact.js"));
app.use("/api/recipe", require("./Routes/Recipe.js"));
app.use("/api/comment", require("./Routes/Comment.js"));
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler)
module.exports = app