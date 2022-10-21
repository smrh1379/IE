const jwt = require("jsonwebtoken");
const User = require("../util/usermodel");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  User.findOne({ email: email })
    .then((find) => {
      if (find)
        return res.status(400).send({ error: { message: "Bad request!" } });
      else if (!find) {
        return bcrypt.hash(password, 10).then((hashedpassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedpassword,
          });
          const token = jwt.sign({ userId: user._id }, config.secret, {
            expiresIn: 86400, // 24 hours
          });
          res.status(200).send({
            token: token,
            message: "successful",
          });
          return user.save();
        });
      }
    })
    .catch((err) => {
      return res.status(400).send({ error: { message: "Bad request!" } });
    });
};

exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((findUser) => {
      if (!findUser) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      const passIsValid = bcrypt.compareSync(password, findUser.password);

      if (!passIsValid) {
        return res.status(400).send({ error: { message: "Bad request!" } });
      }
      const token = jwt.sign({ userId: findUser.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        token: token,
        message: "successful",
      });
    })
    .catch((err) => {
      return res.status(400).send({ error: { message: "Bad request!" } });
    });
};
