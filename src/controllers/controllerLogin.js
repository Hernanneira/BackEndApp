const logger = require("../utils/log4js");
const UsersDAO = require("../DAO/usersDAO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const options = { expiresIn: "1h", algorithm: "HS256" };

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

const loginUser = async (req, res) => {
  logger.info(
    `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  UsersDAO.getEmail(req.body.email).then((user) => {
    const singleUser = user.find((u) => u.email === req.body.email);

    if (!singleUser) {
      return res.status(401).send({
        success: false,
        message: "could not find the user",
      });
    }

    if (!isValidPassword(singleUser, req.body.password)) {
      return res.status(401).send({
        success: false,
        mesagge: "Invalid Password",
      });
    }

    const payload = {
      username: singleUser.email,
    };

    const userName = {
      username: singleUser.username,
      email: singleUser.email,
    };

    const token = jwt.sign(payload, "secret", options);

    req.session.token = { token, userName };

    res.redirect("/productos");

  });
};

const getLogin = (req, res) => {
  logger.info(
    `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  try {
    const nombre = req.session?.token?.userName || false;
    if (nombre) {
      res.redirect("/productos");
    } else {
      res.render("login.ejs");
    }
  } catch (error) {
    console.log(error);
  }
};

const loginError = (req, res) => {
  logger.info(
    `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  res.render("login-error.ejs");
};

module.exports = { getLogin, loginError, loginUser };
