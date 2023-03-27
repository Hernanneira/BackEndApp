const { nuevoMensaje, obtenerEmailMensajes } = require('../../services/servicesMessages');

async function handleSendEmailMessages (email) {
  try {
    return await obtenerEmailMensajes(email)
  } catch (error) {
    console.error(error.message)
    return []
  }
}

async function configureSocketPrivateMessage (socket, sockets) {
  socket.on("email", async (email) => {
        socket.emit("emailMessages", await handleSendEmailMessages(email));
  });
}

module.exports = {configureSocketPrivateMessage}