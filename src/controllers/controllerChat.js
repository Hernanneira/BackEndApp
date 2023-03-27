const logger = require('../utils/log4js')


const getIndexChat = async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente getIndexChat`);
    res.render('chats.ejs',{ nombre: req.session.token.userName.username, email: req.session.token.userName.email}) 
}

const getEmailChat = async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.baseUrl} con método ${req.method} exitosamente`);
    const{email} = req.params
    console.log(email)
    res.render('chats.ejs',{ nombre: req.session.token.userName.username, email: req.session.token.userName.email}) 
}



module.exports = {getIndexChat,getEmailChat}