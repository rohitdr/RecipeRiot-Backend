/* Importing the jsonwebtoken module. */
const jwt = require("jsonwebtoken");
/* A secret key that is used to encrypt the token. */
// const jwtSecret ="adlksfjakghaslkdfj"
const { jwtSecret } = require("../Config/Keys");
/**
 * It checks if the user has a token, if not, it sends an error message. If the user has a token, it
 * verifies the token and if the token is valid, it sends the user data to the next middleware. If the
 * token is invalid, it sends an error message.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - This is a function that is called when the middleware is complete.
 */
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(404).send({ error: "Please login to continue" });
  }
  try {
    const data = jwt.verify(token, jwtSecret);

    req.user = data;
    next();
  } catch (error) {
    res.status(404).send({ error: "Please login to continue " });
  }
};

module.exports = fetchUser;
