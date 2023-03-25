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
      console.log("Invalid user");
      return res.status(401).send({
        success: false,
        message: "could not find the user",
      });
    }

    if (!isValidPassword(singleUser, req.body.password)) {
      console.log("Invalid Password");
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
    };

    const token = jwt.sign(payload, "secret", options);

    req.session.token = { token, userName };

    res.redirect("/api/productos");

    // return res.status(200).send({
    // success: true,
    // mesagge: "logged in succesfully!",
    // token:  "Bearer " + token
    // })
  });
};

passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.send(req.user.profile);
  };

const getLogin = (req, res) => {
  logger.info(
    `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
  );
  console.log(req.session?.token?.userName);
  try {
    const nombre = req.session?.token?.userName || false;
    if (nombre) {
      res.redirect("/api/productos");
    } else {
      console.log("estoy en getLogin");
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

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const options = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'secret'
// };

// passport.use(new JwtStrategy(options, (jwt_payload, done) => {
//   UsersDAO.getUserById(jwt_payload.sub)
//     .then(user => {
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     })
//     .catch(err => done(err, false));
// }));

// const loginUser = async (req, res ) => {
//   UsersDAO.getEmail(req.body.email)
//     .then(user => {
//       const singleUser = user.find((u) => u.email === req.body.email);

//       if (!singleUser) {
//         return res.status(401).send({
//           success: false,
//           message: "could not find the user",
//         });
//       }

//       if (!isValidPassword(singleUser, req.body.password)){
//         return res.status(401).send({
//           success: false,
//           message: "Invalid Password"
//         });
//       }

//       const payload = {
//         sub: singleUser._id,
//         email: singleUser.email
//       };

//       const token = jwt.sign(payload, 'secret', opciones);

//       req.session.token = token;

//       res.redirect('/api/productos');
//     });
// };

// const getLogin = (req, res) => {
//   logger.info(
//     `Se intentó acceder a /LOGIN ${req.baseUrl} con método ${req.method} exitosamente`
//   );

//   try {
//     const token = req.session.token;
//     if (token) {
//       const decoded = jwt.verify(token, 'secret');
//       const userEmail = decoded.email;

//       UsersDAO.getEmail(userEmail)
//       .then(user => {
//         const singleUser = user.find((u) => u.email === userEmail);

//         if (singleUser) {
//           res.redirect("/api/productos");
//         } else {
//           res.render("login.ejs");
//         }
//       });
//   } else {
//     res.render("login.ejs");
//   }
// } catch (error) {
//   console.log(error);
//   res.render("login.ejs");
// }
// };
// module.exports = { getLogin, loginUser };
