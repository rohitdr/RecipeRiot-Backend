/* Importing the jsonwebtoken module. */
const jwt = require("jsonwebtoken");
/* A secret key that is used to encrypt the token. */
// const jwtSecret ="adlksfjakghaslkdfj"
const  ACCESS_SECRET  =process.env.ACCESS_SECRET;

const fetchUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: "Please login to continue" });
  }
  const accessToken = authHeader.split(" ")[1]
  try {
    const data = jwt.verify(accessToken, ACCESS_SECRET);
    req.user = data;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Please login to continue " });
  }
};

module.exports = fetchUser;
