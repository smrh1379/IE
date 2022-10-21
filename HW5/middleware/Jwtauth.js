const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../util/usermodel");

exports.verifyToken = (req, res, next) => {
  let token =
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
      ? req.headers.authorization.split(" ")[1]
      : req.query && req.query.token
      ? req.query.token
      : null;
  if (!token) {
    // console.log("token has problem")
    return res.status(400).send({ error: { message: "Bad request!" } });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(400).send({ error: { message: "Bad request!" } });
    }
    req.userId = decoded.userId;
    next();
  });
};
