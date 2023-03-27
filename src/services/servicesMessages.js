const messagesDAO = require('../DAO/messagesDAO');
const { normalizeAll } = require('../utils/normalize/index');

async function obtenerMensajes() {
    const messages = await messagesDAO.getAll()
    return normalizeAll(messages);
}
  
async function nuevoMensaje(message) {
  message.date = new Date().toLocaleString();
  message.tipo = "usuario"
  console.log(message)
  const newContent = await messagesDAO.save(message);
  return newContent;
}
////////////////////////////////////////////////////
async function nuevoMensajePrivado(message) {
  message.date = new Date().toLocaleString();
  const newContent = await messagesDAO.save(message);
  return newContent;
}

async function obtenerEmailMensajes(email) {
  const messages = await messagesDAO.getEmailMessages(email)
  return normalizeAll(messages);
}
  
module.exports = {
  obtenerMensajes,
  nuevoMensaje,
  obtenerEmailMensajes
};