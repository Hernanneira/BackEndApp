const bcrypt = require('bcrypt');
const saltRounds = 10;
const UsersDAO = require('../DAO/usersDAO')
const sendNewRegisterEmail = require('../utils/newRegisterEmail')
const logger = require("../utils/log4js");


function createHash(password) {
    return bcrypt.hashSync(
            password,
            bcrypt.genSaltSync(saltRounds),
            null);
}  

const register = async (req,res) => {

    const user = {  
        username: req.body.username,
        password: createHash(req.body.password),
        email: req.body.email,
        direccion: req.body.direccion,
        edad: req.body.edad,
        telefono: req.body.telefono,
        foto: req.body.foto,
    }
    const usuariosDB = await UsersDAO.getAll()

    const userLogin = usuariosDB.find(u => u.email === user.email)

    if (req.body.password !== req.body.passwordR) {
        res.render("register-error", {problema : "no coinciden las contrasenas"})
    } if (userLogin) {
        res.render("register-error", {problema : `el correo ${userLogin.email} ya se encuentra registrado`})
    } else {
        try {
            await UsersDAO.save(user)
            await sendNewRegisterEmail(user)
            res.redirect('./login')
            }   catch (error) {
            console.log('error:',error)
            }
    }
}

const getRegisterIndex =  async(req,res)=> {
    res.render('register.ejs')
}

const getRegisterError = (req, res) => {
    logger.info(
      `Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`
    );
    res.render("register-error.ejs");
  }

module.exports = {getRegisterIndex , register, getRegisterError}