const bcrypt = require('bcrypt');
const saltRounds = 10;
const UsersDAO = require('../DAO/usersDAO')
const passport = require('passport');
const sendNewRegisterEmail = require('../utils/newRegisterEmail')


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

    if(req.body.password !== req.body.passwordR){
        console.log("Password is not the same")
        return res.status(401).send({
            success: false,
            message: "Password is not the same",
        })
    }

    const usuariosDB = await UsersDAO.getAll()

    const userLogin = usuariosDB.find(u => u.email === user.email)

    if (userLogin) {
        console.log("email already register")
        return res.status(401).send({
            success: false,
            message: "email already register",
        })
    //nico, redirecciono o que hago
    }

    const newUser = await UsersDAO.save(user)

    try {
        await sendNewRegisterEmail(user)
    } catch (error) {
        console.log('error:',error)
    }

    res.redirect('./login')
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