const messagesDAO = require('../DAO/messagesDAO');
const { normalizeAll } = require('../utils/normalize/index');

async function obtenerMensajes() {
    const messages = await messagesDAO.getAll()
    return normalizeAll(messages);
  }
  
  async function nuevoMensaje(message) {
    message.date = new Date().toLocaleString();
    const newContent = await messagesDAO.save(message);
    return newContent;
  }
  
  module.exports = {
    obtenerMensajes,
    nuevoMensaje,
  };